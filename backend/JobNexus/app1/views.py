from django.shortcuts import render, redirect
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Blog
from .pdf_similarity import analyze_pdf_similarity
from datetime import datetime
from .models import *
from .serializers import *

from rest_framework.permissions import IsAuthenticated
from django.core.mail import EmailMultiAlternatives, EmailMessage
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created

from django.utils.encoding import force_str, force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .email_tokens import account_activation_token
from django.contrib.sites.shortcuts import get_current_site

# Create your views here.


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


# @permission_classes([IsAuthenticated])
class SeekerViewSet(APIView):
    def get(self, request, user_id):
        # Logic for handling GET request
        seeker = Seeker.objects.filter(user=user_id)
        serializer = SeekerSerializer(seeker, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SeekerRegisterCreateAPIView(APIView):
    def post(self, request):
        serializerUser = POSTUserSerializer(data=request.data)
        if serializerUser.is_valid():
            user = serializerUser.save()
            # deactivating the user until he verifies his account
            user.is_active = False
            user.save()
            activateEmail(request, user)

            # Create a Seeker instance and associate it with the newly created user
            seeker_data = {
                'user': user.id,
                'country': '1',
                # Add other seeker fields as needed
            }
            seeker_serializer = PostSeekerSerializer(data=seeker_data)
            if seeker_serializer.is_valid():
                seeker_serializer.save()
            else:
                # If seeker serializer is invalid, delete the user as well
                user.delete()
                return Response(seeker_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializerUser.data, status=status.HTTP_201_CREATED)
        return Response(serializerUser.errors, status=status.HTTP_400_BAD_REQUEST)


# @permission_classes([IsAuthenticated])
class RecruiterViewSet(APIView):
    def get(self, request, user_id):
        # Logic for handling GET request
        recruiter = Recruiter.objects.filter(user=user_id)
        serializer = RecruiterSerializer(recruiter, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecruiterRegisterCreateAPIView(APIView):
    def post(self, request):
        serializerUser = POSTUserSerializer(data=request.data)
        if serializerUser.is_valid():
            user = serializerUser.save()
            # deactivating the user until he verifies his account
            user.is_active = False
            user.save()
            activateEmail(request, user)

            # Create a Seeker instance and associate it with the newly created user
            recruiter_data = {
                'user': user.id,
                'country': '1',
                # Add other seeker fields as needed
            }
            print("user id is :-----------------")
            print(user.id)
            recruiter_serializer = PostRecruiterSerializer(data=recruiter_data)
            if recruiter_serializer.is_valid():
                print("serializer is valid--------------------------")
                recruiter_serializer.save()
            else:
                # If seeker serializer is invalid, delete the user as well
                user.delete()
                return Response(recruiter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializerUser.data, status=status.HTTP_201_CREATED)
        return Response(serializerUser.errors, status=status.HTTP_400_BAD_REQUEST)


# @permission_classes([IsAuthenticated])
class CompanyRegisterCreateAPIView(APIView):
    def post(self, request):
        data = request.data

        companyData = {
            'recruiter': data.get('recruiter'),
            'country': data.get('country'),
            'field': data.get('field'),
            'size': data.get('size'),
            'type': data.get('type'),
        }
        print(companyData)

        serializer = PostCompanySerializer(data=companyData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @permission_classes([IsAuthenticated])
class CompanyViewSet(APIView):
    def get(self, request, recruiter_id):
        # Logic for handling GET request
        company = Company.objects.filter(recruiter=recruiter_id)
        serializer = GetCompanySerializer(company, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class JobViewSet(APIView):
    def get(self, request):
        # Logic for handling GET request
        job = Job.objects.all()
        serializer = GETJobSerializer(job, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class JobIdViewSet(APIView):
    def get(self, request, id):
        # Logic for handling GET request
        job = Job.objects.filter(id=id)
        serializer = GETJobSerializer(job, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
# @permission_classes([IsAuthenticated])
class JobRegisterCreateAPIView(APIView):
    def post(self, request):
        if request.data.get('deadline') != "":
            deadline = datetime.strptime(request.data.get('deadline'), '%Y-%m-%d').date()
            if deadline is None:
                return Response({'message': 'not a date'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        deadline = None
        request.data['deadline'] = deadline
        serializer = POSTJobSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationViewSet(APIView):
    def get(self, request, job_id):
        # Logic for handling GET request
        application = Application.objects.filter(job=job_id)
        serializer = GETApplicationSerializer(application, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#create application => application id
# then apply the changes 


# @permission_classes([IsAuthenticated])
class ApplicationRegisterCreateAPIView(APIView):
    def post(self, request):
        serializer = PostApplicationSerializer(data=request.data)
        print("requestttttttttt " , request.data)
        if serializer.is_valid():
            check = Application.objects.filter(seeker=request.data.get('seeker'), job=request.data.get('job'))
            if len(check) > 0:
                return Response({"message": "You already applied to this job position."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
           
            today = datetime.today().strftime("%Y-%m-%d")

            # jobId = Application.objects.get(job = request.data.get('job'))
            job = Job.objects.get(id=request.data.get('job'))
            deadline = job.deadline.strftime("%Y-%m-%d")
            
            if deadline <= today:
                return Response({"message": "ajsdhjkashdkjahsdkjhaskj."}, status=status.HTTP_403_FORBIDDEN)
            
            print(deadline)
            app = serializer.save()
            print("appppppppppppppppppppppppppppp",app.id)
            application = Application.objects.get(id=app.id)
            letter = application.coverLetter.path
            cv = application.cv.path
            print(application)

            # job = Job.objects.get(id=request.data.get('job'))
            print(job)
            req = job.description         
            cv_similarity = analyze_pdf_similarity(req,cv)
            letter_similarity = analyze_pdf_similarity(req,letter)
            # request.data["similarity"] = similarity['match_percentage']
            application.cv_similarity = cv_similarity['match_percentage']
            application.letter_similarity = letter_similarity['match_percentage']
            application.save()
            if cv_similarity is not None:
                print(f"Match Percentage for CV: {cv_similarity['match_percentage']}%")
                print(f"Match Percentage for Cover Letter: {letter_similarity['match_percentage']}%")

            else:
                print("No similarity result found.")

            title = "Application Submitted for " + application.job.title + " postion"
            message = "Application Submitted successfully for " + application.job.title + " postion"
            seeker_data = Seeker.objects.get(id= request.data.get('seeker'))
            userEmail = seeker_data.user.email
            sendEmailView(userEmail, message, title)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogCreateAPIView(APIView):
  def post(self, request):
      serializer = BlogSerializer(data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogViewAPIView(APIView):
    def get(self, request, pk):
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(blog, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogListAPIView(APIView):
    def get(self, request):
        blog =Blog.objects.all()
        serializer = BlogSerializer(blog, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# @permission_classes([IsAuthenticated])
class BlogUpdateAPIView(APIView):
    def post(self, request, pk):
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(instance=blog, data=request.data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


# @permission_classes([IsAuthenticated])
class BlogDeleteAPIView(APIView):
    def post(self, request, pk):
        blog = Blog.objects.get(id=pk)
        blog.delete()
        return Response("blog delete")


class DeleteJob(APIView):
    def delete(self, request, job_id):
        job = Job.objects.filter(id=job_id)
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SeekerUpdateAPIView(APIView):
    def put(self, request, pk):
        print(request.data.get("profilePicture"))
        seeker = Seeker.objects.get(id=pk)

        profile_picture = request.data.get("profilePicture")
        if profile_picture:
            seeker.profilePicture.delete()  # Delete the existing profile picture
            seeker.profilePicture.save(profile_picture.name, profile_picture)  # Save the new profile picture

            return Response({"message": "Profile picture updated successfully."}, status=status.HTTP_200_OK)
        # else:
        #     return Response({"message": "No profile picture provided."}, status=status.HTTP_400_BAD_REQUEST)

        else:
            user_data = request.data.pop("user", {})
            first_name = user_data.get("first_name")
            last_name = user_data.get("last_name")
            phone = user_data.get("phone")
            print(phone)

            user_instance = seeker.user
            user_instance.first_name = first_name
            user_instance.last_name = last_name
            user_instance.phone = phone
            user_instance.save()

            # seeker = Seeker.objects.get(id=pk)
            serializer = PostSeekerSerializer(seeker, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditJob(APIView):
    def put(self, request, job_id):
        if request.data.get('deadline') != "":
            deadline = datetime.strptime(request.data.get('deadline'), '%Y-%m-%d').date()
            if deadline is None:
                return Response({'message': 'not a date'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        deadline = None
        job = Job.objects.get(id=job_id)
        request.data['deadline'] = deadline
        serializer = POSTJobSerializer(job, data=request.data, partial=True)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditRecruiterProfile(APIView):
    def put(self, request, recruiter_id):
        recruiter = Recruiter.objects.get(id=recruiter_id)
        profile_picture = request.data.get("profilePicture")
        if profile_picture:
            recruiter.profilePicture.delete()  # Delete the existing profile picture
            recruiter.profilePicture.save(profile_picture.name, profile_picture)  # Save the new profile picture
            return Response({"message": "Profile picture updated successfully."}, status=status.HTTP_200_OK)
        else:
            user_data = request.data.pop("user", {})
            first_name = user_data.get("first_name")
            last_name = user_data.get("last_name")
            phone = user_data.get("phone")
            user_instance = recruiter.user
            user_instance.first_name = first_name
            user_instance.last_name = last_name
            user_instance.phone = phone
            user_instance.save()
        serializer = UpdateRecruiterSerializer(recruiter, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GETCompany(APIView):
    def get(self, request, recruiter_id):
        companies = Company.objects.filter(recruiter=recruiter_id)
        serializer = GetCompanySerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class POSTCompany(APIView):
    def post(self, request):
        serializer = PostCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GETCountry(APIView):
    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GETJobType(APIView):
    def get(self, request):
        types = JobType.objects.all()
        serializer = JobTypeSerializer(types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GETLocationType(APIView):
    def get(self, request):
        locationTypes = JobLocationType.objects.all()
        serializer = JobLocationSerializer(locationTypes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetSeekerApplication(APIView):
    def get(self, request, seeker_id):
        seekerJobs = Application.objects.filter(seeker=seeker_id)
        serializer = GETApplicationSerializer(seekerJobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class EditRecruiterProfile(APIView):
    def put(self, request, recruiter_id):
        recruiter = Recruiter.objects.get(id=recruiter_id)
        profile_picture = request.data.get("profilePicture")
        if profile_picture:
            recruiter.profilePicture.delete()  # Delete the existing profile picture
            recruiter.profilePicture.save(profile_picture.name, profile_picture)  # Save the new profile picture
            return Response({"message": "Profile picture updated successfully."}, status=status.HTTP_200_OK)
        else:
            user_data = request.data.pop("user", {})
            first_name = user_data.get("first_name")
            last_name = user_data.get("last_name")
            phone = user_data.get("phone")
            user_instance = recruiter.user
            user_instance.first_name = first_name
            user_instance.last_name = last_name
            user_instance.phone = phone
            user_instance.save()
        serializer = UpdateRecruiterSerializer(recruiter, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetJobsByRecruiterId(APIView):
    def get(self, request, recruiter_id):
        jobs = Job.objects.filter(recruiter=recruiter_id)
        serializer = GETJobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    

class EditJob(APIView):
    def put(self, request, job_id):
        job = Job.objects.get(id=job_id)
        serializer = POSTJobSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    confirm_url = "https://jobnexusai.navybits.com/resetNewPassword/"
    context = {
        'current_user': reset_password_token.user,
        # 'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        # 'reset_password_url': "{}?token={}".format(
        #     instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
        #     reset_password_token.key)
        'reset_password_url': "{}{}".format(
            confirm_url,
            reset_password_token.key)
    }

    # render email text
    email_html_message = render_to_string('user_reset_password.html', context)
    # email_plaintext_message = render_to_string('user_reset_password.txt', context)
    email_plaintext_message = "this is our text"

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="JobNexusAi"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()


def activate(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        print("Thank you for your email confirmation. Now you can login to your account.")
        return redirect('https://jobnexusai.navybits.com/login')  # redirect('http://localhost:3000/login')
    else:
        print("Activation link is invalid!")
    return redirect('https://jobnexusai.navybits.com/register')  # redirect('http://localhost:3000/register')


def activateEmail(request, user):
    subject = "Activate your JobNexusAI account."   
    sender = "recruitsystem.webapp@gmail.com"
    context = {

    

        'user': user.first_name + ' ' + user.last_name,
        'domain': 'be.jobnexusai.navybits.com',
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    }
    content = render_to_string("email_verification_message.html", context)
    email = EmailMessage(subject, content, sender, to=[user.email])
    if email.send():
        print(f'Dear {user.first_name} {user.last_name}, please go to your email {user.email} inbox and click on received activation link to confirm and complete the registration. Note: Check your spam folder.')
    else:
        print(f'Problem sending email to {user.email}, check if you typed it correctly.')


def sendEmailView(receive, message, title):

    context = {
        # 'email': receive,
        'message': message,
    }
    html_content = render_to_string('notificationEmail.html', context)

    # Email message object
    subject = title
    from_email = 'recruitsystem.webapp@gmail.com'
    to_email = [receive]

    email = EmailMessage(subject, html_content, from_email, to_email)

    email_state = email.send()
    if email_state:
        return True
    else:
        return False

class accepteJobNotification(APIView):
    def post(self, request):

        job_data = Job.objects.get(id=request.data.get('job'))
        job_title = job_data.title
        print("the job id is:")
        print(job_data.id)
        seeker_data = Seeker.objects.get(id= request.data.get('seeker'))
        userEmail = seeker_data.user.email

        title = "Congratulations on Your " + job_title + " position"

        message = """
Dear {job_seeker_firstName} {job_seeker_lastName},

Congratulations! We are delighted to inform you that you have been accepted for the {postion} position at {company_name}. This is a remarkable achievement!
Your exceptional qualifications, skills, and experience have made you stand out among the applicants. We were impressed by your dedication and commitment to excellence, which align perfectly with our company values.
Our team will be reaching out to you soon to discuss the next steps in the hiring process, including contract details and the expected start date.
We look forward to welcoming you onboard at {company_name} and working together to achieve great success!

Best regards,

JobNexusAi
""".format(job_seeker_firstName = seeker_data.user.first_name,
            job_seeker_lastName = seeker_data.user.last_name,
            postion = job_title,
            company_name = job_data.company.name,
            )

        email_state = sendEmailView(userEmail, message, title)
        if email_state:
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

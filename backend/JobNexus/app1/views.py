from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Blog



from .models import *
from .serializers import *

# Create your views here.


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


@permission_classes([IsAuthenticated])
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

            # Create a Seeker instance and associate it with the newly created user
            seeker_data = {
                'user': user.id,
                'country': {'name': 'Null'},
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


@permission_classes([IsAuthenticated])
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


@permission_classes([IsAuthenticated])
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


@permission_classes([IsAuthenticated])
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
    def get(self, request,id):
        # Logic for handling GET request
        job = Job.objects.filter(id=id)
        serializer = GETJobSerializer(job, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@permission_classes([IsAuthenticated])
class JobRegisterCreateAPIView(APIView):
    def post(self, request):
        serializer = PostCompanySerializer(data=request.data)
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


# @permission_classes([IsAuthenticated])
class ApplicationRegisterCreateAPIView(APIView):
    def post(self, request):
        serializer = PostApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
    def get(self, request,pk):
        blog = Blog.objects.get(id=pk)
        serializer = BlogSerializer(blog, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogListAPIView(APIView):
    def get(self, request):
        blog =Blog.objects.all()
        serializer = BlogSerializer(blog, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#@permission_classes([IsAuthenticated])
class BlogUpdateAPIView(APIView):
    def post(self, request,pk):
        blog =Blog.objects.get(id=pk)
        serializer = BlogSerializer(instance=blog,data=request.data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
#@permission_classes([IsAuthenticated])
class BlogDeletAPIView(APIView):
    def post(self, request,pk):
        blog =Blog.objects.get(id=pk)
        blog.delete()
        return Response("blog delete")


class DeleteJob(APIView):
   def delete(self, request, job_id):
        job = Job.objects.filter(id=job_id)
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
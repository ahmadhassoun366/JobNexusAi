from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

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
        serializerUser = UserSerializer(data=request.data)
        if serializerUser.is_valid():
            user = serializerUser.save()

            # Create a Seeker instance and associate it with the newly created user
            seeker_data = {
                'user': user.id,
                'country': {'name': 'Null'},
                # Add other seeker fields as needed
            }
            seeker_serializer = SeekerSerializer(data=seeker_data)
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
        serializerUser = UserSerializer(data=request.data)
        if serializerUser.is_valid():
            user = serializerUser.save()

            # Create a Seeker instance and associate it with the newly created user
            recruiter_data = {
                'user': user.id,
                'country': '1',
                # Add other seeker fields as needed
            }
            recruiter_serializer = RecruiterSerializer(data=recruiter_data)
            if recruiter_serializer.is_valid():
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


@permission_classes([IsAuthenticated])
class JobRegisterCreateAPIView(APIView):
    def post(self, request):
        serializer = PostCompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationViewSet(APIView):
    def get(self, request):
        # Logic for handling GET request
        application = Application.objects.all()
        serializer = GETApplicationSerializer(application, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class ApplicationRegisterCreateAPIView(APIView):
    def post(self, request):
        serializer = PostApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
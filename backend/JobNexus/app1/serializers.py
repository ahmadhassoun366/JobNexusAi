from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as JwtTokenObtainPairSerializer
from django.contrib.auth.hashers import make_password


class TokenObtainPairSerializer(JwtTokenObtainPairSerializer):
    username_field = get_user_model().USERNAME_FIELD


class GETUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'first_name', 'last_name', 'phone','email')


class POSTUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = get_user_model().objects.create(password=make_password(password), **validated_data)
        return user


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class SeekerSerializer(serializers.ModelSerializer):
    user = GETUserSerializer(read_only=True)
    country = CountrySerializer(read_only=True)  # Use the nested serializer for country field

    class Meta:
        model = Seeker
        fields = "__all__"


class PostSeekerSerializer(serializers.ModelSerializer):
    # user = GETUserSerializer(read_only=True)
    country = CountrySerializer(read_only=True)  # Use the nested serializer for country field

    class Meta:
        model = Seeker
        fields = "__all__"


class RecruiterSerializer(serializers.ModelSerializer):
    user = GETUserSerializer(read_only=True)
    country = CountrySerializer(read_only=True)  # Use the nested serializer for country field

    class Meta:
        model = Recruiter
        fields = "__all__"


class PostRecruiterSerializer(serializers.ModelSerializer):
    # user = GETUserSerializer(read_only=True)
    country = CountrySerializer(read_only=True)  # Use the nested serializer for country field

    class Meta:
        model = Recruiter
        fields = "__all__"


class UpdateRecruiterSerializer(serializers.ModelSerializer):
    user = GETUserSerializer(read_only=True)
    # country = CountrySerializer(read_only=True)  # Use the nested serializer for country field

    class Meta:
        model = Recruiter
        fields = "__all__"


# use it with POST request
class PostCompanySerializer(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())

    class Meta:
        model = Company
        fields = "__all__"


# use it with GET request
class GetCompanySerializer(serializers.ModelSerializer):
    country = CountrySerializer(read_only=True)  # Use the nested serializer for country field

    class Meta:
        model = Company
        fields = "__all__"


class JobTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobType
        fields = "__all__"


class JobLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobLocationType
        fields = "__all__"


class POSTJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = "__all__"


class GETJobSerializer(serializers.ModelSerializer):
    company = GetCompanySerializer(read_only=True)
    recruiter = RecruiterSerializer(read_only=True)
    country = CountrySerializer(read_only=True)
    locationType = JobLocationSerializer(read_only=True)
    type = JobTypeSerializer(read_only=True)

    class Meta:
        model = Job
        fields = "__all__"


class GETApplicationSerializer(serializers.ModelSerializer):    
    seeker = SeekerSerializer(read_only=True)
    job = GETJobSerializer(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"


class PostApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = "__all__"
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy  as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(max_length=20)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    
class Country(models.Model):
    name = models.CharField(max_length=100)


class Seeker(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profilePicture = models.ImageField(upload_to='static/product_images')
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    about = models.CharField(max_length=200)
    education = models.CharField(max_length=50)
    skill = models.CharField(max_length=200)
    experience = models.CharField(max_length=200)
    language = models.CharField(max_length=100)


class Recruiter(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profilePicture = models.ImageField(upload_to='static/product_images')
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    about = models.CharField(max_length=200)


class Company(models.Model):
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    field = models.CharField(max_length=200)
    size = models.IntegerField()
    type = models.CharField(max_length=200)


class JobType(models.Model):
    type = models.CharField(max_length=100)


class JobLocationType(models.Model):
    locationType = models.CharField(max_length=50)


class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    type = models.ForeignKey(JobType, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    locationType = models.ForeignKey(JobLocationType, on_delete=models.CASCADE)
    jobTile = models.CharField(max_length=200)
    description = models.CharField(max_length=200)


class Application(models.Model):
    seeker = models.ForeignKey(Seeker, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    cv = models.FileField(upload_to='static/cv')
    coverLetter = models.FileField(upload_to='static/coverLetter')
    similarity = models.FloatField(default=None)


class Blog(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='static/blog')
    text = models.CharField(max_length=1000)


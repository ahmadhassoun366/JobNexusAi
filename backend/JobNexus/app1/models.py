from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


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
    class Meta:
        verbose_name = "Country"
        verbose_name_plural = "Countries"
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class Seeker(models.Model):
    class Meta:
        verbose_name = "Seeker"
        verbose_name_plural = "Seekers"
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profilePicture = models.ImageField(upload_to='static/seeker_images', null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=30, null=True, blank=True)
    about = models.CharField(max_length=200, null=True, blank=True)
    education = models.CharField(max_length=50, null=True, blank=True)
    skill = models.CharField(max_length=200, null=True, blank=True)
    experience = models.CharField(max_length=200, null=True, blank=True)
    language = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.user}"


class Recruiter(models.Model):
    class Meta:
        verbose_name = "Recruiter"
        verbose_name_plural = "Recruiters"
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    profilePicture = models.ImageField(upload_to='static/recruiter_images', null=True, blank=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=30, null=True, blank=True)
    about = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.user}"


class Company(models.Model):
    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
    name = models.CharField(max_length=200)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, default=1)
    field = models.CharField(max_length=200)
    size = models.IntegerField()
    type = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name}"


class JobType(models.Model):
    class Meta:
        verbose_name = "JobType"
        verbose_name_plural = "JobTypes"
    type = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.type}"


class JobLocationType(models.Model):
    class Meta:
        verbose_name = "JobLocationType"
        verbose_name_plural = "JobLocationTypes"
    locationType = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.locationType}"


class Job(models.Model):
    class Meta:
        verbose_name = "Job"
        verbose_name_plural = "Jobs"
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    recruiter = models.ForeignKey(Recruiter, on_delete=models.CASCADE)
    type = models.ForeignKey(JobType, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    locationType = models.ForeignKey(JobLocationType, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.title}"


class Application(models.Model):
    class Meta:
        verbose_name = "Application"
        verbose_name_plural = "Applications"
    seeker = models.ForeignKey(Seeker, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    cv = models.FileField(upload_to='static/cv', null=True, blank=True)
    coverLetter = models.FileField(upload_to='static/coverLetter', null=True, blank=True)
    similarity = models.FloatField(null=True, blank=True, default=None)

    def __str__(self):
        return f"{self.job}"


class Blog(models.Model):
    class Meta:
        verbose_name = "Blog"
        verbose_name_plural = "Blogs"
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='static/blog')
    text = models.CharField(max_length=1000)

    def __str__(self):
        return f"{self.title}"

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import *


class EmailUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'phone')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'phone', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'phone', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)


class SeekerAdmin(admin.ModelAdmin):
    list_display = ('user', 'profilePicture', 'country', 'title', 'language')


class RecruiterAdmin(admin.ModelAdmin):
    list_display = ('user', 'profilePicture', 'country', 'title')


class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'recruiter', 'field', 'country', 'size', 'type')


class JobTypeAdmin(admin.ModelAdmin):
    list_display = ('type',)


class JobLocationTypeAdmin(admin.ModelAdmin):
    list_display = ('locationType',)


class JobAdmin(admin.ModelAdmin):
    list_display = ('jobTile', 'company', 'type', 'country', 'locationType')


class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('seeker', 'job', 'cv', 'coverLetter', 'similarity')


class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'text')


class CountryAmin(admin.ModelAdmin):
    list_display = ('name',)


admin.site.register(CustomUser, EmailUserAdmin)
admin.site.register(Seeker, SeekerAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Recruiter, RecruiterAdmin)
admin.site.register(JobType, JobTypeAdmin)
admin.site.register(JobLocationType, JobLocationTypeAdmin)
admin.site.register(Job, JobAdmin)
admin.site.register(Country, CountryAmin)
admin.site.register(Application, ApplicationAdmin)
admin.site.register(Blog, BlogAdmin)

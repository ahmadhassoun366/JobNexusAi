from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *

urlpatterns = [
    path('token/obtain/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/seeker/<int:user_id>/', SeekerViewSet.as_view(), name='seeker'),
    path('api/seeker_register/', SeekerRegisterCreateAPIView.as_view(), name='seeker_register'),

    path('api/recruiter/<int:user_id>/', RecruiterViewSet.as_view(), name='recruiter'),
    path('api/recruiter_register/', RecruiterRegisterCreateAPIView.as_view(), name='recruiter_register'),

    path('api/company/<int:recruiter_id>/', CompanyViewSet.as_view(), name='recruiter'),
    path('api/company_register/', CompanyRegisterCreateAPIView.as_view(), name='company_register'),


    path('api/job/', JobViewSet.as_view(), name='job'),
    path('api/job/<int:id>/', JobIdViewSet.as_view(), name='job'),

    path('api/applicants/<int:job_id>/', ApplicationViewSet.as_view(), name='applicants'),
    path('api/create_applicants/', ApplicationRegisterCreateAPIView.as_view(), name='create_applicants'),


    path('blogs/', BlogCreateAPIView.as_view(), name='blog_create'),
    path('blogsDetails/<int:pk>/', BlogViewAPIView.as_view(), name='blog_View'),
    path('blogsList/', BlogListAPIView.as_view(), name='blog_List'),
    path('blogsUpdate/<int:pk>', BlogUpdateAPIView.as_view(), name='blog_update'),
    path('blogsDelete/<int:pk>', BlogDeletAPIView.as_view(), name='blog_delete'),
]

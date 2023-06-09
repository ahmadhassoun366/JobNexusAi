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
    
]
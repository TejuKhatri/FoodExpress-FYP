from django.urls import path
from .views import login_api
from .views import register_api


urlpatterns = [
    path('login/', login_api),
    path("register/", register_api),
    
]

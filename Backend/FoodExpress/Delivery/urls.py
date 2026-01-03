from django.urls import path
from .views import login_api
from .views import register_api
from .views import google_oauth
from .views import facebook_oauth


urlpatterns = [
    path('login/', login_api),
    path("register/", register_api),
        path("oauth/google/", google_oauth),
    path("oauth/facebook/", facebook_oauth),

    
]

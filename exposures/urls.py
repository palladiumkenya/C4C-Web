
from django.urls import path
from . import views

urlpatterns = [
    path('/', views.exposures_home, name='exposures'),
]
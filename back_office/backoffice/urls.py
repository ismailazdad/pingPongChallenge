from django.urls import path, re_path, include

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('ping', views.ping, name='ping'),
    path('pong', views.pong, name='pong'),
    path('progress_view', views.progress_view, name='progress_view'),
]

from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('transactions/', views.TransactionListCreateView.as_view()),
    path('transactions/<uuid:id>/', views.TransactionRetrieveUpdateDestroyView.as_view()),
    path('users/', views.UserCreateView.as_view()),
]

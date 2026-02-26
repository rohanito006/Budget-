from django.shortcuts import render
from rest_framework import generics
from .models import Transaction
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from .serializers import TransactionSerializer, UserSerializer

# Create your views here.
class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    lookup_field = 'id' #cette class recupere id de l'élement a modifier ou supprimer


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # On autorise tout le monde (même non-connecté) à créer un compte
    permission_classes = [AllowAny] 

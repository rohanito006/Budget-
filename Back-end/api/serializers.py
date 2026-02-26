from rest_framework import serializers
from .models import Transaction
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model=Transaction
    fields = ['id', 'text', 'amount', 'created_at']
    read_only_fields = ['id', 'created_at']


class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Cet email est déjà utilisé.")]
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Utilise create_user pour hacher le mot de passe
        return User.objects.create_user(**validated_data)

from .serializers import *
from .models import CustomUser
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets,status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework.permissions import BasePermission




class CustomUserPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated

class CustomUserCreateView(APIView):
    permission_classes = [CustomUserPermission]

    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(f"A senha configurada para {user.username} é: {user.password}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        User = get_user_model()  
        users = User.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username, password)
        try:
            user = CustomUser.objects.get(password=password)
        except CustomUser.DoesNotExist:
            user = None
        if user is not None:
            refresh = RefreshToken.for_user(user)
            tokens = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
            return Response(tokens, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
    
class EquipamentosViewSet(viewsets.ModelViewSet):
    queryset = Equipamentos.objects.all()
    serializer_class = EquipamentosSerializer
    permission_classes = (IsAuthenticated,)

class ComentariosViewSet(viewsets.ModelViewSet):
    queryset = Comentarios.objects.all()
    serializer_class = ComentariosSerializer
    permission_classes = (IsAuthenticated,)

class EquipamentoComentariosViewSet(viewsets.ModelViewSet):
    queryset = EquipamentosComentarios.objects.all()
    serializer_class = EquipamentosComentariosSerializer
    permission_classes = (IsAuthenticated,)
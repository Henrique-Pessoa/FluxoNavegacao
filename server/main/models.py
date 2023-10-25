from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password, funcao, **extra_fields):
        if not username:
            raise ValueError('O campo "username" é obrigatório.')
        if not password:
            raise ValueError('O campo "password" é obrigatório.')
        user = self.model(username=username, funcao=funcao, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, funcao, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superusuários devem ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superusuários devem ter is_superuser=True.')
        return self.create_user(username=username, password=password, funcao=funcao, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=128,unique=True)  # Agora é único
    funcao = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'password'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
class Comentarios(models.Model):
    usuario = models.ForeignKey(CustomUser,related_name="usuario", on_delete=models.CASCADE,blank=False,null=False)
    comentario = models.CharField(max_length=2000,blank=False,null=False)
    data = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.comentario

class Equipamentos(models.Model):
    nome = models.CharField(max_length=150,blank=False,null=False)
    image = models.CharField(max_length=2000000,blank=False,null=False)
    descricao = models.CharField(max_length=2000,blank=False,null=False)
    ativo = models.BooleanField(default=False,null=False,blank=False)
    comentarios = models.ManyToManyField(Comentarios, related_name="equipamentos",null=True, blank=False)
    
    def __str__(self):
        return self.nome

class EquipamentosComentarios(models.Model):
    equipamento = models.ForeignKey(Equipamentos,related_name="equipamentosComentarios", on_delete=models.CASCADE,blank=False,null=False)
    comentario = models.ForeignKey(Comentarios,related_name="comentariosEquipamentos", on_delete=models.CASCADE,blank=False,null=False)
    
    def __str__(self):
        return self.equipamento
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter 

router = DefaultRouter()
router.register(r'equipamentos', EquipamentosViewSet)
router.register(r'comentarios', ComentariosViewSet)
router.register(r'equipamentosComentarios',EquipamentoComentariosViewSet)


urlpatterns = router.urls


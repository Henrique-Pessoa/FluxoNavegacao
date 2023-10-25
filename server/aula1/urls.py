from django.contrib import admin
from django.urls import path, include
from main.views import LoginView,CustomUserCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', CustomUserCreateView.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('', include('main.urls')),
]
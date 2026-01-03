from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)

    ROLE_CHOICES = (
        ("customer", "Customer"),
        ("restaurant", "Restaurant"),
        ("delivery", "Delivery"),
        ("admin", "Admin"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="customer")
def __str__(self):
        return self.username
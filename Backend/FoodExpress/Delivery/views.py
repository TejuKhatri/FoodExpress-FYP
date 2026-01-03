from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

# Allowed roles (keep same everywhere)
ALLOWED_ROLES = {"customer", "vendor", "delivery", "admin"}


@csrf_exempt
@api_view(["POST"])
def login_api(request):
    """
    Simple login API.
    Expects: { "username": "...", "password": "..." }
    Returns: user info + role if credentials valid.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # If you want admin role based on is_staff/is_superuser
    role = getattr(user, "role", None)
    if user.is_superuser or user.is_staff:
        role = "admin"

    return Response(
        {
            "message": "Login successful",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": getattr(user, "phone", None),
            "role": role,
        },
        status=status.HTTP_200_OK,
    )


@csrf_exempt
@api_view(["POST"])
def register_api(request):
    """
    Simple register API.
    Expects:
      {
        "username": "...",
        "email": "...",
        "phone": "...",
        "password": "...",
        "role": "customer" | "vendor" | "delivery"
      }
    """
    username = request.data.get("username")
    email = request.data.get("email")
    phone = request.data.get("phone")
    password = request.data.get("password")
    role = request.data.get("role", "customer")

    if not username or not email or not password:
        return Response(
            {"error": "username, email and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Validate role
    if role not in ALLOWED_ROLES:
        role = "customer"

    # (optional) prevent creating admin from register
    if role == "admin":
        role = "customer"

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already exists"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        phone=phone,
        role=role,
    )

    return Response(
        {
            "message": "Account created",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": getattr(user, "phone", None),
            "role": getattr(user, "role", "customer"),
        },
        status=status.HTTP_201_CREATED,
    )

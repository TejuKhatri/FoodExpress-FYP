from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()


@csrf_exempt
@api_view(["POST"])
def login_api(request):
    """
    Simple login API.
    Expects: { "username": "...", "password": "..." }
    Returns basic user info if credentials are valid.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Username and password required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response(
            {
                "message": "Login successful",
                "username": user.username,
                "email": user.email,
                "phone": getattr(user, "phone", None),
                "role": getattr(user, "role", None),
            },
            status=status.HTTP_200_OK,
        )

    return Response(
        {"error": "Invalid username or password"},
        status=status.HTTP_401_UNAUTHORIZED,
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
        "phone": "...",     # optional but saved if provided
        "password": "...",
        "role": "customer"  # optional, defaults to 'customer'
      }
    """
    username = request.data.get("username")
    email = request.data.get("email")
    phone = request.data.get("phone")
    password = request.data.get("password")
    role = request.data.get("role", "customer")  # default role

    # basic required fields
    if not username or not email or not password:
        return Response(
            {"error": "username, email and password are required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # check duplicates
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

    # create user in Delivery_user table (custom user model)
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
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
        },
        status=status.HTTP_201_CREATED,
    )

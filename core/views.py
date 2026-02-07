from django.shortcuts import render

from rest_framework.viewsets import ModelViewSet
from .models import Student, Teacher, Course, Enrollment
from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    CourseSerializer,
    EnrollmentSerializer
)

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class EnrollmentViewSet(ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

from django.db import models

class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255,blank=True, null=True)
    age = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"{self.fname} {self.lname}"


class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)

    def __str__(self):
        return f"{self.fname} {self.lname}"


class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)
    course_description = models.TextField()
    unit = models.IntegerField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    def __str__(self):
        return self.course_name


class Enrollment(models.Model):
    enrollment_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateTimeField(auto_now_add=True)


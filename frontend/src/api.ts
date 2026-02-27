// src/api.ts
import axios from "axios";
import { Student } from "./type"; // import the interface

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// READ
export const getStudents = async (): Promise<Student[]> => {
  const response = await API.get<Student[]>("students/");
  return response.data;
};

// CREATE
export const createStudent = async (data: { fname: string; lname: string }): Promise<Student> => {
  const response = await API.post<Student>("students/", data);
  return response.data;
};

// UPDATE
export const updateStudent = async (id: number, data: Partial<Student>): Promise<Student> => {
  const response = await API.put<Student>(`students/${id}/`, data);
  return response.data;
};

// DELETE
export const deleteStudent = async (id: number): Promise<void> => {
  await API.delete(`students/${id}/`);
};
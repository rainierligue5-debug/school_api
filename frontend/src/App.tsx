import React, { useEffect, useState } from "react";
import { Student } from "./type";
import StudentList from "./component/studentlist";
import { getStudents, createStudent, updateStudent, deleteStudent } from "./api";

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newFname, setNewFname] = useState<string>("");
  const [newLname, setNewLname] = useState<string>("");

  // Fetch students from API on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add a new student
  const handleAdd = async () => {
    //if (!newFname || !newLname) return;
    try {
      const created = await createStudent({ fname: newFname, lname: newLname });
      setStudents([...students, created]);
      setNewFname("");
      setNewLname("");
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  // Update a student
  const handleUpdate = async (student: Student) => {
    try {
      const updated = await updateStudent(student.student_id, student);
      setStudents(
        students.map((s) => (s.student_id === updated.student_id ? updated : s))
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Delete a student
  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s.student_id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Student Management</h1>

      {/* Add new student */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="First Name"
          value={newFname}
          onChange={(e) => setNewFname(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newLname}
          onChange={(e) => setNewLname(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      {/* Student list */}
      <StudentList
        students={students}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
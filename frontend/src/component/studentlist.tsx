import React, { useState } from "react";
import { Student } from "../type"; 

interface Props {
  students: Student[];
  onUpdate: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentList: React.FC<Props> = ({ students, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFname, setEditFname] = useState<string>("");
  const [editLname, setEditLname] = useState<string>("");

  const handleEdit = (student: Student) => {
    setEditingId(student.student_id);
    setEditFname(student.fname);
    setEditLname(student.lname);
  };

  const handleSave = (student: Student) => {
    onUpdate({
      ...student,
      fname: editFname,
      lname: editLname,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFname("");
    setEditLname("");
  };

  return (
    <ul>
      {students.map((student) => (
        <li key={student.student_id} style={{ marginBottom: "10px" }}>
          {editingId === student.student_id ? (
            <>
              <input
                type="text"
                value={editFname}
                onChange={(e) => setEditFname(e.target.value)}
                placeholder="First Name"
                style={{ marginRight: "5px" }}
              />
              <input
                type="text"
                value={editLname}
                onChange={(e) => setEditLname(e.target.value)}
                placeholder="Last Name"
                style={{ marginRight: "10px" }}
              />
              <button onClick={() => handleSave(student)} style={{ marginRight: "5px" }}>
                Save
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ marginRight: "10px" }}>
                {student.fname} {student.lname}
              </span>
              <button onClick={() => handleEdit(student)} style={{ marginRight: "5px" }}>
                Edit
              </button>
              <button onClick={() => onDelete(student.student_id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default StudentList;
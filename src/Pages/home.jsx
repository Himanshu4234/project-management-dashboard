import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, doc, updateDoc, or } from "firebase/firestore";

const Home = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [teamMembers, setTeamMembers] = useState([""]);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchTasks(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchTasks = async (email) => {
    const q = query(
      collection(db, "tasks"),
      or(where("createdBy", "==", email), where("assignedTo", "array-contains", email))
    );

    const querySnapshot = await getDocs(q);
    const tasksList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksList);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
      alert(error.message);
    }
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, ""]);
  };

  const handleTeamMemberChange = (index, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = value;
    setTeamMembers(updatedMembers);
  };

  const handleAddTask = async () => {
    if (!taskName || !taskDescription || teamMembers.some((member) => member.trim() === "")) {
      alert("Please fill all fields and add at least one team member.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        taskName,
        taskDescription,
        taskStatus,
        assignedTo: [...teamMembers, user.email],
        createdBy: user.email,
        timestamp: new Date(),
      });

      alert("Task added successfully!");
      resetForm();
      await fetchTasks(user.email);
    } catch (error) {
      console.error("Error adding task:", error.message);
      alert("Error adding task.");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskName(task.taskName);
    setTaskDescription(task.taskDescription);
    setTaskStatus(task.taskStatus);
    setTeamMembers(task.assignedTo.filter(email => email !== task.createdBy));
    setShowTaskForm(true);
  };

  const handleUpdateTask = async () => {
    if (!taskName || !taskDescription) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const taskRef = doc(db, "tasks", editingTask.id);
      await updateDoc(taskRef, {
        taskName,
        taskDescription,
        taskStatus,
        assignedTo: [...teamMembers, user.email]
      });

      alert("Task updated successfully!");
      resetForm();
      await fetchTasks(user.email);
    } catch (error) {
      console.error("Error updating task:", error.message);
      alert("Error updating task.");
    }
  };

  const resetForm = () => {
    setEditingTask(null);
    setTaskName("");
    setTaskDescription("");
    setTaskStatus("To Do");
    setTeamMembers([""]);
    setShowTaskForm(false);
  };

  return (
    <div className="userDashBoard">
    <div className="mainHeader" style={{minWidth: "1000px", maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <div className="mainHeaderTop" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3>Welcome, {user?.displayName || user?.email}</h3>
        <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer" }}>Logout</button>
      </div>

      {!showTaskForm && (
        <button
          onClick={() => {
            setEditingTask(null);
            setShowTaskForm(true);
          }}
          style={{ padding: "10px", width: "100%", background: "blue", color: "white", cursor: "pointer" }}
        >
          ➕ Create New Task
        </button>
      )}

      <h2 className="TaskHeading">Your Tasks</h2>
      <ul className="todoList">
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <li key={t.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
              <strong>{t.taskName}</strong>: {t.taskDescription}
              <small>
                <div className="assigned">Assigned to: </div>{t.assignedTo.join(", ")}</small>
              <strong>Status:</strong> 
              <select 
                value={t.taskStatus} 
                onChange={async (e) => {
                  const newStatus = e.target.value;
                  const taskRef = doc(db, "tasks", t.id);
                  await updateDoc(taskRef, { taskStatus: newStatus });
                  await fetchTasks(user.email);
                }} 
                style={{ marginLeft: "10px", padding: "5px" }}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <button onClick={() => handleEditTask(t)} style={{ marginTop: "5px", cursor: "pointer" }}>
                ✏️ Edit
              </button>
            </li>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </ul>

      {showTaskForm && (
        <div className="todoListEditTask">
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>{editingTask ? "Edit Task" : "Create New Task"}</h3>
          <div className="heading_main">
          <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
          <textarea placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          </div>
          
          <h4>Task Status</h4>
          <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <h4>Team Members</h4>
          <div className="member_box">
          {teamMembers.map((member, index) => (
            <input className="member_name" key={index} type="email" placeholder="Enter member email" value={member} onChange={(e) => handleTeamMemberChange(index, e.target.value)} />
          ))}
          </div>
          <div className="member_save_box">
          <button onClick={addTeamMember}>➕ Add Member</button>

          <button onClick={editingTask ? handleUpdateTask : handleAddTask}>
            {editingTask ? "Update Task" : "Save Task"}
          </button>
          </div>
        </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Home;
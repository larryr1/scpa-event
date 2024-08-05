import { useState } from "react";
import axios from 'axios';

export const UsersPage = () => {

  const [newUserData, setNewUserData] = useState({ username: "", password: "" })
  const updateNewUserData = (e) => {
    e.preventDefault();
    var preppedData = { ...newUserData };
    preppedData[e.target.name] = e.target.value;
    setNewUserData(preppedData);
  }

  const createUser = async () => {
    const response = await axios.post("/api/createuser", newUserData, { withCredentials: true });
    if (!response.status === 200) {
      alert("Response status was: " + response.status);
    } else {
      alert("New user success!");
    }
  }

  return (
    <div>
      <h1>Users Page</h1>
      <h2>New User</h2>
      <input type="text" name="username" onChange={updateNewUserData} value={newUserData.username} />
      <input type="password" name="password" onChange={updateNewUserData} value={newUserData.password} />
      <button onClick={createUser}>Create</button>
    </div>
  )
}
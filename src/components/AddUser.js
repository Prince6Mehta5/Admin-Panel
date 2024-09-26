import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, role };

    try {
      await axios.post('http://localhost:5000/users', newUser);
      navigate('/');
    } catch (error) {
      console.error('Error adding new user', error);
    }
  };

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
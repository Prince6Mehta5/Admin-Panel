import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(result.data);
    };
    loadUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/users/${id}`, user);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <input type="text" placeholder="Role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} required />
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
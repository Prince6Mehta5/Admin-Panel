import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(result.data);
    };
    loadUser();
  }, [id]);

  return (
    <div className="container">
      <h2>User Detail</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <Link to="/" className="btn btn-primary">Back to User List</Link>
    </div>
  );
};

export default UserDetail;
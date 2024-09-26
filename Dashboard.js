import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const result = await axios.get('http://localhost:5000/users');
    // Process data to fit chart requirements
    const processedData = result.data.map(user => ({
      date: new Date(user.registrationDate).toLocaleDateString(),
      count: 1,
    }));
    setUserData(processedData);
  };

  return (
    <div className="container">
      <h2>User Registration Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={userData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
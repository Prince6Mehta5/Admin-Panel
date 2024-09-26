import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import UserDetail from './components/UserDetail';

const App = () => {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/add-user" element={<AddUser />} />
    <Route path="/edit-user/:id" element={<EditUser />} />
    <Route path="/user-details/:id" element={<UserDetail />} />
  </Routes>
</Router>
  );
};

export default App;
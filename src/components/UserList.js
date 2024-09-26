import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // State for search input
  const [sortField, setSortField] = useState('name');  // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc');   // Default sort order

  useEffect(() => {
    loadUsers();
  }, []);

  // Fetch all users from the API
  const loadUsers = async () => {
    try {
      const result = await axios.get('http://localhost:5000/users');
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  // Handle the delete functionality
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      loadUsers();  // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users by search term (name or email)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting by field (name, email, role)
  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  // Sort the users based on the selected sortField and sortOrder
  const sortedUsers = filteredUsers.sort((a, b) => {
    const aField = a[sortField].toLowerCase();
    const bField = b[sortField].toLowerCase();

    if (sortOrder === 'asc') {
      return aField > bField ? 1 : -1;
    } else {
      return aField < bField ? 1 : -1;
    }
  });

  return (
    <div className="container">
      <h2>User List</h2>
      <Link to="/add-user" className="btn btn-primary">
        Add User
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mt-3"
      />

      {/* User Table */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortField === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('role')}>
              Role {sortField === 'role' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user-details/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/edit-user/${user.id}`} className="btn btn-info">
                  Edit
                </Link>
                <button className="btn btn-danger ml-2" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
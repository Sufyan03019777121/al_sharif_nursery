import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://al-sharif-nursery.onrender.com/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">👥 Registered Users</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Email</th>
            <th>Registered At</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id || 'unknown'}>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;

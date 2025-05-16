import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://al-sharif-nursery.onrender.com/api/users');
      setUsers(res.data);
    } catch (err) {
      alert('Failed to fetch users');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('کیا آپ واقعی یہ user delete کرنا چاہتے ہیں؟')) return;
    try {
      await axios.delete(`https://al-sharif-nursery.onrender.com/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert('User deleted successfully');
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">All Registered Users</h3>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-success">
            <tr>
              <th>Email</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
               
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserList;

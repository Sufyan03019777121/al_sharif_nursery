import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await fetch('https://al-sharif-nursery.onrender.com/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;

    try {
      const res = await fetch(`https://al-sharif-nursery.onrender.com/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setContacts(contacts.filter((c) => c._id !== id));
        alert('Contact deleted successfully!');
      } else {
        alert('Failed to delete contact.');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-success text-center mb-4">📥 Admin - Contact Messages</h2>

      <div className="table-responsive">
        {contacts.length === 0 ? (
          <p className="text-muted">No contact messages yet.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td 
                    style={{
                      maxWidth: '200px',
                      overflowX: 'auto', 
                      whiteSpace: 'nowrap'
                    }}>{c.message}</td>
                  <td>{new Date(c.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteContact(c._id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;

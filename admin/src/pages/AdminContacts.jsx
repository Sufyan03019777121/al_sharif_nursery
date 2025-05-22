import React, { useEffect, useState } from 'react';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch('https://al-sharif-nursery.onrender.com/api/contacts');
      const data = await res.json();
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('کیا آپ واقعی اس پیغام کو حذف کرنا چاہتے ہیں؟')) return;

    try {
      const res = await fetch(`https://al-sharif-nursery.onrender.com/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('پیغام حذف ہو گیا۔');
        setContacts(contacts.filter(contact => contact._id !== id));
      } else {
        alert('حذف کرنے میں مسئلہ ہے۔');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('سرور کی خرابی، بعد میں کوشش کریں۔');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 text-success">📬 ایڈمن پیغامات</h2>

      {contacts.length === 0 ? (
        <div className="alert alert-warning text-center">
          کوئی پیغامات موجود نہیں ہیں۔
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {contacts.map(({ _id, name, email, message, createdAt }) => (
            <div key={_id} className="col">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                  <p className="card-text">{message}</p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center bg-light">
                  <small className="text-muted">
                    موصول ہوا: {new Date(createdAt).toLocaleString()}
                  </small>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(_id)}
                  >
                    🗑️ حذف کریں
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;

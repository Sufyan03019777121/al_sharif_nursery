import React, { useEffect, useState } from 'react';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // تمام messages fetch کریں
  const fetchContacts = async () => {
    try {
      const res = await fetch('https://al-sharif-nursery.onrender.com/api/contact');
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

  // ایک message delete کریں
  const handleDelete = async (id) => {
    if (!window.confirm('کیا آپ واقعی اس پیغام کو حذف کرنا چاہتے ہیں؟')) return;

    try {
      const res = await fetch(`https://al-sharif-nursery.onrender.com/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('پیغام حذف ہو گیا۔');
        // delete ہونے کے بعد دوبارہ fetch کریں یا locally remove کریں
        setContacts(contacts.filter(contact => contact._id !== id));
      } else {
        alert('حذف کرنے میں مسئلہ ہے۔');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('سرور کی خرابی، بعد میں کوشش کریں۔');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h2>Admin: Contact Messages</h2>
      {contacts.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul className="list-group">
          {contacts.map(({ _id, name, email, message, createdAt }) => (
            <li key={_id} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <h5>{name} ({email})</h5>
                <p>{message}</p>
                <small>{new Date(createdAt).toLocaleString()}</small>
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(_id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminContacts;

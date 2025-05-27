import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://al-sharif-nursery.onrender.com/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for contacting us!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Server error. Please try later.');
    }
  };

  return (
    <div className="contact-container container py-5">
      <h2 className="text-center mb-5 contact-heading">📬 Get in Touch</h2>

      <div className="row g-4">
        {/* Contact Info */}
        <div className="col-md-6 contact-info bg-light rounded shadow-sm p-4">
          <h4 className="mb-3">Contact Information</h4>
          <p><strong>📞 Phone:</strong> +92 305 9425997</p>
          <p><strong>📧 Email:</strong> contact@alsharifnursery.com</p>
          <p><strong>📍 Location:</strong> pattoki, Pakistan</p>
          <p className="mt-4 text-muted">
            We usually respond within 24 hours. You can also reach us on WhatsApp.
          </p>
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
          <div className="bg-white p-4 rounded shadow contact-form">
            <h4 className="mb-4">Send Us a Message</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100">
                ✉️ Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-container {
          background: #f9f9f9;
          border-radius: 10px;
        }

        .contact-heading {
          font-weight: bold;
          color: #2a7d2e;
        }

        .contact-info {
          background: #e7f5e6;
          border-left: 4px solid #2a7d2e;
        }

        .contact-form {
          transition: box-shadow 0.3s;
        }

        .contact-form:hover {
          box-shadow: 0 0 20px rgba(0, 128, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default Contact;

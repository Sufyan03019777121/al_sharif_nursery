import React, { useState } from 'react';
import axios from 'axios';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !confirmPassword)) {
      alert('براہ کرم تمام فیلڈز مکمل کریں!');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      alert('پاس ورڈ میچ نہیں کر رہے!');
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post('https://al-sharif-nursery.onrender.com/api/login', { email, password });
        alert(res.data.message);
      } else {
        const res = await axios.post('https://al-sharif-nursery.onrender.com/api/register', { email, password });
        alert(res.data.message);
        setIsLogin(true);
      }
      // فارم ری سیٹ کرو ہر submit کے بعد
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Server error');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // ہر key press پر state update ہو رہی ہے
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // ہر key press پر state update ہو رہی ہے
            />
          </div>

          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // ہر key press پر state update ہو رہی ہے
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mb-3">
            {isLogin ? 'Login' : 'Register'}
          </button>

          <p className="text-center">
            {isLogin ? 'اکاؤنٹ نہیں ہے؟' : 'پہلے سے اکاؤنٹ موجود ہے؟'}{" "}
            <span
              className="text-primary"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsLogin(!isLogin);
                // فارم صاف کر دیں جب login/register toggle کریں
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;

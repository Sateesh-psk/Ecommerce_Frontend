import React, { useState } from 'react';
import { useLogin } from '../hooks/LoginContext';
import { useNavigate,Link } from 'react-router-dom';
import url from '../components/url';
function Login() {
  const { login } = useLogin(); // Login function from context
  const navigate = useNavigate();

  const [u_name, setUName] = useState(''); // Change to `u_name`
  const [u_pwd, setUPwd] = useState(''); // Change to `u_pwd`
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to your login endpoint
      const response = await fetch(url+'/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ u_name, u_pwd }), // Sending `u_name` and `u_pwd`
      });

      const data = await response.json();
      console.log(data);
      if (data.auth === 'success') {
        // Store the user and token in sessionStorage
        
        sessionStorage.setItem('name',data.user.u_name);
        sessionStorage.setItem('token', data.token);

        // Update the global login state
        login(data.user.u_name);

        // Redirect to home
        navigate('/');
      } else {
        // Handle authentication failure
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.log(err)
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 select-none">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="u_name" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="u_name"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={u_name}
              onChange={(e) => setUName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="u_pwd" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="u_pwd"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={u_pwd}
              onChange={(e) => setUPwd(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setMessage('Login successful');
                navigate("/dashboard");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full h-[100vh] bg-gray-950 flex flex-col justify-center items-center gap-3 p-10'>
            <form className='min-h-[50vh] flex flex-col justify-center items-center w-full md:w-[40%] gap-3 p-5 rounded-xl' onSubmit={handleSubmit} style={{boxShadow: "4px 4px 16px rgba(255,255,255,0.6)"}}>
                <h2 className='text-3xl font-bold tracking-wider mb-4 text-gray-300 uppercase'>Admin Login</h2>
                <input type="email" name="email" placeholder='Email' className='w-full md:w-[80%] p-3 rounded border-none outline-none' onChange={handleChange} value={formData.email} required />
                <input type="password" name="password" placeholder='Password' className='w-full md:w-[80%] p-3 rounded border-none outline-none' onChange={handleChange} value={formData.password} required />
                <button type='submit' className='w-full md:w-[80%] bg-green-600 py-3 px-10 rounded font-semibold text-white flex justify-center items-center hover:bg-green-700 border uppercase tracking-widest'>
                    {loading ? <ClipLoader color="#ffffff" size={24} /> : 'Login'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;

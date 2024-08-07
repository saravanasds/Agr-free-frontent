import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal.jsx';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState({
    mobileNumber: '',
    district: '',
    constituency: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://agr-free-backend.onrender.com/api/user/all');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (err) {
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.mobileNumber.includes(filter.mobileNumber) &&
      user.district.toLowerCase().includes(filter.district.toLowerCase()) &&
      user.constituency.toLowerCase().includes(filter.constituency.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to the first page when filter changes
  }, [filter, users]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full min-h-screen mx-auto px-8 md:px-20 bg-slate-600">
      <h1 className="text-4xl font-bold mb-4 text-center py-5 text-white uppercase">User List</h1>
      <div className="mb-4 border border-gray-400 rounded p-4 flex justify-center lg:justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className='text-white text-2xl font-semibold'>Total Member: <span>{users.length}</span></h2>
        </div>
        <div className='flex justify-center items-center flex-wrap gap-4'>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Filter by Mobile Number"
            value={filter.mobileNumber}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto"
          />
          <input
            type="text"
            name="district"
            placeholder="Filter by District"
            value={filter.district}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto"
          />
          <input
            type="text"
            name="constituency"
            placeholder="Filter by Constituency"
            value={filter.constituency}
            onChange={handleFilterChange}
            className="px-4 py-2 border rounded mr-2 border-none outline-none w-full sm:w-auto"
          />
        </div>

      </div>
      <div className="overflow-x-auto rounded">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Sl.no</th>
              <th className="px-4 py-2 border-b">Member Id</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Mobile Number</th>
              <th className="px-4 py-2 border-b">Constituency</th>
              <th className="px-4 py-2 border-b">Registered On</th>
              <th className="px-4 py-2 border-b">Referrals</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="cursor-pointer text-center" onClick={() => handleRowClick(user)}>
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{user.referralId}</td>
                <td className="px-4 py-2 border-b">{user.name}</td>
                <td className="px-4 py-2 border-b">{user.mobileNumber}</td>
                <td className="px-4 py-2 border-b">{user.constituency}</td>
                <td className="px-4 py-2 border-b">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-2 border-b">{user.referredPeoples.length}</td>
                <td className="px-4 py-2 border-b">
                  <button className="px-8 py-1 bg-blue-500 text-white rounded" onClick={(e) => { e.stopPropagation(); handleRowClick(user); }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-2 mx-1 rounded-full ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {number}
          </button>
        ))}
      </div>
      {selectedUser && <Modal user={selectedUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;

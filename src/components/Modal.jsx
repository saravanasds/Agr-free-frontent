
const Modal = ({ user, onClose }) => {
  if (!user) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-[3px] flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full px-8">
        <h2 className="text-2xl font-bold mb-4 text-center">User Details</h2>
        <ul className="leading-loose">
          <li><strong>Member Id:</strong> {user.referralId}</li>
          <li><strong>Name:</strong> {user.name}</li>
          <li><strong>Gender:</strong> {user.gender}</li>
          <li><strong>Father's Name:</strong> {user.fatherName}</li>
          <li><strong>DOB:</strong> {formatDate(user.dob)}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Referred By:</strong> {user.referredBy}</li>
          <li><strong>Adhaar Number:</strong> {user.adhaarNumber}</li>
          <li><strong>Voter Id:</strong> {user.voterId}</li>
          <li><strong>Mobile Number:</strong> {user.mobileNumber}</li>     
          <li><strong>District:</strong> {user.district}</li>
          <li><strong>Constituency:</strong> {user.constituency}</li>
          <li><strong>Address:</strong> {user.address}</li>
          <li><strong>Registered On:</strong> {formatDate(user.updatedAt)}</li>
        </ul>
        <div className="flex">
          <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
export default Modal  
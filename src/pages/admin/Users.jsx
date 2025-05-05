// src/pages/admin/Users.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api/user')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>USERS</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Bookings</th>
            <th>Announcements</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.bookingHouses}</td>
              <td>{user.application}</td>
              <td>
                <button onClick={() => navigate(`/admin/users/${user.id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
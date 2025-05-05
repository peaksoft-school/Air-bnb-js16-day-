import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api/user/profile?choice=booking`,
        { params: { userId: id } }
      )
      .then((res) => {
        setUser(res.data.user);
        setBookings(res.data.bookings);
      })
      .catch((err) => console.error(err));

    axios
      .get(
        `http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api/user/profile?choice=announcement`,
        { params: { userId: id } }
      )
      .then((res) => setAnnouncements(res.data.announcements))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBlockAll = async () => {
    try {
      await axios.delete(
        `http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api/user/delete`
      );
      setIsBlocked(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <h2>User Profile</h2>
        <p>Name: {user?.fullName}</p>
        <p>Email: {user?.email}</p>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>My Announcements</h3>
        <button onClick={handleBlockAll} disabled={isBlocked}>
          Block All Announcements
        </button>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {announcements.map((house) => (
            <div
              key={house.id}
              style={{
                border: '1px solid #ccc',
                padding: 10,
                width: 200,
                opacity: isBlocked ? 0.5 : 1,
              }}
            >
              <img src={house.image} alt="" style={{ width: '100%' }} />
              <p>{house.address}</p>
              <p>${house.price}/day</p>
              <p>Guests: {house.guests}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const UserDetail = () => {
   const { id } = useParams()
   const [user, setUser] = useState(null)
   const [houses, setHouses] = useState([])
   const [blocked, setBlocked] = useState(false)

   useEffect(() => {
      axios
         .get(
            `http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api/user/profile/${id}`
         )
         .then((res) => {
            setUser(res.data.user)
            setHouses(res.data.houses)
         })
   }, [id])

   const handleBlockAll = () => {
      // Здесь вызов блокировки на сервер
      axios
         .delete(
            `http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api/announcement/block-all-by-user/${id}`
         )
         .then(() => setBlocked(true))
         .catch((err) => console.error(err))
   }

   return (
      <div style={{ padding: 20 }}>
         {user?.map((item) => {
            return (
               <div style={{ marginBottom: 30 }}>
                  <h2>{item.fullName}</h2>
                  <p>Email: {item.email}</p>
               </div>
            )
         })}

         <div style={{ marginTop: 30 }}>
            <h3>My Announcements</h3>
            <button onClick={handleBlockAll} style={{ marginBottom: 10 }}>
               Block All Announcements
            </button>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
               {houses?.map((item, i) => (
                  <div
                     key={i}
                     style={{
                        border: '1px solid #ccc',
                        padding: 10,
                        width: 200,
                        backgroundColor: blocked ? '#ccc' : 'white',
                        opacity: blocked ? 0.5 : 1,
                     }}
                  >
                     <img src={item.image} alt="" style={{ width: '100%' }} />
                     <p>{item.address}</p>
                     <p>{item.price} / day</p>
                     <p>Guests: {item.guests}</p>
                     <p>Check-in: {item.checkin}</p>
                     <p>Check-out: {item.checkout}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default UserDetail

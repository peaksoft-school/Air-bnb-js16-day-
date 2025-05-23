import { useEffect } from 'react'
import {
   Box,
   styled,
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   IconButton,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
   fetchAllUsers,
   deleteUser,
   fetchUserProfile,
} from '../../../store/slices/admin/userThunk'
import Loading from '../../Loading'

const Users = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { users, loading, error } = useSelector((s) => s.user)

   useEffect(() => {
      dispatch(fetchAllUsers())
   }, [dispatch])

   if (loading) return <Loading />

   if (error) return <Typography color="error">Error: {error}</Typography>

   const handleDelete = (e, userId) => {
      e.stopPropagation()
      dispatch(deleteUser(userId))
   }

   const handleNavigate = (id) => {
      dispatch(fetchUserProfile({ choice: 'booking', id }))
         .unwrap()
         .then(() => {
            navigate(`/admin/users/${id}`)
         })
         .catch((error) => {
            console.error('Ошибка загрузки профиля:', error)
         })
   }

   return (
      <UsersTable>
         <Typography className="title">USERS</Typography>
         <StyledTableContainer component={Paper}>
            <StyledTable>
               <StyledTableHead>
                  <TableRow>
                     <StyledTableCell head>№</StyledTableCell>
                     <StyledTableCell head>Name</StyledTableCell>
                     <StyledTableCell head>Email</StyledTableCell>
                     <StyledTableCell head>Bookings</StyledTableCell>
                     <StyledTableCell head>Announcements</StyledTableCell>
                     <StyledTableCell head>Action</StyledTableCell>
                  </TableRow>
               </StyledTableHead>
               <TableBody>
                  {users.map((user, idx) => (
                     <StyledTableRow
                        key={user.id}
                        hover
                        onClick={() => handleNavigate(user.id)}
                        style={{ cursor: 'pointer' }}
                     >
                        <StyledTableCell>{idx + 1}</StyledTableCell>
                        <StyledTableCell>{user.fullName}</StyledTableCell>
                        <StyledTableCell>{user.email}</StyledTableCell>
                        <StyledTableCell>{user.bookingHouses}</StyledTableCell>
                        <StyledTableCell>{user.application}</StyledTableCell>
                        <StyledTableCell>
                           <IconButton
                              onClick={(e) => handleDelete(e, user.id)}
                           >
                              <DeleteOutlineIcon />
                           </IconButton>
                        </StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody>
            </StyledTable>
         </StyledTableContainer>
      </UsersTable>
   )
}

const StyledTableContainer = styled(TableContainer)({
   background: '#f5f5f5',
   borderRadius: 0,
   boxShadow: 'none',
   marginTop: 20,
})
const StyledTable = styled(Table)({ minWidth: 700, borderCollapse: 'collapse' })
const StyledTableHead = styled(TableHead)({ background: '#545454' })
const StyledTableRow = styled(TableRow)({
   borderBottom: '1px solid #e0e0e0',
   '&:nth-of-type(even)': { backgroundColor: '#f0f0f0' },
   '&:hover': { backgroundColor: '#e9e9e9' },
})
const StyledTableCell = styled(TableCell)(({ head }) => ({
   fontSize: 15,
   padding: '10px 16px',
   backgroundColor: head ? '#545454' : 'inherit',
   color: head ? '#fff' : '#222',
   border: 'none',
   fontWeight: head ? 500 : 400,
}))
const UsersTable = styled(Box)(() => ({
   padding: '50px 40px',
   '& .title': {
      fontSize: 20,
      fontWeight: 500,
      color: '#000',
      marginBottom: 24,
      fontFamily: 'Inter',
   },
}))

export default Users

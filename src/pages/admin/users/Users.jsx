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
import Loading from '../../Loading'
import { USERS_THUNKS } from '../../../store/slices/admin/users/userThunk'

const Users = () => {
   const { users, loading, error } = useSelector((state) => state.users)

   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(USERS_THUNKS.getAllUsers())
   }, [dispatch])

   if (loading) return <Loading />

   if (error) return <Typography color="error">Error: {error}</Typography>

   const handleDelete = (e, userId) => {
      e.stopPropagation()

      dispatch(USERS_THUNKS.deleteUser(userId))
   }

   const handleNavigate = (id) => {
      dispatch(USERS_THUNKS.getUserProfile({ choice: 'booking', id, navigate }))
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
                  {users?.map((user, i) => (
                     <StyledTableRow
                        key={user.id}
                        hover
                        onClick={() => handleNavigate(user.id)}
                     >
                        <StyledTableCell>{i + 1}</StyledTableCell>
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

export default Users

const StyledTableContainer = styled(TableContainer)({
   background: '#f5f5f5',
   borderRadius: 0,
   boxShadow: 'none',
})

const StyledTable = styled(Table)({
   minWidth: 700,
   borderCollapse: 'collapse',
})

const StyledTableHead = styled(TableHead)({
   background: '#545454',
})

const StyledTableRow = styled(TableRow)({
   borderBottom: '1px solid #e0e0e0',
   cursor: 'pointer',

   '&:nth-of-type(even)': {
      backgroundColor: '#f0f0f0',
   },

   '&:hover': {
      backgroundColor: '#e9e9e9',
   },
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
   '& .title': {
      fontSize: 20,
      fontWeight: 500,
      color: '#000',
      marginBottom: 24,
      fontFamily: 'Inter',
   },
}))

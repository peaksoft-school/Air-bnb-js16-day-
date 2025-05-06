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

import { useNavigate } from 'react-router'

const usersData = [
   {
      id: 1,
      fullName: 'Максат Максатов',
      email: 'example@gmail.com',
      bookingCount: 1,
      announcementCount: 2,
   },
   {
      id: 2,
      fullName: 'Максат Максатов',
      email: 'example@gmail.com',
      bookingCount: 1,
      announcementCount: 2,
   },
   {
      id: 3,
      fullName: 'Максат Максатов',
      email: 'example@gmail.com',
      bookingCount: 1,
      announcementCount: 2,
   },
   {
      id: 4,
      fullName: 'Максат Максатов',
      email: 'example@gmail.com',
      bookingCount: 1,
      announcementCount: 2,
   },
]

const Users = () => {
   const navigate = useNavigate()

   return (
      <UsersTable>
         <Typography style={{}} className="title">
            USERS
         </Typography>

         <StyledTableContainer component={Paper}>
            <StyledTable>
               <StyledTableHead>
                  <TableRow>
                     <StyledTableCell head>№</StyledTableCell>
                     <StyledTableCell head>Name</StyledTableCell>
                     <StyledTableCell head>Contact</StyledTableCell>
                     <StyledTableCell head>Bookings</StyledTableCell>
                     <StyledTableCell head>Announcement</StyledTableCell>
                     <StyledTableCell head>Action</StyledTableCell>
                  </TableRow>
               </StyledTableHead>
               <TableBody>
                  {usersData.map((user) => (
                     <StyledTableRow
                        key={user.id}
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        style={{
                           cursor: 'pointer',
                        }}
                     >
                        <StyledTableCell>{user.id}</StyledTableCell>
                        <StyledTableCell>{user.fullName}</StyledTableCell>
                        <StyledTableCell>{user.email}</StyledTableCell>
                        <StyledTableCell>{user.bookingCount}</StyledTableCell>
                        <StyledTableCell>
                           {user.announcementCount}
                        </StyledTableCell>
                        <StyledTableCell>
                           <IconButton
                              aria-label="delete"
                              size="small"
                              style={{ color: '#545454' }}
                              onClick={(e) => {
                                 e.stopPropagation()
                                 console.log('Delete user')
                              }}
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
   marginTop: 20,
})

const StyledTable = styled(Table)({
   minWidth: 700,
   borderCollapse: 'collapse',
})

const StyledTableHead = styled(TableHead)({
   background: '#545454',
})

const StyledTableRow = styled(TableRow)(({ selected }) => ({
   backgroundColor: selected ? '#fff' : 'inherit',
   borderBottom: '1px solid #e0e0e0',
   '&:nth-of-type(even)': {
      backgroundColor: '#f0f0f0',
   },
   '&:hover': {
      backgroundColor: '#e9e9e9',
   },
   ...(selected && {
      outline: '2px solid #2196f3',
      outlineOffset: '-2px',
   }),
}))

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
      color: '#000000',
      marginBottom: 24,
      FontFamily: 'Inter',
   },
}))

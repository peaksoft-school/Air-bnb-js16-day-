import { Box, Typography, styled } from '@mui/material'

const BookedCard = ({ userName, date, status }) => (
   <StyledCard>
      <Typography variant="h6">{userName}</Typography>
      <Typography>Date: {date}</Typography>
      <Typography>Status: {status}</Typography>
   </StyledCard>
)

const StyledCard = styled(Box)(({ theme }) => ({
   padding: theme.spacing(2),
   border: `1px solid ${theme.palette.divider}`,
   borderRadius: theme.shape.borderRadius,
   marginBottom: theme.spacing(2),
}))

export default BookedCard

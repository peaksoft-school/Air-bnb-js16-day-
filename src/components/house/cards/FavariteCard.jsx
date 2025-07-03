import React from 'react'
import { Box, Typography, styled } from '@mui/material'

const FavoriteCard = ({ userName, date }) => (
   <StyledCard>
      <Typography variant="h6">{userName}</Typography>
      <Typography>Favorited on: {date}</Typography>
   </StyledCard>
)

const StyledCard = styled(Box)(({ theme }) => ({
   padding: theme.spacing(2),
   border: `1px solid ${theme.palette.divider}`,
   borderRadius: theme.shape.borderRadius,
   marginBottom: theme.spacing(2),
}))

export default FavoriteCard

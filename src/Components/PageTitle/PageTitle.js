import React from 'react'
import { Typography } from '@mui/material'
export default function PageTitle({ children }) {
  return (
    <Typography variant='h5' sx={{fontWeight:'bold'}}>
      { children }
    </Typography>
  )
}

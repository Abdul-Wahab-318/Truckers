import React from 'react'
import { Typography } from '@mui/material'

export default function SectionTitle({ children }) {
  return (
    <Typography variant='h6' sx={{fontWeight:'bold' , mb:0}}>
      { children }
    </Typography>
  )
}

import { Box } from '@mui/material'
import React from 'react'

export default function CustomBox({ children , sx , ...props }) {

    const style = {
        border : '1px solid #D9D9D9' ,
        padding : '30px',
        borderRadius : '10px',
        ...sx
    }

  return (
    <Box sx={style} {...props}>
        {children}
    </Box>
  )
}

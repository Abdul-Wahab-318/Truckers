import React from 'react'
import { Stack , Box, Divider, Typography, Grid } from '@mui/material'

// stats is an array of objects
/*
[
    {
        label : string ,
        value : number ,
        img : Image
    }
    ...
]
*/ 
export default function Stats({ stats = [] }) {

  return (
    <Box>
        <Stack
        divider={<Divider orientation="vertical" flexItem />}
        direction={{ xs: 'column' , md: 'row' }}
        spacing={{ xs: 1, md: 2, lg: 4 }}
        sx={{ justifyContent : 'space-between'}}
        >
            {
                stats.map( ( stat , ind ) => {
                    return(
                        <Box key={ind} sx={{display:'flex' , alignItems:'center' , gap : 2}}>
                            {
                                stat.img ? 
                                <img src={stat.img} width={'30px'} alt='icon' />
                                :
                                <Box sx={{width:'30px',height:'30px',border:1,borderColor:'#D9D9D9' , borderRadius:'5px'}}></Box>
                            }
                            <Box>
                                <Typography variant='h6' sx={{textTransform:'uppercase' ,fontSize:'12px' , color:"#8E8E8E"}}> { stat.label } </Typography>
                                <Typography variant='h5' sx={{fontWeight:'bold'}} > { stat.value } </Typography>
                            </Box>
                        </Box>
                    )
                })
            }
        </Stack>
    </Box>
  )
}

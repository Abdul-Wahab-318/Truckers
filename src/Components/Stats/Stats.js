import React, { useEffect , useState } from 'react'
import { Stack , Box, Divider, Typography, Grid } from '@mui/material'
import axiosInstance from '../../axiosInstance'
import pendingIcon from "../../images/delivery.png"
import deliveredIcon from "../../images/complete.png"
import routeIcon from "../../images/route.png"

export default function Stats() {

    const [ stats , setStats ] = useState([
        {
            label : 'Pending Shipments' , 
            data : 0 
        } ,
        {
            label : 'Delivered Shipments' ,
            data : 0
        } ,
        {
            label : 'Most Popular Route' ,
            data : "None"
        }
    ])
    const images = [ pendingIcon , deliveredIcon , routeIcon ]
    useEffect(() => {

        ( async ()=>{

            try{
                let { data } = await axiosInstance.get("/shipment/shipment-stats")
                setStats(data.data)
                console.log(data)    
            }
            catch(err)
            {
                console.log(err)
            }

        })()

    },[])
    
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
                                <img src={images[ind]} width={'30px'} alt='icon' />
                                :
                                <Box sx={{width:'30px',height:'30px',border:1,borderColor:'#D9D9D9' , borderRadius:'5px'}}></Box>
                            }
                            <Box>
                                <Typography variant='h6' sx={{textTransform:'uppercase' ,fontSize:'12px' , color:"#8E8E8E"}}> { stat.label } </Typography>
                                <Typography variant='h6' sx={{fontWeight:'bold'}} > { stat.data } </Typography>
                            </Box>
                        </Box>
                    )
                })
            }
        </Stack>
    </Box>
  )
}

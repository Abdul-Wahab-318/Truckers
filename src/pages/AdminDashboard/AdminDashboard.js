import { Box , Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CustomButton from "../../Components/CustomButton/CustomButton.js"
import CustomBox from '../../Components/CustomBox/CustomBox.js'
import PageTitle from '../../Components/PageTitle/PageTitle.js'
import Stats from "../../Components/Stats/Stats.js"
import ShipmentGrid from '../../Components/ShipmentGrid/ShipmentGrid.js'
import VehicleGrid from '../../Components/VehicleGrid/VehicleGrid.js'

export default function SellerDashboard() {

  return (
    <Box>
        <Stack sx={{ justifyContent:'space-between' , flexDirection : { xs: 'column' , sm : 'row' }}} >
            <PageTitle >
                Admin Dashboard
            </PageTitle>
            <Box sx={{display:'flex' , gap : 3 , mt : { xs : 2 , sm : 0 } }}>
                <CustomButton variant="outlined"> SEK 20000 </CustomButton>
            </Box>
        </Stack>
        <Grid container sx={{mt:0}} width={'100%'} spacing={4}>
            <Grid item xs={12} sx={{display:'flex',gap:4,flexDirection:'column'}}>
                <CustomBox>
                    <Stats />
                </CustomBox>
                <ShipmentGrid/>
                <VehicleGrid/>
            </Grid>
        </Grid>
    </Box>
  )
}

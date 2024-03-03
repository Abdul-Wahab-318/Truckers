import { Box , Grid, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomButton from "../../Components/CustomButton/CustomButton.js"
import CustomBox from '../../Components/CustomBox/CustomBox.js'
import PageTitle from '../../Components/PageTitle/PageTitle.js'
import SectionTitle from '../../Components/SectionTitle/SectionTitle.js'
import Stats from "../../Components/Stats/Stats.js"
import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown.js'
import ShipmentGrid from '../../Components/ShipmentGrid/ShipmentGrid.js'
import DroneGrid from '../../Components/DroneGrid/DroneGrid.js'

export default function SellerDashboard() {

  return (
    <Box>
        <Stack sx={{ justifyContent:'space-between' , flexDirection : { xs: 'column' , sm : 'row' }}} >
            <PageTitle >
                Admin Dashboard
            </PageTitle>
            <Box sx={{display:'flex' , gap : 3 , mt : { xs : 2 , sm : 0 } }}>
                <CustomButton variant="outlined"> SEK 20000 </CustomButton>
                <CustomDropdown title={'Profile'} />
            </Box>
        </Stack>
        <Grid container sx={{mt:0}} spacing={4}>
            <Grid item md={12} sx={{display:'flex',gap:4,flexDirection:'column'}}>
                <CustomBox>
                    <Stats/>
                </CustomBox>
                <PageTitle >
                    Shipments
                </PageTitle>
                <CustomBox>
                    <ShipmentGrid/>
                </CustomBox>
                <PageTitle >
                    Drones
                </PageTitle>
                <CustomBox>
                    <DroneGrid/>
                </CustomBox>

            </Grid>
        </Grid>
    </Box>
  )
}

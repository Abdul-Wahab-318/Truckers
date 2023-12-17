import { Box , Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import CustomButton from "../../Components/CustomButton/CustomButton.js"
import CustomBox from '../../Components/CustomBox/CustomBox'
import PageTitle from '../../Components/PageTitle/PageTitle'
import SectionTitle from '../../Components/SectionTitle/SectionTitle'
import Stats from "../../Components/Stats/Stats.js"
import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown.js'
import ShipmentGrid from '../../Components/ShipmentGrid/ShipmentGrid.js'

export default function SellerDashboard() {

    const STATS = [
        {
            label : 'pending requests' , 
            value : 200 
        } ,
        {
            label : 'approved shipments' , 
            value : 200 
        } ,
        {
            label : 'total shipments' , 
            value : 2000 
        }        
    ]

  return (
    <Box>
        <Stack sx={{ justifyContent:'space-between' , flexDirection : { xs: 'column' , sm : 'row' }}} >
            <PageTitle >
                Employee Dashboard
            </PageTitle>
            <Box sx={{display:'flex' , gap : 3 , mt : { xs : 2 , sm : 0 } }}>
                <CustomButton variant="outlined"> SEK 20000 </CustomButton>
                <CustomDropdown title={'Profile'} />
            </Box>
        </Stack>
        <Grid container sx={{mt:0}} spacing={4}>
            <Grid item md={12} sx={{display:'flex',gap:4,flexDirection:'column'}}>
                <CustomBox>
                    <Stats stats={STATS} />
                </CustomBox>
                <CustomBox>
                    <ShipmentGrid/>
                </CustomBox>

            </Grid>
        </Grid>
    </Box>
  )
}

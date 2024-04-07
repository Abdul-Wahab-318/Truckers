import { Box , Grid, Stack, Typography } from '@mui/material'
import React , {useState , useEffect} from 'react'
import CustomButton from "../../Components/CustomButton/CustomButton.js"
import CustomBox from '../../Components/CustomBox/CustomBox.js'
import PageTitle from '../../Components/PageTitle/PageTitle.js'
import CustomDropdown from '../../Components/CustomDropdown/CustomDropdown.js'
import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid.js'
import { useTheme} from '@mui/material'
import axiosInstance from '../../axiosInstance'
import {store} from '../../redux/store/store.js'

export default function DriverDashboard() {

  return (
    <Box>
        <Stack sx={{ justifyContent:'space-between' , alignItems : 'center' , flexDirection : { xs: 'column' , sm : 'row' }}} >
            <PageTitle >
                Shipments
            </PageTitle>
            <Box sx={{display:'flex' , gap : 3 , mt : { xs : 2 , sm : 0 } }}>
                <CustomButton variant="outlined"> SEK 20000 </CustomButton>
                <CustomDropdown title={'Profile'} />
            </Box>
        </Stack>
        <Grid container sx={{mt:0}} spacing={4}>
            <Grid item md={12} sx={{display:'flex',gap:4,flexDirection:'column'}}>
                <CustomBox>
                    <ShipmentGrid/>
                </CustomBox>
            </Grid>
        </Grid>
    </Box>
  )
}

const ShipmentGrid = () => {

    const vehicleID = store.getState().persistedReducer.value.vehicleAssigned
    const theme = useTheme()
    const editBtnStyle = {
        fontSize : '14px' , textTransform:'capitalize' , p:'5px 10px' , 
        minWidth : 'auto' , ":hover" : {bgcolor : 'blue'}
    }

    const gridStyle = {
        
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
        }
            
    }

    const [ shipments , setShipments ] = useState([])
    
    const columns = [
        {
            field: 'id',
            headerName: 'Shipment id',
            valueGetter : ( params ) => {
                return params.row.id.toString().slice(-6)
            } , 
            editable: false,
            flex : 1
        },

        {
            field: 'address',
            headerName: 'Address',
            editable: false,
            flex : 2
        },
        {
            field: 'status',
            headerName: 'Current Status',
            editable: false,
            flex : 1
        },
        {
            field: 'action1',
            headerName: 'Mark Delivered',
            editable: true,
            renderCell : (params) => {
                return (
                    <CustomButton  sx={{...editBtnStyle}} onClick={()=>handleDeliver(params.row._id)}>
                        Complete
                    </CustomButton>
                )
            },
            flex : 1
        } ,
        {
            field: 'action2',
            headerName: 'Mark Cancelled',
            editable: true,
            renderCell : (params) => {
                return (
                    <CustomButton sx={{...editBtnStyle}} onClick={()=>handleCancel(params.row._id)}>
                       Cancel
                    </CustomButton>
                )
            },
            flex : 1
        }
    ]


    useEffect(() => {
        ( async () => {
            try{
                const { data } = await axiosInstance.get("/vehicle/shipment-by-vehicle/" + vehicleID) 
                console.log(data)
                setShipments( data.data )
            }
            catch(err)
            {
                console.log(err)
            }
        })()
    } , [])


    const handleDeliver = async ( id ) => {

        try {
            let { data } = await axiosInstance.put("/shipment/deliver/" + id ) 
            console.log(data)
            setShipments( shipments => shipments.map(shipment =>  shipment._id === id ? { ...shipment , status : 'delivered' } : shipment ) )
        }
        catch(err)
        {
            console.error(err)
        }

    }

    const handleCancel = async ( id ) => {

        try {
            let { data } = await axiosInstance.put("/shipment/cancel/" + id ) 
            console.log(data)
            setShipments( shipments => shipments.map(shipment =>  shipment._id === id ? { ...shipment , status : 'cancelled' } : shipment ) )
        }
        catch(err)
        {
            console.error(err)
        }

    }


    if ( shipments.length === 0 )
        return <h4 style={{'textAlign':'center' , 'margin':0}}>No Shipments</h4>

    return (
        <CustomDataGrid columns={columns} rows={shipments} style={gridStyle} />
    )
}

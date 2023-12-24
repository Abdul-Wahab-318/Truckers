import React , { useEffect , useState } from 'react'
import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid'
import { Button, Switch , Stack, useTheme} from '@mui/material'
import axiosInstance from '../../axiosInstance'
import { Link } from 'react-router-dom/dist'

export default function VehicleGrid() {
    
    const theme = useTheme()
    const editBtnStyle = {
        color: theme.palette.secondary.main , fontWeight : '600' ,
        fontSize : '17px' , textTransform:'capitalize' , p:'0px' , 
        minWidth : 'auto' , ":hover" : {bgcolor : 'transparent'}
    }

    const gridStyle = {
        
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
        }
            
    }

    const [ vehicles , setVehicles ] = useState([])

    const columns = [
        {
            field: 'id',
            headerName: 'Vehicle id',
            valueGetter : ( params ) => {
                return params.row.id
            } , 
            editable: false,
            flex : 1
        },

        {
            field: 'from',
            headerName: 'from',
            editable: false,
            flex : 1
        },
        {
            field: 'to',
            headerName: 'to',
            editable: false,
            flex : 1
        },
        {
            field: 'track',
            headerName: 'View Route',
            editable: true,
            renderCell : (params) => {
                return (
                    <Link to={'/vehicle-route/' + params.row._id}
                     sx={{...editBtnStyle}}>
                        View
                    </Link>
                )
            },
            flex : 1
        }
    ]


    useEffect(() => {
        ( async () => {
            try{
                const { data } = await axiosInstance.get("/vehicle/vehicles") 
                console.log(data)
                setVehicles( data.data )
            }
            catch(err)
            {
                console.log(err)
            }
        })()
    } , [])


    if ( vehicles.length === 0 )
        return <h4 style={{'textAlign':'center' , 'margin':0}}>No vehicles</h4>

  return (
    <CustomDataGrid columns={columns} rows={vehicles} style={gridStyle} />
  )
}

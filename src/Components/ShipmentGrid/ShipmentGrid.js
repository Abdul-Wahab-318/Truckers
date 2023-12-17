import React , { useEffect , useState } from 'react'
import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid'
import { Button, Switch , Stack, useTheme} from '@mui/material'
import axiosInstance from '../../axiosInstance'
import { Link } from 'react-router-dom/dist'

export default function ShipmentGrid() {
    
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
            field: 'vehicle',
            headerName: 'Vehicle Assigned',
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
            field: 'status',
            headerName: 'Current Status',
            editable: false,
            flex : 1
        },
        {
            field: 'track',
            headerName: 'Track',
            editable: true,
            renderCell : (params) => {
                return (
                    <Link to={'/Shipment-map/' + params.row._id}
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
                const { data } = await axiosInstance.get("/shipment/shipments") 
                console.log(data)
                setShipments( data.data )
            }
            catch(err)
            {
                console.log(err)
            }
        })()
    } , [])

    const handleSwitchToggle = (e) => {
        if ( e.target.checked )
            console.log("Switch checked")
        else   
            console.log("Switch unchecked")
    }

    if ( shipments.length === 0 )
        return <h4 style={{'textAlign':'center' , 'margin':0}}>No Shipments</h4>

  return (
    <CustomDataGrid columns={columns} rows={shipments} style={gridStyle} />
  )
}

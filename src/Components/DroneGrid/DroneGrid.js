import React , { useEffect , useState } from 'react'
import CustomDataGrid from '../CustomDataGrid/CustomDataGrid'
import { Button, Switch , Stack, useTheme} from '@mui/material'
import axiosInstance from '../../axiosInstance'
import { Link } from 'react-router-dom/dist'

export default function DroneGrid() {
    
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

    const [ drones , setdrones ] = useState([])

    const columns = [
        {
            field: 'id',
            headerName: 'drone id',
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
                    <Link to={'/drone-route/' + params.row._id}
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
                const { data } = await axiosInstance.get("/drone/drones") 
                setdrones( data.data )
            }
            catch(err)
            {
                console.log(err)
            }
        })()
    } , [])


    if ( drones.length === 0 )
        return <h4 style={{'textAlign':'center' , 'margin':0}}>No drones</h4>

  return (
    <CustomDataGrid columns={columns} rows={drones} style={gridStyle} />
  )
}

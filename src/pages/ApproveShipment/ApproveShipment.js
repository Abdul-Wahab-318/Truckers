import React, { useEffect, useState } from 'react'
import CustomBox from '../../Components/CustomBox/CustomBox'
import { DataGrid } from '@mui/x-data-grid';
import axiosInstance from '../../axiosInstance';
import CustomButton from '../../Components/CustomButton/CustomButton';
import { Grid } from '@mui/material';
import CustomDataGrid from '../../Components/CustomDataGrid/CustomDataGrid';
import PageTitle from '../../Components/PageTitle/PageTitle';

export default function ApproveShipment() {

    const handleApproval = async () => {
        try{
            const approval = await axiosInstance.put("/shipment/approve/" )
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const handleDenial = async () => {
        try{
            const data = await axiosInstance.delete("/shipment/delete/" )
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const columns = [
 
        {
            field: 'id',
            headerName: 'Shipment ID',
            valueGetter: ( params ) => {
                return params.row.id.toString().slice(-6)
            } ,
            editable: false,
            flex : 1
        },
        {
            field: 'drone',
            headerName: 'drone Assigned',
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
            field: 'approve',
            headerName: 'Approve',
            editable: false,
            renderCell : (params) => {
                return (
                    <CustomButton onClick={handleApproval} >Approve</CustomButton>
                )
            },

            flex : 1
        },
        {
            field: 'deny',
            headerName: 'Deny',
            editable: false,
            renderCell : (params) => {
                return (
                    <CustomButton onClick={handleDenial}>Deny</CustomButton>
                )
            },

            flex : 1
        }
    ]
    const [ shipments , setShipments ] = useState([])

    useEffect(() => {

        ( async () => {
            try{
                const { data : shipments } = await axiosInstance.get('/shipment/shipments/pending') 
                const pendingShipments = shipments.data 
                setShipments( pendingShipments )
            }
            catch(err)
            {
                console.log(err)
            }
        })()

    } , [])
  return (
    <CustomBox>
        <PageTitle>Approve Shipments</PageTitle>
        <br />
        <CustomDataGrid columns={columns} rows={shipments} />
    </CustomBox>
  )
}

const GridRow = ( {data} ) => {

    const handleApproval = async () => {
        try{
            console.log(data._id)
            const approval = await axiosInstance.put("/shipment/approve/" + data._id)
            console.log(data)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    const handleDenial = async () => {
        try{
            const data = await axiosInstance.delete("/shipment/delete/" + data._id)
            console.log(data)
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return(
        <Grid container sx={{'marginY' : 3}}>
            <Grid flex={4} item>
                { data._id }
            </Grid>
            <Grid flex={4} item>
                <CustomButton onClick={handleApproval} >Approve</CustomButton>
            </Grid>
            <Grid flex={4} item>
                <CustomButton onClick={handleDenial}>Deny</CustomButton>
            </Grid>
        </Grid>
    )
}

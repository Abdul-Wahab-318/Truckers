import React ,{useState} from 'react'
import CustomBox from '../../Components/CustomBox/CustomBox'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { Box, FormControl, Select, TextField, Typography } from '@mui/material'
import PageTitle from '../../Components/PageTitle/PageTitle'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axiosInstance from '../../axiosInstance';
import { ToastContainer , toast } from 'react-toastify'

export default function CreateVehicle() {

    let [ from , setFrom ] = useState('')
    let [ to , setTo ] = useState('')
    let [ id , setId ] = useState('')
    let [ error , setError ] = useState('')


    const validate = () => {
        if ( from === '' || to === ''|| id === '' )
        {
            setError("Invalid input")
            return false 
        }

        return true

    }

    const clearForm = () => {
        setFrom('')
        setId('')
        setTo('')
    }


    const handleSubmit = async () => {

        if ( !validate() )
        return 

        const payload = { from , to , id }
        
        try{
            const { data } = await axiosInstance.post("/vehicle/create" , payload)
            clearForm()
            toast.success("Vehicle created successfully")
        }   
        catch( err )
        {
            console.log(err)
        }

    }

    const handleSelectChange = ( handler , state ) => {
        handler(state)
    }

  return (

    <CustomBox sx={{maxWidth : '800px' , marginX : 'auto'}}>
        <PageTitle>Create A New Vehicle</PageTitle>

        <FormControl fullWidth sx={{'mt':5}}>
            <TextField label="Vehicle ID" type='text' value={id} placeholder='Vehicle ID' onChange={(e)=> setId(e.target.value)} />
        </FormControl>

        <FormControl fullWidth sx={{marginTop:5}}>
            <InputLabel id="fromLabel">From</InputLabel>
            <Select
                fullWidth
                labelId="fromLabel"
                id="from"
                value={from}
                label="From"
                onChange={(e)=>handleSelectChange( setFrom , e.target.value)}
                
                >
                <MenuItem value={'islamabad'}>islamabad</MenuItem>
                <MenuItem value={'lahore'}>lahore</MenuItem>
                <MenuItem value={'sahiwal'}>sahiwal</MenuItem>
                <MenuItem value={'attock'}>attock</MenuItem>
                <MenuItem value={'gujranwala'}>gujranwala</MenuItem>
            </Select>
        </FormControl>

        <FormControl fullWidth sx={{marginTop:5}}>
            <InputLabel id="to">To</InputLabel>
            <Select
            fullWidth
            labelId="to"
            id="to"
            value={to}
            label="to"
            onChange={(e)=>handleSelectChange(setTo , e.target.value)}
            
            >
                <MenuItem value={'islamabad'}>islamabad</MenuItem>
                <MenuItem value={'lahore'}>lahore</MenuItem>
                <MenuItem value={'sahiwal'}>sahiwal</MenuItem>
                <MenuItem value={'attock'}>attock</MenuItem>
                <MenuItem value={'gujranwala'}>gujranwala</MenuItem>
            </Select>
        </FormControl>




        <FormControl fullWidth sx={{'mt':5}}>
            <p style={{'color':'red' , 'padding':'20px' , 'margin' : 'auto'}}>{error }</p>
            <CustomButton  onClick={()=>handleSubmit()}>Submit</CustomButton>
        </FormControl>
        <ToastContainer/>

    </CustomBox>
  )
}

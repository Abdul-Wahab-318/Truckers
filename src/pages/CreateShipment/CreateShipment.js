import React ,{useState , useEffect} from 'react'
import CustomBox from '../../Components/CustomBox/CustomBox'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { Box, FormControl, Select, TextField, Typography } from '@mui/material'
import PageTitle from '../../Components/PageTitle/PageTitle'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axiosInstance from '../../axiosInstance';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function CreateShipment() {

    let [ from , setFrom ] = useState('')
    let [ to , setTo ] = useState('')
    let [ address , setAddress ] = useState('')
    let [ weight , setWeight ] = useState('')
    let [ drone , setDrone ] = useState('')
    let [ drones , setDrones ] = useState([
        {
            id : 'V-002' ,
            name : 'V-002' ,
            from : 'islamabad' ,
            to : 'attock'
        } ,
        {
            id : 'V-003' ,
            name : 'V-003' ,
            from : 'attock' ,
            to : 'islamabad'
        }
    ])
    let [ error , setError ] = useState('')


    const validate = () => {
        if ( from === '' || to === '' || weight === '' || address === '' )
        {
            setError("Invalid input")
            return false 
        }

        return true

    }

    const clearForm = () => {
        setFrom('')
        setAddress('')
        setTo('')
        setWeight('')
        setDrone('')
    }


    const handleSubmit = async () => {

        if ( !validate() )
        return 

        const payload = { from , to , weight , drone , address : address.label }
        
        try{
            const { data } = await axiosInstance.post("/shipment/create" , payload)
            clearForm()
        }   
        catch( err )
        {
            console.log(err)
        }

    }

    const handleSelectChange = ( handler , state ) => {
        handler(state)
    }

    useEffect(() => {
        ( async () => {
            try{
                let { data } = await axiosInstance.get('/drone/drones/filtered')
                setDrones(data.data)
                console.log(data.data)
            }
            catch(err)
            {
                console.log(err)
            }
        })()
    },[])

  return (

    <CustomBox sx={{maxWidth : '800px' , marginX : 'auto'}}>
        <PageTitle>Create A New Shipment</PageTitle>

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
                    {
                        drones.map( (drone , ind) => <MenuItem key={ind} value={drone.from}>{drone.from}</MenuItem> )
                    }

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
                {
                    drones.map( (drone , ind) => <MenuItem key={ind} value={drone.to}>{drone.to}</MenuItem> )
                }
            </Select>
        </FormControl>

        <Box style={{'position' : 'relative' , zIndex : '10' , marginTop : 25}} className="pt-4">
            <GooglePlacesAutocomplete
            placeholder="Address"
            selectProps={{ address , onChange : setAddress , placeholder : 'Address'  }}
            apiKey={process.env.REACT_APP_API_KEY}
            />
        </Box>


        <FormControl fullWidth sx={{marginTop:5}}>
            {
                (from === '' || to === '') ? 
                <>
                    <InputLabel id="drone">Drone</InputLabel>
                    <Select
                    disabled
                    fullWidth
                    labelId="drone"
                    id="drone"
                    value={drone}
                    label="drone"

                    >
                    </Select>
                </>
                :
                <>
                    <InputLabel id="drone">Drone</InputLabel>
                    <Select
                    fullWidth
                    labelId="drone"
                    id="drone"
                    value={drone}
                    label="drone"
                    onChange={(e)=>handleSelectChange(setDrone , e.target.value)}

                    >
                        {
                            drones.filter( v => ( v.from == from && v.to === to )).map( v =>  <MenuItem key={v._id} value={v._id}> {v.id} </MenuItem>)    
                        }
                    </Select>
                </>

            }
            <span style={{fontSize:'12px' , paddingTop : '10px'}}> (select source and destination first)</span>
        </FormControl>


        <FormControl fullWidth sx={{'mt':5}}>
            <TextField label="Weight (kgs)" type='number' value={weight} placeholder='weight (kgs)' onChange={(e)=> setWeight(e.target.value)} />
            <p style={{'color':'red' , 'padding':'20px' , 'margin' : 'auto'}}>{error }</p>
            <CustomButton  onClick={()=>handleSubmit()}>Submit</CustomButton>
        </FormControl>

    </CustomBox>
  )
}

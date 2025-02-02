import React ,{useState , useEffect} from 'react'
import CustomBox from '../../Components/CustomBox/CustomBox'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { Box, FormControl, Select, TextField, Typography } from '@mui/material'
import PageTitle from '../../Components/PageTitle/PageTitle'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import axiosInstance from '../../axiosInstance';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { ToastContainer , toast } from 'react-toastify'
export default function CreateShipment() {
    console.log("key : " , process.env.REACT_APP_API_KEY)
    let [route , setRoute] = useState("")
    let [uniqueRoutes , setUniqueRoutes] = useState([])
    let [ from , setFrom ] = useState('')
    let [ to , setTo ] = useState('')
    let [ address , setAddress ] = useState('')
    let [ vehicle , setVehicle ] = useState('')
    let [ vehicles , setVehicles ] = useState([
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
        if ( from === '' || to === '' || address === '' )
        {
            setError("Invalid input")
            return false 
        }

        return true

    }

    const clearForm = () => {
        setFrom('')
        setRoute('')
        setAddress('')
        setTo('')
        setVehicle('')
    }


    const handleSubmit = async () => {

        if ( !validate() )
        return 

        const payload = { from , to , vehicle , address : address.label }
        
        try{
            const { data } = await axiosInstance.post("/shipment/create" , payload)
            clearForm()
            toast.success("Shipment created successfully")
        }   
        catch( err )
        {
            console.log(err)
        }

    }

    const handleSelectChange = ( handler , state ) => {
        handler(state)
    }

    const handleRouteSelectChange = ( state ) => {

        const [ from , to ] = state.split("-")

        setFrom(from)
        setTo(to)
        setRoute(from+"-"+to)
        
        const vehicle = vehicles.find( v => v.from === from && v.to === to)
        setVehicle(vehicle._id)
    } 

    useEffect(() => {
        ( async () => {
            try{
                let { data } = await axiosInstance.get('/vehicle/vehicles/filtered')
                setVehicles(data.data)

                const routes = [ ...new Set(data.data.map( vehicle => vehicle.from + "-" + vehicle.to ))] // generate unique routes
                setUniqueRoutes(routes)
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
            <InputLabel id="fromLabel">Route</InputLabel>
            <Select
                fullWidth
                labelId="routeLabel"
                id="route"
                value={route}
                label="From"
                onChange={(e)=>{
                    handleRouteSelectChange(e.target.value)
                }}
                >
                    {
                        uniqueRoutes.map( (route, ind) => <MenuItem key={ind} value={route}>{route}</MenuItem> )
                    }

            </Select>
        </FormControl>
        {
            uniqueRoutes.length === 0 ?
            <span style={{fontSize:'12px' , paddingTop : '10px'}}> (Create atleast one vehicle first)</span>
            :
            <></>
        }


        <Box style={{'position' : 'relative' , zIndex : '10' , marginTop : 20}} className="pt-4">
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
                    <InputLabel id="vehicle">Vehicle</InputLabel>
                    <Select
                    disabled
                    fullWidth
                    labelId="vehicle"
                    id="vehicle"
                    value={vehicle}
                    label="vehicle"

                    >
                    </Select>
                </>
                :
                <>
                    <InputLabel id="vehicle">Vehicle</InputLabel>
                    <Select
                    fullWidth
                    labelId="vehicle"
                    id="vehicle"
                    value={vehicle}
                    label="vehicle"
                    onChange={(e)=>handleSelectChange(setVehicle , e.target.value)}

                    >
                        {
                            vehicles.filter( v => ( v.from == from && v.to === to )).map( v =>  <MenuItem key={v._id} value={v._id}> {v.id} </MenuItem>)    
                        }
                    </Select>
                </>

            }
            <span style={{fontSize:'12px' , paddingTop : '10px'}}> (select route first)</span>
        </FormControl>


        <FormControl fullWidth>
            <p style={{'color':'red' , 'padding':'20px' , 'margin' : 'auto'}}>{error }</p>
            <CustomButton  onClick={()=>handleSubmit()}>Submit</CustomButton>
        </FormControl>
        <ToastContainer/>

    </CustomBox>
  )
}

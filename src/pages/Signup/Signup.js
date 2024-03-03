import  React , { useEffect , useState } from 'react';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useFormik } from 'formik';
import * as yup from 'yup';
//import axios from '../../axiosInstance.js';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../api/seller';
import axiosInstance from '../../axiosInstance';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControl , Select , RadioGroup ,Radio} from '@mui/material';

export default function Signup() {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const [ userType , setUserType ] = useState('admin')
  const [ isLoading , setIsLoading ] = React.useState(false)
  const [ isOperator , setIsOperator ] = React.useState(false)
  const [ drones , setdrones ] = React.useState([])
  const [ droneAssigned , setdroneAssigned ] = React.useState(false)

  const handleSubmit = async ( body ) => {

    setIsLoading(true)

    try{
      let payload = await signup(body)

      dispatch(login(payload))
      toast.success("Signed Up")
      
      if ( payload.userType === 'operator')
        nav("/operator")
      else if (  payload.userType === 'manager' )
        nav("/manager")
      else 
        nav("/")
      

    }
    catch(error)
    {
      console.log(error)
      toast.error(error.data.error)
    }

    setIsLoading(false)

  };

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),

    name: yup
    .string('Enter your Name')
    .min(3, 'Name should be of minimum 3 characters length')
    .required('Name is required'),

    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required('Password is required'),

      password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')

  });

  const formik = useFormik({
    initialValues: {
      email: 'wahabmaliq@gmail.com',
      password: 'Password123$',
      password_confirmation : 'Password123$' ,
      name : 'abdulwahab'
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      if ( !droneAssigned && userType === 'operator' ) return

      
      const payload = userType === 'operator' ? { ...values , userType , droneAssigned } : { ...values , userType }
      handleSubmit(payload)
      formik.resetForm()
    },
  });

  useEffect( () => {

    ( async () => {

      try{
        let {data} = await axiosInstance.get('/drone/drones/filtered') ;
        setdrones(data.data)
      }
      catch(err)
      {
        console.error(err)
      }

    })() ;

  } ,[] )


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                  value={formik.values.password_confirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                  helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                />
              </Grid>
              {
                userType === 'operator' ? 
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="droneLabel">drone Assigned</InputLabel>
                    <Select
                        fullWidth
                        labelId="droneLabel"
                        id="drone"
                        value={droneAssigned}
                        label="drone Assigned"
                        onChange={(e)=>setdroneAssigned(e.target.value)}
                        
                        >
                          {
                            drones.map( (drone , ind) => <MenuItem key={ind} value={drone._id}>{drone.id}</MenuItem> )
                          }

                    </Select>
                  </FormControl>
                  { userType === 'operator' && <p style={{'fontSize' : '12px' , color: 'red' , padding : '10px' , margin : 0}}>Select drone</p>}
                </Grid>
                :
                <></>
              }
            </Grid>

            <FormGroup >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel 
                value={'operator'}
                control={<Radio onChange={(e) => { if ( e.target.checked) setUserType('operator')  }}  />} label="Sign up as Operator" />
                <FormControlLabel 
                value={'manager'}
                control={<Radio onChange={(e) => { if ( e.target.checked) setUserType('manager')  }} />} label="Sign up as Manager" />
              </RadioGroup>
            </FormGroup>

            <CustomButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Sign Up
            </CustomButton>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
  );
}
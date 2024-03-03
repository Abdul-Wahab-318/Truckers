import React from 'react'
import CustomButton from '../../Components/CustomButton/CustomButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
//import axios from 'axiosInstance';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link , useNavigate } from 'react-router-dom';
import { signin } from '../../api/seller';

export default function Signin() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ isLoading , setIsLoading ] = React.useState(false)
  
    const handleSubmit = async ( body ) => {

      setIsLoading(true)

      try{

        let payload = await signin(body)

        dispatch(login(payload))
        toast.success("Signed In")
        
        if ( payload.userType === "admin" )
          navigate('/')
        else if ( payload.userType === "operator" )
          navigate('/operator')
        else 
          navigate('manager')
        
      }
      catch(errorMessage)
      {
        console.error(errorMessage)
        toast.error(errorMessage)
      }
  
      setIsLoading(false)

    };
  
    const validationSchema = yup.object({
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
  
      password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
    });
  
    const formik = useFormik({
      initialValues: {
        email: 'wahabmaliq@gmail.com',
        password: 'Password123$',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        handleSubmit(values)
        formik.resetForm()
      },
    });

  
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
              Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
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
              </Grid>
              <CustomButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Sign In
              </CustomButton>
              
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/signup"} variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ToastContainer />
        </Container>
    );
}

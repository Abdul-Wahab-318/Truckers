import * as React from 'react';
import { Outlet , Link , useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar } from '@mui/material';
import { logout } from '../../api/seller';
import { logout as logoutRedux } from '../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import store from '../../redux/store/store';
import { socket } from '../../socket';
import { useEffect } from 'react';

const drawerWidth = 350;
const adminlinks = [
  {
    label : 'Dashboard' ,
    path : '/'
  } ,
  {
    label : 'Create Shipment' ,
    path : '/create-shipment'
  } ,
  {
    label : 'Create Vehicle' ,
    path : '/create-vehicle'
  }
  
]

const driverlinks = [
  {
    label : 'Dashboard' ,
    path : '/driver'
  } ,
  {
    label : 'View Route' ,
    path : '/driver/driver-route'
  } ,
]



export default function UserDashboardLayout() {
  
  const user = store.getState().user.value
  const addAdminToRoom = () => {
    if (user.userType === "admin") {
      socket.emit("identify", user.userType, user._id);
      console.log("emitting room join event");
    }
  }
  
  const [ openSideBar , setOpenSideBar ] = React.useState(false)

  useEffect( () => {
    addAdminToRoom()
  } ,[] )

  const toggleDrawer = () => {
    setOpenSideBar( state => !state )
  }


  return (
    <Box sx={{ display: 'flex' }} >
      
      <CssBaseline />
      <>
        {/* SIDE BAR FOR SCREENS >= LG */}
        <Drawer
          sx={{
            display: { xs : 'none' , lg : 'flex'} ,
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <DrawerItems />
        </Drawer>

        {/* APP BAR FOR SMALLER SCREENS */}
        <AppBar position="absolute" sx={{ display : { xs : 'block' , lg : 'none' , boxShadow : 'none'} }}>
          <Stack direction={'row'} sx={{ justifyContent : 'space-between' , alignItems: 'center' , py: 2 , px :'44px' }}>
              <Typography variant='h5' fontWeight={'bold'} >
                Truckers
              </Typography>
            <Button color="inherit" onClick={toggleDrawer} sx={{justifyContent:'end'}}><HiOutlineMenuAlt3 fontSize={'28px'}/></Button>
          </Stack>
        </AppBar>

        {/* SIDE BAR FOR SMALLER SCREENS */}
        <Drawer
            anchor={'left'}
            open={openSideBar}
            onClose={toggleDrawer}
            
          >
            <Box sx={{minWidth : '300px'}}>
              <DrawerItems toggleDrawer={toggleDrawer} />
            </Box>
        </Drawer>

      </>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 5.5 }}
      >
        <Toolbar /> 
        <Outlet/>
      </Box>
    </Box>
  );
}

const DrawerItems = ({ toggleDrawer = () => {} }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const userType = store.getState().user.value.userType
  const links = userType === 'admin' ? adminlinks : driverlinks
  const activeLinkStyle = {
    bgcolor : 'rgba(0, 0, 0, 0.04)'
  }

  const handleLogout = async () => {

    try{

      let data  = await logout()
      dispatch(logoutRedux())
      navigate("/signin")
      
    }
    catch(error)
    {
      console.error(error)
    }

  }

  return (
    <>
      <h1 style={{'textAlign':'center' , 'marginBlock' : '40px'}}>Truckers</h1>

      <List sx={{paddingX : '40px'}}>
        {links.map((link, index) => (
          
            <ListItem key={link.path} disablePadding sx={{borderRadius:'10px' , mb:2 }} onClick={toggleDrawer}>
              <Link to={link.path} style={{'width' : '100%' , color : 'black' , textDecoration : 'none'}}>
                {
                  pathname === link.path ? 
                  <ListItemButton sx={{ borderRadius:"10px" , py : 1.5 , ...activeLinkStyle }}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                  :
                  <ListItemButton sx={{ borderRadius:"10px" , py : 1.5 }}>
                    <ListItemText primary={link.label} />
                  </ListItemButton>
                }
              </Link>
            </ListItem>
          

        ))}
      </List>
      <Box  sx={{borderRadius:'10px' , mb:4 , paddingX : '40px' , mt : 'auto'}} onClick={handleLogout}>
        <Typography variant='p' style={{'width' : '100%' , color : 'black' , textDecoration : 'none'}}>
          <ListItemButton sx={{ borderRadius:"10px" , py : 1.5 , ...activeLinkStyle}}>
            <ListItemText primary={'Log Out'} />
            <LogoutIcon/>
          </ListItemButton>
        </Typography>
      </Box>
    </>
  )
}
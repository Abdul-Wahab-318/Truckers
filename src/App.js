import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SellerDashboardLayout from "./layouts/SellerDashboardLayout/SellerDashboardLayout"
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import store from "./redux/store/store";
import { useNavigate } from "react-router-dom";
import RouteProtection from "./Components/RouteProtection/RouteProtection";
import CreateShipment from "./pages/CreateShipment/CreateShipment";
import ApproveShipment from "./pages/ApproveShipment/ApproveShipment";
import ShipmentMap from "./pages/ShipmentMap/ShipmentMap";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000" ,
    } ,
    secondary : {
      main: "#3321FF"
    } ,
    light : {
      main : "#8E8E8E" ,
      dark : "#D9D9D9"
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>

      <Router>
        <Routes>

          <Route path="/" element={ <SellerDashboardLayout/> }>
            <Route element={<RouteProtection/>}>
              <Route index element={ <SellerDashboard/> } />
              <Route exact path="create-shipment" element={<CreateShipment/>} />
              <Route exact path="approve-shipment" element={<ApproveShipment/>} />
              <Route exact path="Shipment-map/:id" element={<ShipmentMap/>} />

            </Route>
          </Route>

          <Route exact path="/signup" element={<Signup/>} />

          <Route exact path="/signin" element={<Signin/>} />

        </Routes>
      </Router>

    </ThemeProvider>
  );
}

//temporarily use this as menu for navigation
const Demo = () => {
  return(
    <>

      <Link to={'/seller-dashboard'}>go to route localhost:3000:/seller-dashboard</Link> <br /><br /><br />
      <Link to={'/signup'}>Sign up</Link>
      <br /> <br /> <br />
      <Link to={'/signin'}>Sign in</Link>
    </>
  )
}

export default App;

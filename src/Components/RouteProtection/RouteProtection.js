import React from 'react'
import { useNavigate, Outlet, useLocation , Navigate } from 'react-router-dom'

export default function RouteProtection() {

    const nav = useNavigate()
    const location = useLocation()
    let token = localStorage.getItem('token')
    
    /*if ( token )
        return <Outlet/> // if authenticated , show child routes
    else
        return <Navigate to="/signin" state={{ from : location }} replace />
*/
return <Outlet/>
}

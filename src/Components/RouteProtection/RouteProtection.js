import React from 'react'
import {Outlet, useLocation , Navigate } from 'react-router-dom'

export default function RouteProtection({ allowedRoles }) {

    const location = useLocation()
    let token = localStorage.getItem('token')
    return <Outlet/>
    if ( token )
        return <Outlet/> // if authenticated , show child routes
    else
        return <Navigate to="/signin" state={{ from : location }} replace />

}

import React from 'react'
import {Outlet, useLocation , Navigate } from 'react-router-dom'
import store from '../../redux/store/store'

export default function RouteProtection({ allowedRoles }) {

    const location = useLocation()
    const isLoggedIn = store.getState().user.value.isLoggedIn

    if ( isLoggedIn )
        return <Outlet/> // if authenticated , show child routes
    else
        return <Navigate to="/signin" state={{ from : location }} replace />

}

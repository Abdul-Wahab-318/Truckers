import React , {useEffect, useRef, useState} from 'react'
import { GoogleMap, useJsApiLoader , Marker , DirectionsRenderer } from '@react-google-maps/api';
import axiosInstance from '../../axiosInstance';
import {store} from '../../redux/store/store';
import pin from '../../images/pin.png';

const containerStyle = {
  width: '100%',
  minHeight: '70vh' ,
  height: '100%'
};

const center = {
  lat: 33.713672,
  lng: 73.025331
};

function DriverRoute() {

  const vehicleID = store.getState().persistedReducer.value.vehicleAssigned
  const [ waypoints, setWaypoints ] = useState([])
  const [ vehicle , setVehicle ] = useState({})
  const [wayPointsloaded , setWayPointsLoaded] = useState(false)
  const [vehicleLoaded , setVehicleLoaded] = useState(false)
  const [ currentLocation , setCurrentLocation ] = useState(false)
  const [map, setMap] = React.useState(null)
  const [directionResponse , setDirectionResponse] = useState(null)

  const { isLoaded , google } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })

  const calculateRoute = async ( from , to , waypoints ) => {

    if (!window.google || !window.google.maps || !window.google.maps.DirectionsService) {
      console.error('google not loaded')
      return;
    }

    const directionService = new window.google.maps.DirectionsService()
    const results = await directionService.route({
      origin : currentLocation.lat ? currentLocation : from ,
      destination : to,
      waypoints : waypoints ,
      optimizeWaypoints: true,
      travelMode  : window.google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)

  }

  useEffect(() => {
    if (navigator.geolocation) {
      // The user has granted permission to access their location
      navigator.geolocation.getCurrentPosition(
          (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              setCurrentLocation({ lat : latitude, lng : longitude });
              console.log('Current location:', { latitude, longitude });
          },
          (error) => {
              console.error('Error getting location:', error.message);
          }
      );
  } else {
      // Geolocation is not supported by the browser
      console.error('Geolocation is not supported by your browser');
  }
  },[])

  //fetch shipments of vehicle and the vehicle
  useEffect(() => {
    ( async () => {

      try{

        const { data : shipmentData } = await axiosInstance.get("/vehicle/shipment-by-vehicle/" + vehicleID)
        const shipments = shipmentData.data

        const { data : vehicleData } = await axiosInstance.get("/vehicle/" + vehicleID)
        const vehicle = vehicleData.data


        const waypoints = shipments.map(shipment => ( {location : shipment.address , stopover : true } ) )
        setWaypoints(waypoints)
        setWayPointsLoaded(true)
        setVehicle(vehicle)
        setVehicleLoaded(true)
      }
      catch(err){
        console.error(err)
      }

    })() ;

  },[])


  //calculate route when google script is properly loaded
  useEffect( () => {
    if( vehicleLoaded && wayPointsloaded )
      calculateRoute( ( currentLocation ? currentLocation : vehicle.from ) , vehicle.to , waypoints )
  } , 
  [window.google , window.google?.maps , window.google?.maps?.DirectionsService , vehicleLoaded, wayPointsloaded , currentLocation])


  return (isLoaded )? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={map => {setMap(map) } }
      >
        <Marker position={currentLocation} icon={{ url: pin }}  />
        {directionResponse && <DirectionsRenderer directions={directionResponse} />}
      </GoogleMap>
    </>
  ) : <h3 style={{textAlign:'center'}}>Loading Map...</h3>
}

export default React.memo(DriverRoute)
import React , {useEffect, useRef, useState} from 'react'
import { GoogleMap, useJsApiLoader , Marker , DirectionsRenderer } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import store from '../../redux/store/store';
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

function DroneRoute() {

  const droneID = store.getState().user.value.droneAssigned
  const [ waypoints, setWaypoints ] = useState([])
  const [ drone , setdrone ] = useState({})
  const [wayPointsloaded , setWayPointsLoaded] = useState(false)
  const [droneLoaded , setdroneLoaded] = useState(false)
  const [ currentLocation , setCurrentLocation ] = useState(false)

  const { isLoaded , google } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY
  })
  const [map, setMap] = React.useState(null)
  const [directionResponse , setDirectionResponse] = useState(null)

  const calculateRoute = async ( from , to , waypoints ) => {

    if (!window.google || !window.google.maps || !window.google.maps.DirectionsService) {
      console.error('google not loaded')
      return;
    }

    const directionService = new window.google.maps.DirectionsService()
    const results = await directionService.route({
      origin : from ,
      destination : waypoints.length === 0 ? to : waypoints[ waypoints.length - 1 ]?.location,
      waypoints : waypoints ,
      optimizeWaypoints: true,
      travelMode  : window.google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)

  }

  //get current location
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
      console.error('Geolocation is not supported by your browser');
  }
  },[])

  //fetch shipments of drone
  useEffect(() => {
    ( async () => {

      try{
        const { data } = await axiosInstance.get("/drone/shipment-by-drone/" + droneID)
        const shipments = data.data
        const waypoints = shipments.map(shipment => ( {location : shipment.address , stopover : true } ) )
        setWaypoints(waypoints)
        setWayPointsLoaded(true)
      }
      catch(err){
        console.error(err)
      }

    })() ;

  },[])

  //fetch drone
  useEffect(() => {
    ( async () => {

      try{
        const { data } = await axiosInstance.get("/drone/" + droneID)
        const drone = data.data
        setdrone(drone)
        setdroneLoaded(true)

      }
      catch(err){
        console.error(err)
      }

    })() ;
  },[])

  //calculate route when google script is properly loaded
  useEffect( () => {
    if( droneLoaded && wayPointsloaded )
      calculateRoute( ( currentLocation ? currentLocation : drone.from ) , drone.to , waypoints )
  } , 
  [window.google , window.google?.maps , window.google?.maps?.DirectionsService , droneLoaded, wayPointsloaded])


  return (isLoaded )? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={map => {setMap(map) } }
      >
        <Marker position={currentLocation ? currentLocation : null} icon={{ url: pin }}  />
        {directionResponse && <DirectionsRenderer directions={directionResponse} />}
      </GoogleMap>
    </>
  ) : <h3 style={{textAlign:'center'}}>Loading Map...</h3>
}

export default React.memo(DroneRoute)
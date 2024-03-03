import React , {useEffect, useRef, useState} from 'react'
import { GoogleMap, useJsApiLoader , Marker , DirectionsRenderer } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const containerStyle = {
  width: '100%',
  minHeight: '70vh' ,
  height: '100%'
};

const center = {
  lat: 33.713672,
  lng: 73.025331
};

function DroneRouteMap() {

  const { id } = useParams()
  const [ drone , setdrone ] = useState({})
  const [ waypoints, setWaypoints ] = useState([])
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

  useEffect(() => {
    ( async () => {

      try{
        const { data } = await axiosInstance.get("/drone/shipment-by-drone/" + id)
        const shipments = data.data
        const waypoints = shipments.map(shipment => ( {location : shipment.address , stopover : true } ) )
        console.log(waypoints)
        setWaypoints(waypoints)
      }
      catch(err){
        console.error(err)
      }

    })() ;

    ( async () => {

      try{
        const { data } = await axiosInstance.get("/drone/" + id)
        const drone = data.data
        console.log(drone)
        setdrone(drone)
      }
      catch(err){
        console.error(err)
      }

    })() ;

  },[])

  //calculate route when google script is properly loaded
  useEffect( () => {

    if ( drone.from && drone.to )
      calculateRoute( drone.from , drone.to , waypoints )
    
  } , [window.google , window.google?.maps , window.google?.maps?.DirectionsService , waypoints])



  console.log(drone)


  return (isLoaded )? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={map => {setMap(map) } }
      >
        <Marker position={center} />
        {directionResponse && <DirectionsRenderer directions={directionResponse} />}
      </GoogleMap>
    </>
  ) : <h3 style={{textAlign:'center'}}>Loading Map...</h3>
}

export default DroneRouteMap
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

function VehicleRoute() {

  const { id } = useParams()
  const [ vehicle , setVehicle ] = useState({})
  const [ waypoints, setWaypoints ] = useState([])
  const { isLoaded , google } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'apikey'
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
        const { data } = await axiosInstance.get("/vehicle/shipment-by-vehicle/" + id)
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
        const { data } = await axiosInstance.get("/vehicle/" + id)
        const vehicle = data.data
        console.log(vehicle)
        setVehicle(vehicle)
      }
      catch(err){
        console.error(err)
      }

    })() ;

  },[])

  //calculate route when google script is properly loaded
  useEffect( () => {
    calculateRoute( vehicle.from , vehicle.to , waypoints )
  } , [window.google , window.google?.maps , window.google?.maps?.DirectionsService , waypoints])



  console.log(vehicle)


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

export default React.memo(VehicleRoute)
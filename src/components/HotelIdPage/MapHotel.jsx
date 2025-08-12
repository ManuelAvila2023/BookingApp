import { Map, Marker } from "pigeon-maps"

const MapHotel = ({lat, lon}) => {
  return (
    <Map center={[+lat, +lon]} width={500} height={300}>
     <Marker
       width={35}
       anchor={[+lat, +lon]}
       color="#fa4040"
     />
    </Map>
  )
}

export default MapHotel

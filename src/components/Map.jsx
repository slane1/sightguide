import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ geolocation }) {
  const icon = L.icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  // console.log("geo from map",geolocation[0].lat);
  
  return (
        geolocation && (
      <div className="flex justify-center w-full">
        <MapContainer
          center={[geolocation[0].lat, geolocation[0].lon]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "50vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[geolocation[0].lat, geolocation[0].lon]} icon={icon}>
            <Popup>
              <p>{geolocation[0].lat}</p>
              <p>{geolocation[0].lon}</p>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  );
}

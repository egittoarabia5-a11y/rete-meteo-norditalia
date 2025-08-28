import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  const [dataType, setDataType] = useState("current"); // per il menu a tendina

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataType(e.target.value);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* Menu a tendina */}
      <div style={{
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "white",
        padding: "8px 12px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
      }}>
        <label><b>Dati:</b></label>
        <select value={dataType} onChange={handleChange}>
          <option value="current">Temperatura</option>
          <option value="max">T Max</option>
          <option value="min">T Min</option>
          <option value="hum">Umidità</option>
          <option value="rainDay">Pioggia 24h</option>
          <option value="wind">Vento</option>
          {/* aggiungi gli altri valori se vuoi */}
        </select>
      </div>

      {/* Mappa */}
      <MapContainer center={[44.423, 8.972]} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution="&copy; OpenStreetMap contributors" />
        {/* Qui aggiungi i marker in base ai tuoi dati */}
        {/* <Marker position={[lat, lng]}>
            <Popup>{nome_stazione}</Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MapComponent from "./MapComponent"; // mappa Leaflet
import TablePage from "./TablePage";       // tabella aggiornabile

export default function App() {
  return (
    <Router>
      {/* Pulsante in alto a destra per andare alla tabella */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 9999 }}>
        <Link to="/tabella">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            Vai alla tabella
          </button>
        </Link>
      </div>

      {/* Router con due rotte: mappa e tabella */}
      <Routes>
        <Route path="/" element={<MapComponent />} />
        <Route path="/tabella" element={<TablePage />} />
      </Routes>
    </Router>
  );
}

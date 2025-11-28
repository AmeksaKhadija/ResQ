import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Filter } from "lucide-react";
import type { Ambulance, Incident } from "../types";
import "leaflet/dist/leaflet.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DispatchMap = () => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ambulancesRes, incidentsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/ambulances`),
          fetch(
            `${
              import.meta.env.VITE_API_URL
            }/incidents?status_ne=COMPLETED&status_ne=CANCELLED`
          ),
        ]);

        const ambulancesData = await ambulancesRes.json();
        const incidentsData = await incidentsRes.json();

        setAmbulances(ambulancesData);
        setIncidents(incidentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const filteredAmbulances =
    selectedFilter === "ALL"
      ? ambulances
      : ambulances.filter((amb) => amb.status === selectedFilter);

  const createAmbulanceIcon = (status: string) => {
    const color =
      status === "AVAILABLE"
        ? "green"
        : status === "BUSY"
        ? "red"
        : status === "BREAK"
        ? "blue"
        : "orange";
    return L.divIcon({
      className: "custom-icon",
      html: `
        <div style="
          background-color: ${color};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M8 6h13v2h-13v-2zm0 4h13v2h-13v-2zm13 4h-13v2h13v-2zm-15-8l-3 3h2v8h2v-8h2l-3-3z"/>
          </svg>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  const createIncidentIcon = (severity: string) => {
    const color =
      severity === "CRITICAL"
        ? "#dc2626"
        : severity === "HIGH"
        ? "#ea580c"
        : severity === "MEDIUM"
        ? "#f59e0b"
        : "#22c55e";
    return L.divIcon({
      className: "custom-icon",
      html: `
        <div style="
          background-color: ${color};
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
      `,
      iconSize: [35, 35],
      iconAnchor: [17.5, 17.5],
    });
  };

  const assignAmbulance = async (incidentId: string, ambulanceId: string) => {
    try {
      await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/incidents/${incidentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignedAmbulanceId: ambulanceId,
            status: "IN_PROGRESS",
            updatedAt: new Date().toISOString(),
          }),
        }),
        fetch(`${import.meta.env.VITE_API_URL}/ambulances/${ambulanceId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "BUSY",
            lastUpdate: new Date().toISOString(),
          }),
        }),
      ]);

      // Refresh data
      const [ambulancesRes, incidentsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/ambulances`),
        fetch(
          `${
            import.meta.env.VITE_API_URL
          }/incidents?status_ne=COMPLETED&status_ne=CANCELLED`
        ),
      ]);

      setAmbulances(await ambulancesRes.json());
      setIncidents(await incidentsRes.json());
    } catch (error) {
      console.error("Error assigning ambulance:", error);
    }
  };

  const getSeverityLabel = (severity: string) => {
    const labels = {
      LOW: "Faible",
      MEDIUM: "Moyenne",
      HIGH: "Élevée",
      CRITICAL: "Critique",
    };
    return labels[severity as keyof typeof labels] || severity;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Carte de Dispatch
          </h1>
          <p className="text-gray-600 mt-1">
            Visualisez et gérez les interventions en temps réel
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedFilter("ALL")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedFilter === "ALL"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setSelectedFilter("AVAILABLE")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedFilter === "AVAILABLE"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setSelectedFilter("BUSY")}
              className={`px-4 py-2 rounded-lg transition ${
                selectedFilter === "BUSY"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Occupées
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        style={{ height: "600px" }}
      >
        <MapContainer
          center={[33.5731, -7.5898]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Ambulance Markers */}
          {filteredAmbulances.map((ambulance) => (
            <Marker
              key={ambulance.id}
              position={[ambulance.latitude, ambulance.longitude]}
              icon={createAmbulanceIcon(ambulance.status)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{ambulance.callSign}</h3>
                  <p className="text-sm text-gray-600">
                    Statut:{" "}
                    <span
                      className={
                        ambulance.status === "AVAILABLE"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {ambulance.status === "AVAILABLE"
                        ? "Disponible"
                        : ambulance.status === "BUSY"
                        ? "Occupée"
                        : ambulance.status === "BREAK"
                        ? "Pause"
                        : "Maintenance"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Équipage: {ambulance.crew.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Incident Markers */}
          {incidents.map((incident) => (
            <Marker
              key={incident.id}
              position={[incident.latitude, incident.longitude]}
              icon={createIncidentIcon(incident.severity)}
            >
              <Popup>
                <div className="p-2 min-w-[250px]">
                  <h3 className="font-bold text-lg mb-2">
                    {incident.patientName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>Gravité:</strong>{" "}
                    <span
                      className={
                        incident.severity === "CRITICAL"
                          ? "text-red-600"
                          : incident.severity === "HIGH"
                          ? "text-orange-600"
                          : incident.severity === "MEDIUM"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    >
                      {getSeverityLabel(incident.severity)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {incident.description}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {incident.address}
                  </p>

                  {incident.status === "PENDING" && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-700">
                        Assigner une ambulance:
                      </p>
                      {ambulances
                        .filter((amb) => amb.status === "AVAILABLE")
                        .map((amb) => (
                          <button
                            key={amb.id}
                            onClick={() => assignAmbulance(incident.id, amb.id)}
                            className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                          >
                            {amb.callSign}
                          </button>
                        ))}
                      {ambulances.filter((amb) => amb.status === "AVAILABLE")
                        .length === 0 && (
                        <p className="text-xs text-gray-500">
                          Aucune ambulance disponible
                        </p>
                      )}
                    </div>
                  )}

                  {incident.assignedAmbulanceId && (
                    <p className="text-sm text-blue-600 font-semibold">
                      Assignée à:{" "}
                      {
                        ambulances.find(
                          (a) => a.id === incident.assignedAmbulanceId
                        )?.callSign
                      }
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default DispatchMap;

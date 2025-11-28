import { useEffect, useState } from "react";
import { Search, Calendar } from "lucide-react";
import type { Incident, Ambulance } from "../types";

const IncidentsHistory = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incidentsRes, ambulancesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/incidents`),
          fetch(`${import.meta.env.VITE_API_URL}/ambulances`),
        ]);

        const incidentsData = await incidentsRes.json();
        const ambulancesData = await ambulancesRes.json();

        setIncidents(
          incidentsData.sort(
            (a: Incident, b: Incident) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        setAmbulances(ambulancesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || incident.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    const colors = {
      LOW: "bg-green-100 text-green-800",
      MEDIUM: "bg-yellow-100 text-yellow-800",
      HIGH: "bg-orange-100 text-orange-800",
      CRITICAL: "bg-red-100 text-red-800",
    };
    return colors[severity as keyof typeof colors] || colors.LOW;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      IN_PROGRESS: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || colors.PENDING;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      PENDING: "En attente",
      IN_PROGRESS: "En cours",
      COMPLETED: "Terminé",
      CANCELLED: "Annulé",
    };
    return labels[status as keyof typeof labels] || status;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Historique des Incidents
        </h1>
        <p className="text-gray-600 mt-1">
          Consultez l'historique complet des interventions
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par patient ou adresse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="PENDING">En attente</option>
            <option value="IN_PROGRESS">En cours</option>
            <option value="COMPLETED">Terminé</option>
            <option value="CANCELLED">Annulé</option>
          </select>
        </div>
      </div>

      {/* Incidents List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {filteredIncidents.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Aucun incident trouvé</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date/Heure
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Adresse
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Gravité
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Ambulance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredIncidents.map((incident) => {
                  const assignedAmbulance = incident.assignedAmbulanceId
                    ? ambulances.find(
                        (amb) => amb.id === incident.assignedAmbulanceId
                      )
                    : null;

                  return (
                    <tr
                      key={incident.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>
                          <p className="font-medium">
                            {new Date(incident.createdAt).toLocaleDateString(
                              "fr-FR"
                            )}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(incident.createdAt).toLocaleTimeString(
                              "fr-FR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {incident.patientName}
                          </p>
                          {incident.patientAge && (
                            <p className="text-sm text-gray-500">
                              {incident.patientAge} ans
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        {incident.address}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                            incident.severity
                          )}`}
                        >
                          {getSeverityLabel(incident.severity)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            incident.status
                          )}`}
                        >
                          {getStatusLabel(incident.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {assignedAmbulance ? (
                          <span className="font-medium text-blue-600">
                            {assignedAmbulance.callSign}
                          </span>
                        ) : (
                          <span className="text-gray-400">Non assignée</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                        {incident.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Total Incidents</p>
          <p className="text-2xl font-bold text-gray-800">{incidents.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">En Cours</p>
          <p className="text-2xl font-bold text-blue-600">
            {incidents.filter((i) => i.status === "IN_PROGRESS").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">Terminés</p>
          <p className="text-2xl font-bold text-green-600">
            {incidents.filter((i) => i.status === "COMPLETED").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">En Attente</p>
          <p className="text-2xl font-bold text-yellow-600">
            {incidents.filter((i) => i.status === "PENDING").length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncidentsHistory;

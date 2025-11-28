import { useEffect, useState } from "react";
import { Ambulance, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import type { Ambulance as AmbulanceType, Incident } from "../types";

interface Stats {
  availableAmbulances: number;
  activeIncidents: number;
  averageResponseTime: number;
  completedToday: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    availableAmbulances: 0,
    activeIncidents: 0,
    averageResponseTime: 0,
    completedToday: 0,
  });
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ambulancesRes, incidentsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/ambulances`),
          fetch(`${import.meta.env.VITE_API_URL}/incidents`),
        ]);

        const ambulances: AmbulanceType[] = await ambulancesRes.json();
        const incidents: Incident[] = await incidentsRes.json();

        // Calculate stats
        const availableAmbulances = ambulances.filter(
          (a) => a.status === "AVAILABLE"
        ).length;
        const activeIncidents = incidents.filter(
          (i) => i.status === "PENDING" || i.status === "IN_PROGRESS"
        ).length;

        const today = new Date().toISOString().split("T")[0];
        const completedToday = incidents.filter(
          (i) => i.status === "COMPLETED" && i.completedAt?.startsWith(today)
        ).length;

        setStats({
          availableAmbulances,
          activeIncidents,
          averageResponseTime: 12, // Mock data
          completedToday,
        });

        // Get recent incidents
        const recent = incidents
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
        setRecentIncidents(recent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de l'activité ResQ</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Ambulances Disponibles
              </p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.availableAmbulances}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Ambulance className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Incidents Actifs
              </p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {stats.activeIncidents}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Temps Moyen de Réponse
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.averageResponseTime} min
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Complétés Aujourd'hui
              </p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.completedToday}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Activité Récente</h2>
        </div>
        <div className="p-6">
          {recentIncidents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun incident récent
            </p>
          ) : (
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                          incident.severity
                        )}`}
                      >
                        {incident.severity}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          incident.status
                        )}`}
                      >
                        {incident.status}
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800">
                      {incident.patientName}
                    </p>
                    <p className="text-sm text-gray-600">{incident.address}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {incident.description}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <p>
                      {new Date(incident.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                    <p>
                      {new Date(incident.createdAt).toLocaleTimeString(
                        "fr-FR",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

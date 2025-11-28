import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import type { Ambulance } from "../types";

const Fleet = () => {
  const [ambulances, setAmbulances] = useState<Ambulance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    callSign: "",
    status: "AVAILABLE",
    latitude: "",
    longitude: "",
    equipment: "",
    crew: "",
  });

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/ambulances`
        );
        const data = await response.json();
        setAmbulances(data);
      } catch (error) {
        console.error("Error fetching ambulances:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      AVAILABLE: "bg-green-100 text-green-800",
      BUSY: "bg-red-100 text-red-800",
      MAINTENANCE: "bg-yellow-100 text-yellow-800",
      BREAK: "bg-blue-100 text-blue-800",
    };
    return colors[status as keyof typeof colors] || colors.AVAILABLE;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      AVAILABLE: "Disponible",
      BUSY: "Occupée",
      MAINTENANCE: "Maintenance",
      BREAK: "Pause",
    };
    return labels[status as keyof typeof labels] || status;
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/ambulances/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          lastUpdate: new Date().toISOString(),
        }),
      });

      setAmbulances(
        ambulances.map((amb) =>
          amb.id === id
            ? {
                ...amb,
                status: newStatus as any,
                lastUpdate: new Date().toISOString(),
              }
            : amb
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddAmbulance = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newAmbulance = {
        id: `amb-${Date.now()}`,
        callSign: formData.callSign,
        status: formData.status,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        equipment: formData.equipment
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        crew: formData.crew
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        lastUpdate: new Date().toISOString(),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ambulances`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAmbulance),
        }
      );

      if (response.ok) {
        const addedAmbulance = await response.json();
        setAmbulances([...ambulances, addedAmbulance]);
        setShowAddModal(false);
        setFormData({
          callSign: "",
          status: "AVAILABLE",
          latitude: "",
          longitude: "",
          equipment: "",
          crew: "",
        });
      }
    } catch (error) {
      console.error("Error adding ambulance:", error);
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Gestion de la Flotte
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez vos ambulances et leur statut
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Ajouter une ambulance
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Indicatif
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Statut
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Équipage
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Équipement
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Dernière MAJ
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ambulances.map((ambulance) => (
                <tr key={ambulance.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">
                      {ambulance.callSign}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        ambulance.status
                      )}`}
                    >
                      {getStatusLabel(ambulance.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ambulance.crew.length > 0 ? (
                      <div className="text-sm text-gray-600">
                        {ambulance.crew.join(", ")}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Aucun</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {ambulance.equipment.slice(0, 2).map((eq, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {eq}
                        </span>
                      ))}
                      {ambulance.equipment.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{ambulance.equipment.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(ambulance.lastUpdate).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={ambulance.status}
                      onChange={(e) =>
                        updateStatus(ambulance.id, e.target.value)
                      }
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="AVAILABLE">Disponible</option>
                      <option value="BUSY">Occupée</option>
                      <option value="BREAK">Pause</option>
                      <option value="MAINTENANCE">Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal d'ajout d'ambulance */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header du modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Ajouter une Ambulance
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleAddAmbulance} className="p-6 space-y-4">
              {/* Indicatif */}
              <div>
                <label
                  htmlFor="callSign"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Indicatif <span className="text-red-500">*</span>
                </label>
                <input
                  id="callSign"
                  type="text"
                  required
                  value={formData.callSign}
                  onChange={(e) =>
                    setFormData({ ...formData, callSign: e.target.value })
                  }
                  placeholder="Ex: AMB-06"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Statut */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Statut <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="AVAILABLE">Disponible</option>
                  <option value="BUSY">Occupée</option>
                  <option value="BREAK">Pause</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>

              {/* Position GPS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="latitude"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="latitude"
                    type="number"
                    step="any"
                    required
                    value={formData.latitude}
                    onChange={(e) =>
                      setFormData({ ...formData, latitude: e.target.value })
                    }
                    placeholder="Ex: 33.5731"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="longitude"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="longitude"
                    type="number"
                    step="any"
                    required
                    value={formData.longitude}
                    onChange={(e) =>
                      setFormData({ ...formData, longitude: e.target.value })
                    }
                    placeholder="Ex: -7.5898"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Équipement */}
              <div>
                <label
                  htmlFor="equipment"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Équipement
                </label>
                <input
                  id="equipment"
                  type="text"
                  value={formData.equipment}
                  onChange={(e) =>
                    setFormData({ ...formData, equipment: e.target.value })
                  }
                  placeholder="Ex: Défibrillateur, Brancard, Oxygène (séparés par des virgules)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Séparez les éléments par des virgules
                </p>
              </div>

              {/* Équipage */}
              <div>
                <label
                  htmlFor="crew"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Équipage
                </label>
                <input
                  id="crew"
                  type="text"
                  value={formData.crew}
                  onChange={(e) =>
                    setFormData({ ...formData, crew: e.target.value })
                  }
                  placeholder="Ex: Dr. Alami, Inf. Benali (séparés par des virgules)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Séparez les membres par des virgules
                </p>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Ajouter l'ambulance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fleet;

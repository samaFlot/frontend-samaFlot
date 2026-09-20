import { useState } from "react";

import AgentPageHeader from "../../components/transporteur/Agents/AgentPageHeader";
import AgentFilters from "../../components/transporteur/Agents/AgentFilters";
import AgentsTable from "../../components/transporteur/Agents/AgentsTable";
import CreateAgentDrawer from "../../components/transporteur/Agents/CreateAgentDrawer";

import { useAgents } from "../../hooks/useAgents";
import { usePagination } from "../../hooks/usePagination";

export default function AgentsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("Tous les statuts");

  const {
    agents,
    loading,
    error,
    ajouterAgent,
    mettreAJourAgent,
    retirerAgent,
  } = useAgents();

  // Ouvrir le drawer pour ajouter
  const handleAdd = () => {
    setSelectedAgent(null);
    setIsDrawerOpen(true);
  };

  // Ouvrir le drawer pour modifier
  const handleEdit = (agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  // Ajouter un agent
  const handleAddAgent = async (donnees) => {
    const nouvelAgent = await ajouterAgent(donnees);

    if (nouvelAgent) {
      setIsDrawerOpen(false);
      setSelectedAgent(null);
    }
  };

  // Modifier un agent
  const handleUpdateAgent = async (id, donnees) => {
    const agentModifie = await mettreAJourAgent(id, donnees);

    if (agentModifie) {
      setIsDrawerOpen(false);
      setSelectedAgent(null);
    }
  };

  // Supprimer un agent
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cet agent ?"
    );

    if (!confirmation) {
      return;
    }

    await retirerAgent(id);
  };

  // Filtrer les agents
  const filteredAgents = agents.filter((agent) => {
    const searchLower = search.toLowerCase();

    const matchesSearch =
      agent.nom?.toLowerCase().includes(searchLower) ||
      agent.prenom?.toLowerCase().includes(searchLower) ||
      agent.email?.toLowerCase().includes(searchLower) ||
      agent.telephone?.toLowerCase().includes(searchLower);

    const matchesAvailability =
      availability === "Tous les statuts" ||
      (availability === "Disponible" && agent.disponible === true) ||
      (availability === "Indisponible" && agent.disponible === false);

    return matchesSearch && matchesAvailability;
  });

    // Pagination : 8 agents par page, retour à la page 1
  // quand la recherche ou le statut change
  const pagination = usePagination(
    filteredAgents,
    8,
    `${search}|${availability}`
  );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <AgentPageHeader onAddClick={handleAdd} />

      <div className="flex w-full flex-col gap-6 p-6 sm:p-8">
        <AgentFilters
          search={search}
          setSearch={setSearch}
          availability={availability}
          setAvailability={setAvailability}
        />

        {loading && (
          <p className="text-sm text-slate-500">
            Chargement des agents...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <AgentsTable
          agents={pagination.pageItems}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <CreateAgentDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedAgent(null);
        }}
        agent={selectedAgent}
        onAdd={handleAddAgent}
        onUpdate={handleUpdateAgent}
      />
    </div>
  );
}
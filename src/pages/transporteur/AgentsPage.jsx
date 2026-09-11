import { useState } from "react";
import AgentPageHeader from "../../components/transporteur/Agents/AgentPageHeader";
import AgentFilters from "../../components/transporteur/Agents/AgentFilters";
import AgentsTable from "../../components/transporteur/Agents/AgentsTable";
import Pagination from "../../components/transporteur/Agents/Pagination";
import CreateAgentDrawer from "../../components/transporteur/Agents/CreateAgentDrawer";

export default function AgentsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <AgentPageHeader
        onAddClick={() => setIsDrawerOpen(true)}
      />

      <div className="flex w-full flex-col gap-6 p-6 sm:p-8">
        <AgentFilters />
        <AgentsTable />
        <Pagination />
      </div>

      <CreateAgentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
import React, { useState } from "react";
import {
    Plus,
    Search,
    Mail,
    Phone,
    Building,
    MoreVertical,
} from "lucide-react";
import { useStore } from "../../Store/userstore";
import { format } from "date-fns";

const ClientsList: React.FC = () => {
    const { clients } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "active" | "inactive"
    >("all");

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ??
                false);

        const matchesStatus =
            statusFilter === "all" || client.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            {/* Header */}
            <div>
                <div>
                    <h1>Clients</h1>
                    <p>Manage your client relationships</p>
                </div>
                <button>
                    <Plus />
                    Add Client
                </button>
            </div>

            {/* Search + Filters */}
            <div>
                <div>
                    <div>
                        <Search />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={() => setStatusFilter("all")}>
                            All ({clients.length})
                        </button>
                        <button onClick={() => setStatusFilter("active")}>
                            Active (
                            {clients.filter((c) => c.status === "active").length})
                        </button>
                        <button onClick={() => setStatusFilter("inactive")}>
                            Inactive (
                            {clients.filter((c) => c.status === "inactive").length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Clients Grid */}
            <div>
                {filteredClients.map((client) => (
                    <div key={client.id}>
                        <div>
                            <div>
                                {client.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div>
                                <h3>{client.name}</h3>
                                <span>{client.status}</span>
                            </div>
                            <button>
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div>
                            {client.company && (
                                <div>
                                    <Building size={16} />
                                    <span>{client.company}</span>
                                </div>
                            )}
                            <div>
                                <Mail size={16} />
                                <span>{client.email}</span>
                            </div>
                            <div>
                                <Phone size={16} />
                                <span>{client.phone}</span>
                            </div>
                            <div>
                                Client since {format(client.createdAt, "MMM yyyy")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredClients.length === 0 && (
                <div>
                    <Building />
                    <h3>No clients found</h3>
                    <p>
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Get started by adding your first client"}
                    </p>
                    <button>
                        <Plus />
                        Add Client
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClientsList;

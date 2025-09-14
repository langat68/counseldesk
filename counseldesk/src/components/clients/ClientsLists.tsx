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
import "../../Styling/ClientList.scss";

const ClientsList = () => {
    const { clients } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredClients = clients.filter((client) => {
        const matchesSearch =
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        const matchesStatus =
            statusFilter === "all" || client.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="clients">
            {/* Header */}
            <header className="clients__header">
                <div className="clients__header-info">
                    <h1 className="clients__title">Clients</h1>
                    <p className="clients__subtitle">Manage your client relationships</p>
                </div>
                <button className="clients__add-btn">
                    <Plus />
                    Add Client
                </button>
            </header>

            {/* Search + Filters */}
            <div className="clients__controls">
                <div className="clients__search">
                    <Search className="clients__search-icon" />
                    <input
                        type="text"
                        className="clients__search-input"
                        placeholder="Search clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="clients__filters">
                    <button
                        className={`clients__filter ${statusFilter === "all" ? "is-active" : ""}`}
                        onClick={() => setStatusFilter("all")}
                    >
                        All ({clients.length})
                    </button>
                    <button
                        className={`clients__filter ${statusFilter === "active" ? "is-active" : ""}`}
                        onClick={() => setStatusFilter("active")}
                    >
                        Active ({clients.filter((c) => c.status === "active").length})
                    </button>
                    <button
                        className={`clients__filter ${statusFilter === "inactive" ? "is-active" : ""}`}
                        onClick={() => setStatusFilter("inactive")}
                    >
                        Inactive ({clients.filter((c) => c.status === "inactive").length})
                    </button>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="clients__grid">
                {filteredClients.map((client) => (
                    <div key={client.id} className="client-card">
                        <div className="client-card__header">
                            <div className="client-card__avatar">
                                {client.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div className="client-card__info">
                                <h3 className="client-card__name">{client.name}</h3>
                                <span className={`client-card__status client-card__status--${client.status}`}>
                                    {client.status}
                                </span>
                            </div>
                            <button className="client-card__menu">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="client-card__details">
                            {client.company && (
                                <div className="client-card__detail">
                                    <Building size={16} className="client-card__icon" />
                                    <span>{client.company}</span>
                                </div>
                            )}
                            <div className="client-card__detail">
                                <Mail size={16} className="client-card__icon" />
                                <span>{client.email}</span>
                            </div>
                            <div className="client-card__detail">
                                <Phone size={16} className="client-card__icon" />
                                <span>{client.phone}</span>
                            </div>
                            <div className="client-card__since">
                                Client since {format(client.createdAt, "MMM yyyy")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredClients.length === 0 && (
                <div className="clients__empty">
                    <Building className="clients__empty-icon" />
                    <h3 className="clients__empty-title">No clients found</h3>
                    <p className="clients__empty-text">
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Get started by adding your first client"}
                    </p>
                    <button className="clients__empty-btn">
                        <Plus />
                        Add Client
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClientsList;

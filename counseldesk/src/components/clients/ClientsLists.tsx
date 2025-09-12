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
import "../../Styling/CasesList.scss";

const ClientsList = () => {
    const { clients } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

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
        <div className="clients-list">
            {/* Header */}
            <div className="clients-header">
                <div className="header-content">
                    <h1 className="header-title">Clients</h1>
                    <p className="header-description">Manage your client relationships</p>
                </div>
                <button className="add-client-btn">
                    <Plus />
                    Add Client
                </button>
            </div>

            {/* Search + Filters */}
            <div className="clients-controls">
                <div className="controls-container">
                    <div className="search-box">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search clients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="status-filters">
                        <button
                            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
                            onClick={() => setStatusFilter("all")}
                        >
                            All ({clients.length})
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === "active" ? "active" : ""}`}
                            onClick={() => setStatusFilter("active")}
                        >
                            Active (
                            {clients.filter((c) => c.status === "active").length})
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === "inactive" ? "active" : ""}`}
                            onClick={() => setStatusFilter("inactive")}
                        >
                            Inactive (
                            {clients.filter((c) => c.status === "inactive").length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="clients-grid">
                {filteredClients.map((client) => (
                    <div key={client.id} className="client-card">
                        <div className="client-header">
                            <div className="client-avatar">
                                {client.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div className="client-info">
                                <h3 className="client-name">{client.name}</h3>
                                <span className={`client-status status-${client.status}`}>
                                    {client.status}
                                </span>
                            </div>
                            <button className="client-menu-btn">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="client-details">
                            {client.company && (
                                <div className="detail-item">
                                    <Building size={16} className="detail-icon" />
                                    <span className="detail-text">{client.company}</span>
                                </div>
                            )}
                            <div className="detail-item">
                                <Mail size={16} className="detail-icon" />
                                <span className="detail-text">{client.email}</span>
                            </div>
                            <div className="detail-item">
                                <Phone size={16} className="detail-icon" />
                                <span className="detail-text">{client.phone}</span>
                            </div>
                            <div className="client-since">
                                Client since {format(client.createdAt, "MMM yyyy")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredClients.length === 0 && (
                <div className="empty-state">
                    <Building className="empty-icon" />
                    <h3 className="empty-title">No clients found</h3>
                    <p className="empty-description">
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Get started by adding your first client"}
                    </p>
                    <button className="empty-add-btn">
                        <Plus />
                        Add Client
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClientsList;
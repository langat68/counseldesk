import React, { useState } from "react";
import {
    Plus,
    Search,
    Mail,
    Phone,
    Building,
    MoreVertical,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import styles from "./ClientsList.module.scss";

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

        const matchesStatus = statusFilter === "all" || client.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Clients</h1>
                    <p className={styles.subtitle}>Manage your client relationships</p>
                </div>
                <button className={styles.primaryBtn}>
                    <Plus className={styles.icon} />
                    Add Client
                </button>
            </div>

            {/* Search + Filters */}
            <div className={styles.card}>
                <div className={styles.filters}>
                    <div className={styles.searchWrapper}>
                        <Search className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.filterBtns}>
                        <button
                            className={`${styles.filterBtn} ${statusFilter === "all" ? styles.active : ""
                                }`}
                            onClick={() => setStatusFilter("all")}
                        >
                            All ({clients.length})
                        </button>
                        <button
                            className={`${styles.filterBtn} ${statusFilter === "active" ? styles.active : ""
                                }`}
                            onClick={() => setStatusFilter("active")}
                        >
                            Active ({clients.filter((c) => c.status === "active").length})
                        </button>
                        <button
                            className={`${styles.filterBtn} ${statusFilter === "inactive" ? styles.active : ""
                                }`}
                            onClick={() => setStatusFilter("inactive")}
                        >
                            Inactive ({clients.filter((c) => c.status === "inactive").length})
                        </button>
                    </div>
                </div>
            </div>

            {/* Clients Grid */}
            <div className={styles.grid}>
                {filteredClients.map((client) => (
                    <div key={client.id} className={styles.clientCard}>
                        <div className={styles.cardHeader}>
                            <div className={styles.avatar}>
                                {client.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div className={styles.clientInfo}>
                                <h3 className={styles.clientName}>{client.name}</h3>
                                <span
                                    className={`${styles.status} ${client.status === "active" ? styles.active : styles.inactive
                                        }`}
                                >
                                    {client.status}
                                </span>
                            </div>
                            <button className={styles.moreBtn}>
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className={styles.cardContent}>
                            {client.company && (
                                <div className={styles.detailRow}>
                                    <Building size={16} />
                                    <span>{client.company}</span>
                                </div>
                            )}
                            <div className={styles.detailRow}>
                                <Mail size={16} />
                                <span>{client.email}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <Phone size={16} />
                                <span>{client.phone}</span>
                            </div>
                            <div className={styles.meta}>
                                Client since {format(client.createdAt, "MMM yyyy")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty state */}
            {filteredClients.length === 0 && (
                <div className={styles.emptyCard}>
                    <Building className={styles.emptyIcon} />
                    <h3>No clients found</h3>
                    <p>
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Get started by adding your first client"}
                    </p>
                    <button className={styles.primaryBtn}>
                        <Plus className={styles.icon} />
                        Add Client
                    </button>
                </div>
            )}
        </div>
    );
};

export default ClientsList;

import React, { useState } from "react";
import {
    Plus,
    Search,
    Scale,
    Clock,
    User,
    MoreVertical,
    AlertTriangle,
    CheckCircle,
    Hourglass,
    Eye,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import styles from "./CasesList.module.scss";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const variants: Record<
        string,
        { className: string; text: string; icon: React.ElementType }
    > = {
        open: { className: styles.statusOpen, text: "Open", icon: Scale },
        closed: { className: styles.statusClosed, text: "Closed", icon: CheckCircle },
        pending: { className: styles.statusPending, text: "Pending", icon: Clock },
        "in-review": { className: styles.statusReview, text: "In Review", icon: Eye },
    };

    const variant = variants[status] || variants.open;
    const Icon = variant.icon;

    return (
        <span className={`${styles.badge} ${variant.className}`}>
            <Icon size={14} className={styles.icon} />
            {variant.text}
        </span>
    );
};

interface PriorityBadgeProps {
    priority: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
    const variants: Record<string, string> = {
        low: styles.priorityLow,
        medium: styles.priorityMedium,
        high: styles.priorityHigh,
        urgent: styles.priorityUrgent,
    };

    return (
        <span className={`${styles.badge} ${variants[priority]}`}>
            {priority.toUpperCase()}
        </span>
    );
};

const CasesList: React.FC = () => {
    const { cases, clients } = useStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const filteredCases = cases.filter((case_) => {
        const matchesSearch =
            case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            case_.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || case_.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getClientName = (clientId: string) => {
        const client = clients.find((c) => c.id === clientId);
        return client?.name || "Unknown Client";
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Cases</h1>
                    <p className={styles.subtitle}>Manage and track all legal cases</p>
                </div>
                <button className={styles.primaryButton}>
                    <Plus size={16} />
                    New Case
                </button>
            </div>

            {/* Filters */}
            <div className={styles.filtersCard}>
                <div className={styles.filtersContent}>
                    <div className={styles.searchWrapper}>
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search cases..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>
                    <div className={styles.filterButtons}>
                        {["all", "open", "in-review", "closed"].map((status) => (
                            <button
                                key={status}
                                className={`${styles.filterButton} ${statusFilter === status ? styles.activeFilter : ""
                                    }`}
                                onClick={() => setStatusFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)} (
                                {status === "all"
                                    ? cases.length
                                    : cases.filter((c) => c.status === status).length}
                                )
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div>
                        <p>Total Cases</p>
                        <h2>{cases.length}</h2>
                    </div>
                    <Scale size={24} />
                </div>
                <div className={styles.statCard}>
                    <div>
                        <p>Open</p>
                        <h2>{cases.filter((c) => c.status === "open").length}</h2>
                    </div>
                    <AlertTriangle size={24} />
                </div>
                <div className={styles.statCard}>
                    <div>
                        <p>In Review</p>
                        <h2>{cases.filter((c) => c.status === "in-review").length}</h2>
                    </div>
                    <Hourglass size={24} />
                </div>
                <div className={styles.statCard}>
                    <div>
                        <p>Closed</p>
                        <h2>{cases.filter((c) => c.status === "closed").length}</h2>
                    </div>
                    <CheckCircle size={24} />
                </div>
            </div>

            {/* Cases List */}
            <div className={styles.caseList}>
                {filteredCases.map((case_) => (
                    <div key={case_.id} className={styles.caseCard}>
                        <div className={styles.caseHeader}>
                            <h3>{case_.title}</h3>
                            <MoreVertical size={18} />
                        </div>
                        <div className={styles.caseBadges}>
                            <StatusBadge status={case_.status} />
                            <PriorityBadge priority={case_.priority} />
                        </div>
                        <p className={styles.caseDescription}>{case_.description}</p>
                        <div className={styles.caseMeta}>
                            <span>
                                <User size={14} /> {getClientName(case_.clientId)}
                            </span>
                            {case_.assignedTo && (
                                <span>
                                    <Scale size={14} /> Assigned to {case_.assignedTo}
                                </span>
                            )}
                            <span>
                                <Clock size={14} /> Updated{" "}
                                {format(case_.updatedAt, "MMM d, yyyy")}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCases.length === 0 && (
                <div className={styles.emptyCard}>
                    <Scale size={32} className={styles.emptyIcon} />
                    <h3>No cases found</h3>
                    <p>
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Get started by creating your first case"}
                    </p>
                    <button className={styles.primaryButton}>
                        <Plus size={16} /> New Case
                    </button>
                </div>
            )}
        </div>
    );
};

export default CasesList;

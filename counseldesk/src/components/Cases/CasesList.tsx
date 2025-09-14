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
import { useStore } from "../../Store/userstore";
import { format } from "date-fns";
import "../../Styling/CasesList.scss";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const variants: Record<string, { text: string; icon: React.ElementType }> = {
        open: { text: "Open", icon: Scale },
        closed: { text: "Closed", icon: CheckCircle },
        pending: { text: "Pending", icon: Clock },
        "in-review": { text: "In Review", icon: Eye },
    };

    const variant = variants[status] || variants.open;
    const Icon = variant.icon;

    return (
        <span className={`status-badge status-${status}`}>
            <Icon size={14} /> {variant.text}
        </span>
    );
};

interface PriorityBadgeProps {
    priority: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
    return <span className={`priority-badge priority-${priority}`}>{priority.toUpperCase()}</span>;
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
        <div className="cases-list">
            {/* Header */}
            <div className="cases-header">
                <div>
                    <h1>Cases</h1>
                    <p>Manage and track all legal cases</p>
                </div>
                <button className="btn-primary">
                    <Plus size={16} />
                    New Case
                </button>
            </div>

            {/* Filters */}
            <div className="cases-filters">
                <div className="search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="status-filters">
                    {["all", "open", "in-review", "closed"].map((status) => (
                        <button
                            key={status}
                            className={statusFilter === status ? "active" : ""}
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

            {/* Stats */}
            <div className="cases-stats">
                <div className="stat-card">
                    <p>Total Cases</p>
                    <h2>{cases.length}</h2>
                    <Scale size={24} />
                </div>
                <div className="stat-card">
                    <p>Open</p>
                    <h2>{cases.filter((c) => c.status === "open").length}</h2>
                    <AlertTriangle size={24} />
                </div>
                <div className="stat-card">
                    <p>In Review</p>
                    <h2>{cases.filter((c) => c.status === "in-review").length}</h2>
                    <Hourglass size={24} />
                </div>
                <div className="stat-card">
                    <p>Closed</p>
                    <h2>{cases.filter((c) => c.status === "closed").length}</h2>
                    <CheckCircle size={24} />
                </div>
            </div>

            {/* Cases List */}
            <div className="case-items">
                {filteredCases.map((case_) => (
                    <div key={case_.id} className="case-card">
                        <div className="case-header">
                            <h3>{case_.title}</h3>
                            <MoreVertical size={18} />
                        </div>
                        <div className="case-badges">
                            <StatusBadge status={case_.status} />
                            <PriorityBadge priority={case_.priority} />
                        </div>
                        <p>{case_.description}</p>
                        <div className="case-footer">
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
                <div className="no-cases">
                    <Scale size={32} />
                    <h3>No cases found</h3>
                    <p>
                        {searchTerm
                            ? "Try adjusting your search criteria"
                            : "Get started by creating your first case"}
                    </p>
                    <button className="btn-primary">
                        <Plus size={16} /> New Case
                    </button>
                </div>
            )}
        </div>
    );
};

export default CasesList;

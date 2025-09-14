import React from "react";
import {
    Users,
    Scale,
    FolderOpen,
    Clock,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Plus,
} from "lucide-react";
import { useStore } from "../../Store/userstore";
import { format } from "date-fns";

import "../../Styling/Dashboard.scss"; // ✅ Import SCSS

type Trend = { value: string; positive: boolean };

const OverviewCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: React.ElementType;
    trend?: Trend;
}) => (
    <div className="overview-card">
        <div className="overview-card__header">
            <span className="overview-card__title">{title}</span>
            <Icon size={20} className="overview-card__icon" />
        </div>
        <div className="overview-card__body">
            <div className="overview-card__value">{value}</div>
            <div className="overview-card__footer">
                <p className="overview-card__subtitle">{subtitle}</p>
                {trend && (
                    <span
                        className={`overview-card__trend ${trend.positive ? "positive" : "negative"
                            }`}
                    >
                        <TrendingUp size={14} />
                        {trend.value}
                    </span>
                )}
            </div>
        </div>
    </div>
);

const QuickAction = ({
    title,
    description,
    icon: Icon,
    onClick,
}: {
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
}) => (
    <button className="quick-action" onClick={onClick}>
        <div className="quick-action__header">
            <Icon size={18} className="quick-action__icon" />
            <span className="quick-action__title">{title}</span>
        </div>
        <p className="quick-action__desc">{description}</p>
    </button>
);

const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
        open: "Open",
        closed: "Closed",
        pending: "Pending",
        "in-review": "In Review",
    };

    return <span className={`status-badge status-${status}`}>{variants[status] || "Open"}</span>;
};

const Dashboard: React.FC = () => {
    const { clients, cases, setCurrentView } = useStore();

    const activeClients = clients.filter((c) => c.status === "active").length;
    const openCases = cases.filter((c) => c.status === "open").length;
    const recentCases = cases.slice(0, 5);

    return (
        <div className="dashboard">
            {/* Header */}
            <div className="dashboard__header">
                <div>
                    <h1 className="dashboard__title">Dashboard</h1>
                    <p className="dashboard__subtitle">
                        Welcome back, John. Here's what's happening.
                    </p>
                </div>
                <button
                    className="dashboard__new-btn"
                    onClick={() => setCurrentView("cases")}
                >
                    <Plus size={16} /> New Case
                </button>
            </div>

            {/* Overview Cards */}
            <div className="dashboard__overview">
                <OverviewCard
                    title="Active Clients"
                    value={activeClients.toString()}
                    subtitle="Currently active"
                    icon={Users}
                    trend={{ value: "+12%", positive: true }}
                />
                <OverviewCard
                    title="Open Cases"
                    value={openCases.toString()}
                    subtitle="Requiring attention"
                    icon={Scale}
                    trend={{ value: "+8%", positive: true }}
                />
                <OverviewCard
                    title="Documents"
                    value="247"
                    subtitle="Total uploaded"
                    icon={FolderOpen}
                    trend={{ value: "+23%", positive: true }}
                />
                <OverviewCard
                    title="This Month"
                    value="$24,500"
                    subtitle="Revenue generated"
                    icon={TrendingUp}
                    trend={{ value: "+15%", positive: true }}
                />
            </div>

            <div className="dashboard__content">
                {/* Recent Cases */}
                <div className="recent-cases">
                    <div className="recent-cases__header">
                        <h2>Recent Cases</h2>
                        <button
                            className="recent-cases__btn"
                            onClick={() => setCurrentView("cases")}
                        >
                            View All
                        </button>
                    </div>
                    <div className="recent-cases__list">
                        {recentCases.map((case_) => (
                            <div key={case_.id} className="recent-cases__item">
                                <div className="recent-cases__info">
                                    <Scale size={16} />
                                    <div>
                                        <p className="recent-cases__title">{case_.title}</p>
                                        <p className="recent-cases__desc">{case_.description}</p>
                                    </div>
                                </div>
                                <div className="recent-cases__meta">
                                    <StatusBadge status={case_.status} />
                                    <span className="recent-cases__date">
                                        {format(case_.updatedAt, "MMM d")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="quick-actions__list">
                        <QuickAction
                            title="Add New Client"
                            description="Register a new client profile"
                            icon={Users}
                            onClick={() => setCurrentView("clients")}
                        />
                        <QuickAction
                            title="Create Case"
                            description="Start a new legal case"
                            icon={Scale}
                            onClick={() => setCurrentView("cases")}
                        />
                        <QuickAction
                            title="Upload Document"
                            description="Add files to case folders"
                            icon={FolderOpen}
                            onClick={() => setCurrentView("documents")}
                        />
                        <QuickAction
                            title="Schedule Meeting"
                            description="Book client appointments"
                            icon={Clock}
                            onClick={() => setCurrentView("calendar")}
                        />
                    </div>
                </div>
            </div>

            {/* Alerts */}
            <div className="alerts">
                <h2 className="alerts__title">
                    <AlertTriangle size={18} />
                    Urgent Items
                </h2>
                <div className="alerts__list">
                    <div className="alerts__item">
                        <Clock size={14} />
                        <div>
                            <p className="alerts__task">Contract Review Due</p>
                            <p className="alerts__desc">
                                Johnson & Associates - Due tomorrow
                            </p>
                        </div>
                    </div>
                    <div className="alerts__item">
                        <CheckCircle size={14} />
                        <div>
                            <p className="alerts__task">Document Signed</p>
                            <p className="alerts__desc">
                                TechCorp NDA completed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

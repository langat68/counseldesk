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
    <div>
        <div>
            <span>{title}</span>
            <Icon size={20} />
        </div>
        <div>
            <div>{value}</div>
            <div>
                <p>{subtitle}</p>
                {trend && (
                    <span>
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
    <button onClick={onClick}>
        <div>
            <Icon size={18} />
            <span>{title}</span>
        </div>
        <p>{description}</p>
    </button>
);

const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
        open: "Open",
        closed: "Closed",
        pending: "Pending",
        "in-review": "In Review",
    };

    return <span>{variants[status] || "Open"}</span>;
};

const Dashboard: React.FC = () => {
    const { clients, cases, setCurrentView } = useStore();

    const activeClients = clients.filter((c) => c.status === "active").length;
    const openCases = cases.filter((c) => c.status === "open").length;
    const recentCases = cases.slice(0, 5);

    return (
        <div>
            {/* Header */}
            <div>
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back, John. Here's what's happening.</p>
                </div>
                <button onClick={() => setCurrentView("cases")}>
                    <Plus size={16} />
                    New Case
                </button>
            </div>

            {/* Overview Cards */}
            <div>
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

            <div>
                {/* Recent Cases */}
                <div>
                    <div>
                        <h2>Recent Cases</h2>
                        <button onClick={() => setCurrentView("cases")}>
                            View All
                        </button>
                    </div>
                    <div>
                        {recentCases.map((case_) => (
                            <div key={case_.id}>
                                <div>
                                    <Scale size={16} />
                                    <div>
                                        <p>{case_.title}</p>
                                        <p>{case_.description}</p>
                                    </div>
                                </div>
                                <div>
                                    <StatusBadge status={case_.status} />
                                    <span>{format(case_.updatedAt, "MMM d")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2>Quick Actions</h2>
                    <div>
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
            <div>
                <h2>
                    <AlertTriangle size={18} />
                    Urgent Items
                </h2>
                <div>
                    <div>
                        <Clock size={14} />
                        <div>
                            <p>Contract Review Due</p>
                            <p>Johnson & Associates - Due tomorrow</p>
                        </div>
                    </div>
                    <div>
                        <CheckCircle size={14} />
                        <div>
                            <p>Document Signed</p>
                            <p>TechCorp NDA completed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

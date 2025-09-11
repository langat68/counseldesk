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
import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import styles from "./Dashboard.module.scss";

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
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{title}</span>
            <Icon size={20} className={styles.iconPrimary} />
        </div>
        <div className={styles.cardContent}>
            <div className={styles.bigValue}>{value}</div>
            <div className={styles.subtitleRow}>
                <p className={styles.subtitle}>{subtitle}</p>
                {trend && (
                    <span
                        className={`${styles.trend} ${trend.positive ? styles.trendPositive : styles.trendNegative
                            }`}
                    >
                        <TrendingUp size={14} className={styles.trendIcon} />
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
    <button className={styles.quickAction} onClick={onClick}>
        <div className={styles.quickActionHeader}>
            <Icon size={18} className={styles.iconPrimary} />
            <span className={styles.quickActionTitle}>{title}</span>
        </div>
        <p className={styles.quickActionDesc}>{description}</p>
    </button>
);

const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, { className: string; text: string }> = {
        open: { className: styles.badgeOpen, text: "Open" },
        closed: { className: styles.badgeClosed, text: "Closed" },
        pending: { className: styles.badgePending, text: "Pending" },
        "in-review": { className: styles.badgeReview, text: "In Review" },
    };

    const variant = variants[status] || variants.open;

    return <span className={`${styles.badge} ${variant.className}`}>{variant.text}</span>;
};

const Dashboard: React.FC = () => {
    const { clients, cases, setCurrentView } = useStore();

    const activeClients = clients.filter((c) => c.status === "active").length;
    const openCases = cases.filter((c) => c.status === "open").length;
    const recentCases = cases.slice(0, 5);

    return (
        <div className={styles.dashboard}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back, John. Here's what's happening.</p>
                </div>
                <button
                    className={styles.primaryBtn}
                    onClick={() => setCurrentView("cases")}
                >
                    <Plus size={16} />
                    New Case
                </button>
            </div>

            {/* Overview Cards */}
            <div className={styles.gridOverview}>
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

            <div className={styles.gridMain}>
                {/* Recent Cases */}
                <div className={styles.recentCases}>
                    <div className={styles.cardHeader}>
                        <h2>Recent Cases</h2>
                        <button
                            className={styles.linkBtn}
                            onClick={() => setCurrentView("cases")}
                        >
                            View All
                        </button>
                    </div>
                    <div className={styles.caseList}>
                        {recentCases.map((case_) => (
                            <div key={case_.id} className={styles.caseItem}>
                                <div className={styles.caseInfo}>
                                    <Scale size={16} className={styles.iconPrimary} />
                                    <div className={styles.caseText}>
                                        <p className={styles.caseTitle}>{case_.title}</p>
                                        <p className={styles.caseDesc}>{case_.description}</p>
                                    </div>
                                </div>
                                <div className={styles.caseMeta}>
                                    <StatusBadge status={case_.status} />
                                    <span className={styles.caseDate}>
                                        {format(case_.updatedAt, "MMM d")}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                    <h2>Quick Actions</h2>
                    <div className={styles.quickActionList}>
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
            <div className={styles.alerts}>
                <h2 className={styles.cardTitle}>
                    <AlertTriangle size={18} className={styles.iconWarning} />
                    Urgent Items
                </h2>
                <div className={styles.alertGrid}>
                    <div className={`${styles.alert} ${styles.alertWarning}`}>
                        <Clock size={14} className={styles.iconWarning} />
                        <div>
                            <p className={styles.alertTitle}>Contract Review Due</p>
                            <p className={styles.alertDesc}>
                                Johnson & Associates - Due tomorrow
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.alert} ${styles.alertSuccess}`}>
                        <CheckCircle size={14} className={styles.iconSuccess} />
                        <div>
                            <p className={styles.alertTitle}>Document Signed</p>
                            <p className={styles.alertDesc}>TechCorp NDA completed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

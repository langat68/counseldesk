import React from "react";
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    PieChart,
    Calendar,
    DollarSign,
    Users,
    Scale,
    Clock,
} from "lucide-react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Mock analytics data
const monthlyData = [
    { month: "Jan", cases: 12, revenue: 24500, clients: 8 },
    { month: "Feb", cases: 15, revenue: 32000, clients: 12 },
    { month: "Mar", cases: 18, revenue: 38500, clients: 15 },
    { month: "Apr", cases: 22, revenue: 45000, clients: 18 },
    { month: "May", cases: 19, revenue: 41000, clients: 16 },
    { month: "Jun", cases: 25, revenue: 52000, clients: 22 },
];

const caseStatusData = [
    { name: "Open", value: 35, color: "hsl(213, 94%, 68%)" },
    { name: "Closed", value: 45, color: "hsl(142, 71%, 45%)" },
    { name: "In Review", value: 15, color: "hsl(43, 96%, 56%)" },
    { name: "Pending", value: 5, color: "hsl(0, 84%, 60%)" },
];

const practiceAreasData = [
    { area: "Corporate Law", cases: 28, revenue: 85000 },
    { area: "Litigation", cases: 22, revenue: 65000 },
    { area: "Real Estate", cases: 15, revenue: 45000 },
    { area: "IP Law", cases: 12, revenue: 38000 },
    { area: "Employment", cases: 8, revenue: 25000 },
];

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    trend: "up" | "down";
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, trend }) => (
    <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <p style={{ fontSize: "14px", color: "#666" }}>{title}</p>
                <p style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</p>
                <div style={{ display: "flex", alignItems: "center", marginTop: "4px" }}>
                    {trend === "up" ? (
                        <TrendingUp size={16} color="green" style={{ marginRight: "4px" }} />
                    ) : (
                        <TrendingDown size={16} color="red" style={{ marginRight: "4px" }} />
                    )}
                    <span style={{ fontSize: "14px", color: trend === "up" ? "green" : "red" }}>{change}</span>
                    <span style={{ fontSize: "12px", color: "#888", marginLeft: "4px" }}>vs last month</span>
                </div>
            </div>
            <div
                style={{
                    height: "48px",
                    width: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Icon size={22} color="#2563eb" />
            </div>
        </div>
    </div>
);

export default function AnalyticsDashboard() {
    return (
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Analytics</h1>
                    <p style={{ color: "#666" }}>Performance insights and business metrics</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
                    <Calendar size={16} style={{ marginRight: "6px" }} />
                    Last 6 months
                </div>
            </div>

            {/* Key Metrics */}
            <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                <MetricCard title="Total Revenue" value="$233k" change="+12.5%" icon={DollarSign} trend="up" />
                <MetricCard title="Active Cases" value="89" change="+8.2%" icon={Scale} trend="up" />
                <MetricCard title="New Clients" value="24" change="+15.3%" icon={Users} trend="up" />
                <MetricCard title="Avg. Case Duration" value="45 days" change="-5.2%" icon={Clock} trend="down" />
            </div>

            {/* Revenue & Cases Trend */}
            <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                        <TrendingUp size={18} style={{ marginRight: "6px" }} /> Monthly Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Bar yAxisId="left" dataKey="cases" fill="hsl(213, 94%, 68%)" />
                            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="hsl(43, 96%, 56%)" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Case Status Distribution */}
                <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                        <PieChart size={18} style={{ marginRight: "6px" }} /> Case Status Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                            <Pie
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                data={caseStatusData}
                            >
                                {caseStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: "12px", gap: "8px" }}>
                        {caseStatusData.map((item) => (
                            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: item.color }} />
                                <span>{item.name}</span>
                                <span style={{ color: "#666" }}>({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Practice Areas Performance */}
            <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
                <h3 style={{ display: "flex", alignItems: "center" }}>
                    <BarChart3 size={18} style={{ marginRight: "6px" }} /> Practice Areas Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={practiceAreasData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="area" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="cases" fill="hsl(213, 94%, 68%)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

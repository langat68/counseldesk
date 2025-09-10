import React, { useState } from "react";
import {
    Search,
    Users,
    Scale,
    FileText,
    Filter,
    Clock,
    ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

// Mock search results
const mockResults = {
    clients: [
        {
            id: "1",
            name: "Sarah Johnson",
            email: "sarah.johnson@email.com",
            company: "Johnson & Associates",
            type: "client",
            lastActivity: new Date("2024-02-28"),
        },
        {
            id: "2",
            name: "Michael Chen",
            email: "michael.chen@techcorp.com",
            company: "TechCorp Inc.",
            type: "client",
            lastActivity: new Date("2024-02-25"),
        },
    ],
    cases: [
        {
            id: "1",
            title: "Contract Negotiation - Johnson & Associates",
            description: "Review and negotiate commercial lease agreement terms",
            status: "open",
            client: "Sarah Johnson",
            type: "case",
            lastActivity: new Date("2024-02-28"),
        },
        {
            id: "2",
            title: "Intellectual Property Review",
            description: "Patent application and trademark registration for TechCorp",
            status: "in-review",
            client: "Michael Chen",
            type: "case",
            lastActivity: new Date("2024-02-25"),
        },
    ],
    documents: [
        {
            id: "1",
            name: "Contract_JohnsonAssociates_2024.pdf",
            size: "2.4 MB",
            case: "Contract Negotiation - Johnson & Associates",
            type: "document",
            lastActivity: new Date("2024-02-20"),
        },
        {
            id: "2",
            name: "NDA_TechCorp_Signed.pdf",
            size: "1.8 MB",
            case: "Intellectual Property Review",
            type: "document",
            lastActivity: new Date("2024-02-15"),
        },
    ],
};

// Result Card Component
const ResultCard: React.FC<{ result: any; type: string }> = ({ result, type }) => {
    const icons = {
        client: Users,
        case: Scale,
        document: FileText,
    };

    const Icon = icons[type as keyof typeof icons];

    return (
        <div className="border border-border/50 rounded-lg hover:shadow-md transition-all duration-300 group cursor-pointer bg-card">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {result.name || result.title}
                            </h3>

                            {type === "client" && (
                                <div className="space-y-1 mt-1">
                                    <p className="text-sm text-muted-foreground">{result.email}</p>
                                    {result.company && (
                                        <p className="text-sm text-muted-foreground">
                                            {result.company}
                                        </p>
                                    )}
                                </div>
                            )}

                            {type === "case" && (
                                <div className="space-y-1 mt-1">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {result.description}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`px-2 py-0.5 rounded text-xs ${result.status === "open"
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {result.status}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            Client: {result.client}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {type === "document" && (
                                <div className="space-y-1 mt-1">
                                    <p className="text-sm text-muted-foreground">{result.case}</p>
                                    <p className="text-xs text-muted-foreground">{result.size}</p>
                                </div>
                            )}

                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                Last activity: {format(result.lastActivity, "MMM d, yyyy")}
                            </div>
                        </div>
                    </div>

                    <button className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Search Component
const GlobalSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<
        "all" | "clients" | "cases" | "documents"
    >("all");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (query: string) => {
        if (!query.trim()) return;
        setIsSearching(true);
        setTimeout(() => {
            setIsSearching(false);
        }, 500);
    };

    const getFilteredResults = () => {
        if (!searchQuery.trim())
            return { clients: [], cases: [], documents: [] };

        const query = searchQuery.toLowerCase();

        return {
            clients:
                selectedFilter === "all" || selectedFilter === "clients"
                    ? mockResults.clients.filter(
                        (c) =>
                            c.name.toLowerCase().includes(query) ||
                            c.email.toLowerCase().includes(query) ||
                            (c.company?.toLowerCase().includes(query) ?? false)
                    )
                    : [],
            cases:
                selectedFilter === "all" || selectedFilter === "cases"
                    ? mockResults.cases.filter(
                        (c) =>
                            c.title.toLowerCase().includes(query) ||
                            c.description.toLowerCase().includes(query) ||
                            c.client.toLowerCase().includes(query)
                    )
                    : [],
            documents:
                selectedFilter === "all" || selectedFilter === "documents"
                    ? mockResults.documents.filter(
                        (d) =>
                            d.name.toLowerCase().includes(query) ||
                            d.case.toLowerCase().includes(query)
                    )
                    : [],
        };
    };

    const results = getFilteredResults();
    const totalResults =
        results.clients.length +
        results.cases.length +
        results.documents.length;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Search</h1>
                <p className="text-muted-foreground">
                    Find clients, cases, and documents quickly
                </p>
            </div>

            {/* Search Bar */}
            <div className="border border-border/50 rounded-lg bg-card p-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search across all your legal data..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                        className="pl-12 pr-4 h-14 text-lg w-full bg-background border border-muted focus:border-primary rounded-lg outline-none"
                    />
                </div>

                {/* Search Filters */}
                <div className="flex items-center space-x-2 mt-4">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-2">
                        Filter by:
                    </span>
                    {["all", "clients", "cases", "documents"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() =>
                                setSelectedFilter(filter as typeof selectedFilter)
                            }
                            className={`px-3 py-1 rounded text-sm ${selectedFilter === filter
                                    ? "bg-primary text-white"
                                    : "border border-muted text-muted-foreground hover:bg-gray-50"
                                }`}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {searchQuery.trim() && (
                <>
                    {/* Results Summary */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">
                            Search Results {totalResults > 0 && `(${totalResults})`}
                        </h2>
                        {isSearching && (
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                                <span className="text-sm">Searching...</span>
                            </div>
                        )}
                    </div>

                    {totalResults > 0 ? (
                        <div className="space-y-8">
                            {/* Clients */}
                            {results.clients.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Users className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-medium text-foreground">
                                            Clients ({results.clients.length})
                                        </h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {results.clients.map((client) => (
                                            <ResultCard
                                                key={client.id}
                                                result={client}
                                                type="client"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cases */}
                            {results.cases.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <Scale className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-medium text-foreground">
                                            Cases ({results.cases.length})
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {results.cases.map((case_) => (
                                            <ResultCard
                                                key={case_.id}
                                                result={case_}
                                                type="case"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Documents */}
                            {results.documents.length > 0 && (
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <FileText className="h-5 w-5 text-primary" />
                                        <h3 className="text-lg font-medium text-foreground">
                                            Documents ({results.documents.length})
                                        </h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {results.documents.map((document) => (
                                            <ResultCard
                                                key={document.id}
                                                result={document}
                                                type="document"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : !isSearching ? (
                        <div className="border border-border/50 rounded-lg bg-card flex flex-col items-center justify-center py-12">
                            <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <h3 className="text-lg font-medium text-foreground">
                                No results found
                            </h3>
                            <p className="text-muted-foreground text-center">
                                Try adjusting your search terms or clearing filters
                            </p>
                        </div>
                    ) : null}
                </>
            )}

            {/* Search Tips */}
            {!searchQuery.trim() && (
                <div className="border border-border/50 rounded-lg bg-card">
                    <div className="p-4 border-b border-border/50">
                        <h3 className="font-semibold">Search Tips</h3>
                    </div>
                    <div className="p-6 grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <h4 className="font-medium text-foreground">Quick Searches</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Search by client name or email</li>
                                <li>• Find cases by title or description</li>
                                <li>• Locate documents by filename</li>
                                <li>• Use filters to narrow results</li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium text-foreground">Advanced Tips</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Use quotes for exact phrases</li>
                                <li>• Search across multiple fields</li>
                                <li>• Filter by content type</li>
                                <li>• Recent activity is prioritized</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;

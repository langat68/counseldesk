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
import "./GlobalSearch.scss";

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
const ResultCard = ({ result, type }) => {
    const icons = {
        client: Users,
        case: Scale,
        document: FileText,
    };

    const Icon = icons[type];

    return (
        <div className="result-card">
            <div className="result-card-content">
                <div className="result-main">
                    <div className="result-header">
                        <div className="result-icon">
                            <Icon className="icon" />
                        </div>
                        <div className="result-info">
                            <h3 className="result-title">{result.name || result.title}</h3>

                            {type === "client" && (
                                <div className="client-details">
                                    <p className="client-email">{result.email}</p>
                                    {result.company && <p className="client-company">{result.company}</p>}
                                </div>
                            )}

                            {type === "case" && (
                                <div className="case-details">
                                    <p className="case-description">{result.description}</p>
                                    <div className="case-meta">
                                        <span className={`case-status status-${result.status}`}>
                                            {result.status}
                                        </span>
                                        <span className="case-client">Client: {result.client}</span>
                                    </div>
                                </div>
                            )}

                            {type === "document" && (
                                <div className="document-details">
                                    <p className="document-case">{result.case}</p>
                                    <p className="document-size">{result.size}</p>
                                </div>
                            )}

                            <div className="result-activity">
                                <Clock className="activity-icon" />
                                <span className="activity-text">
                                    Last activity: {format(result.lastActivity, "MMM d, yyyy")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="result-action-btn">
                        <ArrowRight className="action-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main Search Component
const GlobalSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (query) => {
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
        <div className="global-search">
            {/* Header */}
            <div className="search-header">
                <h1 className="header-title">Search</h1>
                <p className="header-description">Find clients, cases, and documents quickly</p>
            </div>

            {/* Search Bar */}
            <div className="search-controls">
                <div className="search-input-container">
                    <div className="search-input-wrapper">
                        <Search className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search across all your legal data..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        />
                    </div>
                </div>

                {/* Search Filters */}
                <div className="search-filters">
                    <div className="filters-label">
                        <Filter className="filter-icon" />
                        <span className="filter-text">Filter by:</span>
                    </div>
                    <div className="filter-buttons">
                        {["all", "clients", "cases", "documents"].map((filter) => (
                            <button
                                key={filter}
                                className={`filter-btn ${selectedFilter === filter ? "active" : ""}`}
                                onClick={() => setSelectedFilter(filter)}
                            >
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            {searchQuery.trim() && (
                <div className="search-results">
                    {/* Results Summary */}
                    <div className="results-summary">
                        <h2 className="summary-title">
                            Search Results {totalResults > 0 && `(${totalResults})`}
                        </h2>
                        {isSearching && (
                            <div className="searching-indicator">
                                <span className="searching-text">Searching...</span>
                            </div>
                        )}
                    </div>

                    {totalResults > 0 ? (
                        <div className="results-content">
                            {/* Clients */}
                            {results.clients.length > 0 && (
                                <div className="results-section">
                                    <div className="section-header">
                                        <Users className="section-icon" />
                                        <h3 className="section-title">
                                            Clients ({results.clients.length})
                                        </h3>
                                    </div>
                                    <div className="section-results">
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
                                <div className="results-section">
                                    <div className="section-header">
                                        <Scale className="section-icon" />
                                        <h3 className="section-title">Cases ({results.cases.length})</h3>
                                    </div>
                                    <div className="section-results">
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
                                <div className="results-section">
                                    <div className="section-header">
                                        <FileText className="section-icon" />
                                        <h3 className="section-title">
                                            Documents ({results.documents.length})
                                        </h3>
                                    </div>
                                    <div className="section-results">
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
                        <div className="no-results">
                            <Search className="no-results-icon" />
                            <h3 className="no-results-title">No results found</h3>
                            <p className="no-results-description">
                                Try adjusting your search terms or clearing filters
                            </p>
                        </div>
                    ) : null}
                </div>
            )}

            {/* Search Tips */}
            {!searchQuery.trim() && (
                <div className="search-tips">
                    <div className="tips-header">
                        <h3 className="tips-title">Search Tips</h3>
                    </div>
                    <div className="tips-content">
                        <div className="tips-section">
                            <h4 className="tips-section-title">Quick Searches</h4>
                            <ul className="tips-list">
                                <li className="tip-item">• Search by client name or email</li>
                                <li className="tip-item">• Find cases by title or description</li>
                                <li className="tip-item">• Locate documents by filename</li>
                                <li className="tip-item">• Use filters to narrow results</li>
                            </ul>
                        </div>
                        <div className="tips-section">
                            <h4 className="tips-section-title">Advanced Tips</h4>
                            <ul className="tips-list">
                                <li className="tip-item">• Use quotes for exact phrases</li>
                                <li className="tip-item">• Search across multiple fields</li>
                                <li className="tip-item">• Filter by content type</li>
                                <li className="tip-item">• Recent activity is prioritized</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
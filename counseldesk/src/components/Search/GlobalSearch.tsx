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
import "../../Styling/GlobalSearch.scss"

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
        <div>
            <div>
                <div>
                    <div>
                        <Icon />
                        <div>
                            <h3>{result.name || result.title}</h3>

                            {type === "client" && (
                                <div>
                                    <p>{result.email}</p>
                                    {result.company && <p>{result.company}</p>}
                                </div>
                            )}

                            {type === "case" && (
                                <div>
                                    <p>{result.description}</p>
                                    <div>
                                        <span>{result.status}</span>
                                        <span>Client: {result.client}</span>
                                    </div>
                                </div>
                            )}

                            {type === "document" && (
                                <div>
                                    <p>{result.case}</p>
                                    <p>{result.size}</p>
                                </div>
                            )}

                            <div>
                                <Clock />
                                Last activity: {format(result.lastActivity, "MMM d, yyyy")}
                            </div>
                        </div>
                    </div>
                    <button>
                        <ArrowRight />
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
        <div>
            {/* Header */}
            <div>
                <h1>Search</h1>
                <p>Find clients, cases, and documents quickly</p>
            </div>

            {/* Search Bar */}
            <div>
                <div>
                    <Search />
                    <input
                        type="text"
                        placeholder="Search across all your legal data..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            handleSearch(e.target.value);
                        }}
                    />
                </div>

                {/* Search Filters */}
                <div>
                    <Filter />
                    <span>Filter by:</span>
                    {["all", "clients", "cases", "documents"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() =>
                                setSelectedFilter(filter as typeof selectedFilter)
                            }
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
                    <div>
                        <h2>
                            Search Results {totalResults > 0 && `(${totalResults})`}
                        </h2>
                        {isSearching && (
                            <div>
                                <span>Searching...</span>
                            </div>
                        )}
                    </div>

                    {totalResults > 0 ? (
                        <div>
                            {/* Clients */}
                            {results.clients.length > 0 && (
                                <div>
                                    <div>
                                        <Users />
                                        <h3>
                                            Clients ({results.clients.length})
                                        </h3>
                                    </div>
                                    <div>
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
                                    <div>
                                        <Scale />
                                        <h3>Cases ({results.cases.length})</h3>
                                    </div>
                                    <div>
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
                                    <div>
                                        <FileText />
                                        <h3>
                                            Documents ({results.documents.length})
                                        </h3>
                                    </div>
                                    <div>
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
                        <div>
                            <Search />
                            <h3>No results found</h3>
                            <p>
                                Try adjusting your search terms or clearing filters
                            </p>
                        </div>
                    ) : null}
                </>
            )}

            {/* Search Tips */}
            {!searchQuery.trim() && (
                <div>
                    <div>
                        <h3>Search Tips</h3>
                    </div>
                    <div>
                        <div>
                            <h4>Quick Searches</h4>
                            <ul>
                                <li>• Search by client name or email</li>
                                <li>• Find cases by title or description</li>
                                <li>• Locate documents by filename</li>
                                <li>• Use filters to narrow results</li>
                            </ul>
                        </div>
                        <div>
                            <h4>Advanced Tips</h4>
                            <ul>
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

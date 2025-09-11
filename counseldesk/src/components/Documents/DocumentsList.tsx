import React, { useState } from "react";
import {
    Search,
    FileText,
    Download,
    Eye,
    MoreVertical,
    Upload,
    Folder,
} from "lucide-react";
import { format } from "date-fns";

// Mock documents data
const mockDocuments = [
    {
        id: "1",
        name: "Contract_JohnsonAssociates_2024.pdf",
        type: "PDF",
        size: 2.4,
        caseId: "1",
        caseName: "Contract Negotiation - Johnson & Associates",
        uploadedAt: new Date("2024-02-20"),
        tags: ["contract", "legal", "negotiation"],
    },
    {
        id: "2",
        name: "NDA_TechCorp_Signed.pdf",
        type: "PDF",
        size: 1.8,
        caseId: "2",
        caseName: "Intellectual Property Review",
        uploadedAt: new Date("2024-02-15"),
        tags: ["nda", "signed", "confidentiality"],
    },
    {
        id: "3",
        name: "LLC_Articles_StartupCo.docx",
        type: "DOCX",
        size: 0.8,
        caseId: "3",
        caseName: "Corporate Formation",
        uploadedAt: new Date("2024-01-28"),
        tags: ["incorporation", "articles", "llc"],
    },
    {
        id: "4",
        name: "Patent_Application_Draft.pdf",
        type: "PDF",
        size: 5.2,
        caseId: "2",
        caseName: "Intellectual Property Review",
        uploadedAt: new Date("2024-02-10"),
        tags: ["patent", "draft", "intellectual property"],
    },
];

const FileIcon = ({ type }: { type: string }) => {
    switch (type.toLowerCase()) {
        case "pdf":
            return <FileText />;
        case "docx":
        case "doc":
            return <FileText />;
        default:
            return <FileText />;
    }
};

const formatFileSize = (mb: number) => {
    if (mb < 1) return `${(mb * 1024).toFixed(1)} KB`;
    return `${mb.toFixed(1)} MB`;
};

const DocumentsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");

    const filteredDocuments = mockDocuments.filter((doc) => {
        const matchesSearch =
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.caseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            );

        const matchesType =
            typeFilter === "all" ||
            doc.type.toLowerCase() === typeFilter.toLowerCase();

        return matchesSearch && matchesType;
    });

    const documentTypes = ["all", ...new Set(mockDocuments.map((d) => d.type))];

    return (
        <div>
            {/* Header */}
            <div>
                <div>
                    <h1>Documents</h1>
                    <p>Manage case files and legal documents</p>
                </div>
                <button>
                    <Upload size={16} /> Upload Documents
                </button>
            </div>

            {/* Filters & Search */}
            <div>
                <div>
                    <div>
                        <Search />
                        <input
                            type="text"
                            placeholder="Search documents, cases, or tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        {documentTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setTypeFilter(type)}
                            >
                                {type === "all" ? "All" : type.toUpperCase()}
                                {type !== "all" && (
                                    <span>
                                        ({mockDocuments.filter((d) => d.type === type).length})
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div>
                <div>
                    <div>
                        <div>
                            <p>Total Documents</p>
                            <h2>{mockDocuments.length}</h2>
                        </div>
                        <Folder size={32} />
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <p>PDF Files</p>
                            <h2>
                                {mockDocuments.filter((d) => d.type === "PDF").length}
                            </h2>
                        </div>
                        <FileText size={32} />
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <p>This Month</p>
                            <h2>
                                {
                                    mockDocuments.filter(
                                        (d) => d.uploadedAt.getMonth() === new Date().getMonth()
                                    ).length
                                }
                            </h2>
                        </div>
                        <Upload size={32} />
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <p>Total Size</p>
                            <h2>
                                {formatFileSize(
                                    mockDocuments.reduce((acc, doc) => acc + doc.size, 0)
                                )}
                            </h2>
                        </div>
                        <Download size={32} />
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div>
                {filteredDocuments.map((document) => (
                    <div key={document.id}>
                        <div>
                            <FileIcon type={document.type} />
                            <div>
                                <h3>{document.name}</h3>
                                <div>
                                    <span>Case: {document.caseName}</span>
                                    <span>{formatFileSize(document.size)}</span>
                                    <span>{format(document.uploadedAt, "MMM d, yyyy")}</span>
                                </div>
                                <div>
                                    {document.tags.slice(0, 3).map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                    {document.tags.length > 3 && (
                                        <span>
                                            +{document.tags.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button>
                                    <Eye size={16} />
                                </button>
                                <button>
                                    <Download size={16} />
                                </button>
                                <button>
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredDocuments.length === 0 && (
                <div>
                    <div>
                        <FileText size={40} />
                        <h3>No documents found</h3>
                        <p>
                            {searchTerm
                                ? "Try adjusting your search criteria"
                                : "Get started by uploading your first document"}
                        </p>
                        <button>
                            <Upload size={16} /> Upload Documents
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentsList;

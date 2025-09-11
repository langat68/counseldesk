import { create } from "zustand";

interface Case {
    id: string;
    title: string;
    description: string;
    status: "open" | "in-review" | "closed" | "pending";
    priority: "low" | "medium" | "high" | "urgent";
    clientId: string;
    assignedTo?: string;
    updatedAt: Date;
}

interface Client {
    id: string;
    name: string;
}

interface StoreState {
    cases: Case[];
    clients: Client[];
    addCase: (newCase: Case) => void;
    updateCase: (id: string, updates: Partial<Case>) => void;
}

export const useStore = create<StoreState>((set) => ({
    cases: [
        {
            id: "1",
            title: "Contract Review",
            description: "Review NDA agreement for client",
            status: "open",
            priority: "high",
            clientId: "c1",
            assignedTo: "Alice",
            updatedAt: new Date(),
        },
        {
            id: "2",
            title: "Court Filing",
            description: "Prepare and submit documents",
            status: "in-review",
            priority: "urgent",
            clientId: "c2",
            updatedAt: new Date(),
        },
        {
            id: "3",
            title: "Trademark Application",
            description: "Assist client with trademark filing",
            status: "closed",
            priority: "medium",
            clientId: "c1",
            assignedTo: "Bob",
            updatedAt: new Date(),
        },
    ],
    clients: [
        { id: "c1", name: "Acme Corp" },
        { id: "c2", name: "John Doe" },
    ],
    addCase: (newCase) =>
        set((state) => ({
            cases: [...state.cases, newCase],
        })),
    updateCase: (id, updates) =>
        set((state) => ({
            cases: state.cases.map((c) =>
                c.id === id ? { ...c, ...updates } : c
            ),
        })),
}));

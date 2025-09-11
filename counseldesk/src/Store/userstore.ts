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
    email: string;
    phone: string;
    company?: string;
    createdAt: Date;
    status: "active" | "inactive";
}

type View = "dashboard" | "clients" | "cases" | "documents" | "calendar";

interface StoreState {
    cases: Case[];
    clients: Client[];
    currentView: View;
    setCurrentView: (view: View) => void;
    addCase: (newCase: Case) => void;
    updateCase: (id: string, updates: Partial<Case>) => void;
    addClient: (newClient: Client) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
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
        {
            id: "c1",
            name: "Acme Corp",
            email: "contact@acme.com",
            phone: "+1-555-1111",
            company: "Acme Corp",
            createdAt: new Date("2022-04-15"),
            status: "active",
        },
        {
            id: "c2",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1-555-2222",
            company: "Doe & Partners",
            createdAt: new Date("2023-01-10"),
            status: "inactive",
        },
    ],
    currentView: "dashboard",
    setCurrentView: (view) => set({ currentView: view }),
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
    addClient: (newClient) =>
        set((state) => ({
            clients: [...state.clients, newClient],
        })),
    updateClient: (id, updates) =>
        set((state) => ({
            clients: state.clients.map((c) =>
                c.id === id ? { ...c, ...updates } : c
            ),
        })),
}));

import React, { useState } from 'react';
import {
    Home,
    FileText,
    Briefcase,
    Users,
    BarChart3,
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import '../Styling/sidebar.scss';

interface SidebarProps {
    className?: string;
}

interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
    path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');

    const navItems: NavItem[] = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
        { id: 'documents', label: 'Documents', icon: FileText, path: '/documents' },
        { id: 'cases', label: 'Cases', icon: Briefcase, path: '/cases' },
        { id: 'clients', label: 'Clients', icon: Users, path: '/clients' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
        { id: 'search', label: 'Search', icon: Search, path: '/search' },
    ];

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
        // You can add navigation logic here
        console.log(`Navigating to: ${itemId}`);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''} ${className}`}>
            {/* Header */}
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    {!isCollapsed && <span className="sidebar__logo-text">LegalApp</span>}
                </div>
                <button
                    className="sidebar__toggle"
                    onClick={toggleSidebar}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar__nav">
                <ul className="sidebar__nav-list">
                    {navItems.map((item) => {
                        const IconComponent = item.icon;
                        return (
                            <li key={item.id} className="sidebar__nav-item">
                                <button
                                    className={`sidebar__nav-link ${activeItem === item.id ? 'sidebar__nav-link--active' : ''
                                        }`}
                                    onClick={() => handleItemClick(item.id)}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <IconComponent className="sidebar__nav-icon" size={20} />
                                    {!isCollapsed && (
                                        <span className="sidebar__nav-text">{item.label}</span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
import { useState } from 'react';
import CasesList from './components/Cases/CasesList';
import AnalyticsDashboard from './components/Analytics/AnalyticDashboard';
import CalendarView from './components/Calender/CalenderView';
import ClientsList from './components/clients/ClientsLists';
import Dashboard from './components/Dashboard/Dashboard';
import GlobalSearch from './components/Search/GlobalSearch';
import Sidebar from './components/sidebar';
import './App.scss'; // We'll need this for layout styles

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  // Function to render the current active component
  const renderActiveComponent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'documents':
        return <div>Documents Component (to be created)</div>;
      case 'cases':
        return <CasesList />;
      case 'clients':
        return <ClientsList />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'search':
        return <GlobalSearch />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <main className="main-content">
        <div className="content-wrapper">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
}

export default App;
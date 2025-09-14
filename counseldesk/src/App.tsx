

import CasesList from './components/Cases/CasesList'
import AnalyticsDashboard from './components/Analytics/AnalyticDashboard'
import CalendarView from './components/Calender/CalenderView'
import ClientsList from './components/clients/ClientsLists'
import Dashboard from './components/Dashboard/Dashboard'
import GlobalSearch from './components/Search/GlobalSearch'
import Sidebar from './components/sidebar'

function App() {


  return (
    <>

      <CasesList />
      <AnalyticsDashboard />
      <ClientsList />
      <CalendarView />
      <Dashboard />
      <Sidebar />

      <GlobalSearch />

    </>
  )
}

export default App

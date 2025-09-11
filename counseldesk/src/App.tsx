
import './App.css'
import CasesList from './components/Cases/CasesList'
import AnalyticsDashboard from './components/Analytics/AnalyticDashboard'
import CalendarView from './components/Calender/CalenderView'
import ClientsList from './components/clients/ClientsLists'
import Dashboard from './components/Dashboard/Dashboard'

function App() {


  return (
    <>

      <CasesList />
      <AnalyticsDashboard />
      <ClientsList />
      <CalendarView />
      <Dashboard />

    </>
  )
}

export default App

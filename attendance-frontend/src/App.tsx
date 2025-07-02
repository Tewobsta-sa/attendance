import { Routes, Route } from 'react-router-dom';
import LoginPage from  './pages/LoginPages';
import Dashboard from './pages/Dashboard';
import AttendanceScanner from './pages/AttendanceScanner';
import AttendanceList from './pages/AttendanceList';
import AttendanceSummary from './pages/AttendanceSummary';
import Layout from './components/Layouts';
import ExcelImportPage from './pages/ExcelImportPage';
import AttendanceExportPage from './pages/AttendanceExportPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
      <Route path="/scanner" element={
        <Layout>
          <AttendanceScanner />
        </Layout>
      } />
      <Route path="/attendance" element={
        <Layout>
          <AttendanceList />
        </Layout>
      } />
      <Route path="/summary" element={
        <Layout>
          <AttendanceSummary />
        </Layout>
      } />
      <Route path="/import" element={
            <Layout>
              <ExcelImportPage />
            </Layout>
          }
        />

      <Route path="/export" element={
          <Layout>
            <AttendanceExportPage />
          </Layout>
        }
      />
    </Routes>

    

    
  );
}

export default App;

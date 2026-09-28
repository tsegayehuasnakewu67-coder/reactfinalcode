import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { attendanceService } from '../../services/attendanceService';
import { userService } from '../../services/userService';
import Spinner from '../../components/Spinner';
import { Users, UserCheck, UserX, Clock, ClipboardList, CalendarDays, BarChart3 } from 'lucide-react';

const panel = { background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8, padding: 20 };

export default function HRDashboard() {
  const [data, setData] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([attendanceService.getDashboard(), userService.getAll({ limit: 1 })])
      .then(([dashboard, directory]) => {
        setData(dashboard);
        setEmployees(directory.pagination.total);
      })
      .catch(err => setError(err.message || 'Unable to load HR overview.'));
  }, []);

  if (error) return <p style={{ color: '#fca5a5' }}>{error}</p>;
  if (!data || employees === null) return <Spinner />;

  const cards = [
    { label: 'Employees', value: employees, icon: Users, color: '#60a5fa' },
    { label: 'Present today', value: data.summary.presentToday, icon: UserCheck, color: '#4ade80' },
    { label: 'Late today', value: data.summary.lateToday, icon: Clock, color: '#fbbf24' },
    { label: 'Absent today', value: data.summary.absentToday, icon: UserX, color: '#f87171' },
  ];
  const links = [
    { to: '/hr/employees', icon: Users, label: 'Employee management', detail: 'Directory, departments, and employee records' },
    { to: '/hr/attendance', icon: ClipboardList, label: 'Attendance monitoring', detail: 'Review daily check-ins and check-outs' },
    { to: '/hr/leaves', icon: CalendarDays, label: 'Leave management', detail: 'Review and respond to leave requests' },
    { to: '/hr/reports', icon: BarChart3, label: 'Reports', detail: 'Explore attendance summaries and trends' },
  ];

  return (
    <main style={{ display: 'grid', gap: 24 }}>
      <header>
        <p style={{ color: '#4ade80', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px' }}>People operations</p>
        <h1 style={{ color: '#f1f5f9', fontSize: 26, margin: 0 }}>HR Dashboard</h1>
        <p style={{ color: '#94a3b8', margin: '8px 0 0' }}>Employee activity and attendance overview for today.</p>
      </header>

      <section aria-label="Attendance overview" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12 }}>
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={panel}>
            <Icon size={18} color={color} />
            <p style={{ color: '#94a3b8', fontSize: 13, margin: '12px 0 4px' }}>{label}</p>
            <strong style={{ color: '#f8fafc', fontSize: 26 }}>{value}</strong>
          </div>
        ))}
      </section>

      <section aria-label="HR workspace" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
        {links.map(({ to, icon: Icon, label, detail }) => (
          <Link key={to} to={to} style={{ ...panel, color: 'inherit', textDecoration: 'none', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <Icon size={19} color="#4ade80" />
            <span>
              <strong style={{ display: 'block', color: '#e2e8f0', fontSize: 14 }}>{label}</strong>
              <span style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{detail}</span>
            </span>
          </Link>
        ))}
      </section>

      <section style={panel}>
        <h2 style={{ color: '#e2e8f0', fontSize: 15, margin: '0 0 12px' }}>Attendance by department</h2>
        {data.deptStats.length === 0 ? <p style={{ color: '#64748b', margin: 0 }}>No attendance recorded today.</p> : (
          <div style={{ display: 'grid', gap: 10 }}>
            {data.deptStats.map(department => (
              <div key={department._id} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, color: '#cbd5e1', fontSize: 13 }}>
                <span>{department._id || 'Unassigned'}</span><strong>{department.count}</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

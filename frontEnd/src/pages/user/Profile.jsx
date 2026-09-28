import { useAuth } from '../../context/AuthContext';
import { UserRound, Building2, BriefcaseBusiness, Mail, Fingerprint } from 'lucide-react';

const rows = [
  { key: 'fullName', label: 'Full name', icon: UserRound },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'employeeId', label: 'Employee ID', icon: Fingerprint },
  { key: 'department', label: 'Department', icon: Building2 },
  { key: 'position', label: 'Position', icon: BriefcaseBusiness },
];

export default function Profile() {
  const { user } = useAuth();

  return (
    <main style={{ maxWidth: 760 }}>
      <header style={{ marginBottom: 24 }}>
        <p style={{ color: '#60a5fa', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', margin: '0 0 6px' }}>Account</p>
        <h1 style={{ color: '#f1f5f9', fontSize: 26, margin: 0 }}>Profile</h1>
      </header>
      <section style={{ borderTop: '1px solid #334155' }} aria-label="Profile details">
        {rows.map(({ key, label, icon: Icon }) => (
          <div key={key} style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 2fr', gap: 12, alignItems: 'center', padding: '17px 4px', borderBottom: '1px solid #1e293b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 9, color: '#94a3b8', fontSize: 13 }}><Icon size={15} />{label}</span>
            <strong style={{ color: '#e2e8f0', fontSize: 14, overflowWrap: 'anywhere' }}>{user?.[key] || 'Not provided'}</strong>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) 2fr', gap: 12, alignItems: 'center', padding: '17px 4px', borderBottom: '1px solid #1e293b' }}>
          <span style={{ color: '#94a3b8', fontSize: 13 }}>Face attendance</span>
          <strong style={{ color: user?.hasFace ? '#4ade80' : '#fbbf24', fontSize: 13 }}>{user?.hasFace ? 'Face registered' : 'Face registration required'}</strong>
        </div>
      </section>
    </main>
  );
}

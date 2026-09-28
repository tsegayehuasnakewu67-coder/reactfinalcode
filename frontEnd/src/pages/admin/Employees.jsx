import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEmployees = useCallback(async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getAll({ search, department, page, limit: 20 });
      setEmployees(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, department]);

  useEffect(() => { fetchEmployees(1); }, [fetchEmployees]);

  useEffect(() => {
    userService.getDepartments().then(setDepartments).catch(() => {});
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await userService.remove(deleteId);
      setDeleteId(null);
      fetchEmployees(pagination.page);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h2 style={styles.pageTitle}>Employees</h2>
          <p style={styles.pageSub}>{pagination.total} total employees</p>
        </div>
        <button onClick={() => navigate('/hr/register')} style={styles.addBtn}>
          + Register Employee
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.select}
        >
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Table */}
      {loading ? <LoadingSpinner /> : (
        <>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Employee ID', 'Name', 'Email', 'Department', 'Position', 'Role', 'Status', 'Actions'].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 && (
                  <tr><td colSpan={8} style={styles.empty}>No employees found.</td></tr>
                )}
                {employees.map((emp) => (
                  <tr key={emp._id} style={styles.tr}>
                    <td style={styles.td}><code style={styles.empId}>{emp.employeeId}</code></td>
                    <td style={styles.td}>
                      <p style={styles.empName}>{emp.fullName}</p>
                    </td>
                    <td style={styles.td}><span style={styles.smallText}>{emp.email}</span></td>
                    <td style={styles.td}>{emp.department}</td>
                    <td style={styles.td}><span style={styles.smallText}>{emp.position}</span></td>
                    <td style={styles.td}><RoleBadge role={emp.role} /></td>
                    <td style={styles.td}><StatusDot active={emp.isActive} /></td>
                    <td style={styles.td}>
                      <div style={styles.actions}>
                        <button
                          onClick={() => setDeleteId(emp._id)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                disabled={pagination.page <= 1}
                onClick={() => fetchEmployees(pagination.page - 1)}
                style={styles.pageBtn}
              >
                ← Prev
              </button>
              <span style={styles.pageInfo}>Page {pagination.page} of {pagination.totalPages}</span>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => fetchEmployees(pagination.page + 1)}
                style={styles.pageBtn}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={{ margin: '0 0 12px', color: '#f1f5f9' }}>Delete Employee</h3>
            <p style={{ color: '#94a3b8', marginBottom: 20 }}>
              This will permanently delete the employee and all their attendance records. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteId(null)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} style={styles.confirmDeleteBtn}>
                {deleting ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleBadge({ role }) {
  return (
    <span style={{
      background: role === 'admin' ? 'rgba(124,58,237,.18)' : 'rgba(37,99,235,.18)',
      color: role === 'admin' ? '#c4b5fd' : '#93c5fd',
      padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600,
    }}>
      {role}
    </span>
  );
}

function StatusDot({ active }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: active ? '#16a34a' : '#dc2626' }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: active ? '#22c55e' : '#ef4444', display: 'inline-block' }} />
      {active ? 'Active' : 'Inactive'}
    </span>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  pageTitle: { margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#f1f5f9' },
  pageSub: { margin: 0, color: '#64748b', fontSize: 13 },
  addBtn: {
    background: '#3b82f6', color: '#fff', border: 'none',
    borderRadius: 8, padding: '9px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },
  filters: { display: 'flex', gap: 12, marginBottom: 16 },
  searchInput: {
    flex: 1, padding: '9px 14px', border: '1px solid #334155',
    borderRadius: 8, fontSize: 14, outline: 'none', background: '#1e293b', color: '#e2e8f0',
  },
  select: {
    padding: '9px 14px', border: '1px solid #334155',
    borderRadius: 8, fontSize: 14, background: '#1e293b', color: '#e2e8f0', cursor: 'pointer', colorScheme: 'dark',
  },
  error: { background: 'rgba(185,28,28,.2)', color: '#fca5a5', border: '1px solid #7f1d1d', padding: '10px 14px', borderRadius: 8, marginBottom: 12 },
  tableWrap: { background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, overflowX: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.25)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', background: '#1e293b', borderBottom: '1px solid #334155', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid rgba(30,41,59,.7)' },
  td: { padding: '12px 16px', fontSize: 13, color: '#cbd5e1', verticalAlign: 'middle' },
  empId: { background: '#1e293b', color: '#93c5fd', padding: '2px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' },
  empName: { margin: 0, fontWeight: 600, color: '#f1f5f9' },
  smallText: { color: '#94a3b8', fontSize: 12 },
  empty: { textAlign: 'center', padding: 32, color: '#64748b', fontSize: 14 },
  actions: { display: 'flex', gap: 6 },
  editBtn: { background: 'rgba(37,99,235,.18)', color: '#93c5fd', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  deleteBtn: { background: 'rgba(185,28,28,.18)', color: '#f87171', border: '1px solid rgba(248,113,113,.2)', borderRadius: 6, padding: '5px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' },
  pagination: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 16 },
  pageBtn: { background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' },
  pageInfo: { fontSize: 13, color: '#94a3b8' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#0f172a', border: '1px solid #334155', borderRadius: 12, padding: 28, maxWidth: 400, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' },
  cancelBtn: { background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155', borderRadius: 8, padding: '9px 20px', fontSize: 14, cursor: 'pointer' },
  confirmDeleteBtn: { background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
};

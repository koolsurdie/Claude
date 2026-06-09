import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
]

export default function Layout() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid #222' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Intelli<span style={{ color: '#FF7900' }}>Board</span>
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.6rem 1.25rem',
                color: isActive ? '#FF7900' : '#fff',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 400,
                borderLeft: isActive ? '3px solid #FF7900' : '3px solid transparent',
                background: isActive ? 'rgba(255,121,0,0.08)' : 'transparent',
                transition: 'all 0.1s',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* New Project button */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #222' }}>
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '0.6rem' }}
            onClick={() => navigate('/projects/new')}
          >
            + New Project
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, background: '#fff', minHeight: '100vh', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}

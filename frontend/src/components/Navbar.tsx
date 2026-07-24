import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { token, user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const email = typeof user?.email === 'string' ? user.email : null

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    logout()
    closeMenu()
    navigate('/login')
  }

  return (
    <header className="site-header">
      <nav className="site-nav app-container" aria-label="Main navigation">
        <NavLink className="site-brand" to="/" onClick={closeMenu}>
          <span className="site-brand__mark" aria-hidden="true">CD</span>
          <span>Car Dealership</span>
        </NavLink>

        <button
          className="site-nav__toggle"
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav-menu"
        >
          Menu
        </button>

        <div id="site-nav-menu" className={`site-nav__menu${isMenuOpen ? ' site-nav__menu--open' : ''}`}>
          {token ? (
            <>
              <div className="site-nav__links">
                <NavLink className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`} to="/" end onClick={closeMenu}>
                  Dashboard
                </NavLink>
                <NavLink className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`} to="/cars" onClick={closeMenu}>
                  Inventory
                </NavLink>
                <NavLink className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`} to="/add-car" onClick={closeMenu}>
                  Add Car
                </NavLink>
              </div>

              <div className="site-nav__account">
                <span className="site-nav__email">{email ?? 'Signed in'}</span>
                <button className="site-nav__logout" type="button" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <div className="site-nav__account">
              <NavLink className={({ isActive }) => `site-nav__link${isActive ? ' site-nav__link--active' : ''}`} to="/login" onClick={closeMenu}>
                Login
              </NavLink>
              <NavLink className="site-nav__register" to="/register" onClick={closeMenu}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar

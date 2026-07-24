import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav aria-label="Main navigation">
      <NavLink to="/">Car Dealership Inventory</NavLink>
      <NavLink to="/cars">Cars</NavLink>
      <NavLink to="/add-car">Add Car</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </nav>
  )
}

export default Navbar

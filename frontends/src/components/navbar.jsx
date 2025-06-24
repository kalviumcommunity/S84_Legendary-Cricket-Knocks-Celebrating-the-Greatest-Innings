// import "./Navbar.css";
import "./navbar.css";
import Logo from "../assets/Logo.jpg";
import { Link } from "react-router-dom"; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <img src={Logo} alt="Logo" className="Logo" />
        <h2 className="heading1">The Greatest Cricket Knocks</h2>
        <ul className="nav_elements">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-knock">Add Knock</Link></li>
          <li><Link to="/videos">Videos</Link></li>
          <li><Link to="/pictures">Pictures</Link></li>
          <li><Link to="/insights">Insights</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
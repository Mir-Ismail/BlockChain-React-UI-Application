import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import user1 from "../assets/images/users/user1.jpg";

const Header = ({ setAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setDropdownOpen((prev) => !prev);
  const handleToggleMenu = () => setIsOpen((prev) => !prev);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.dark("Successfully Logged Out");
    navigate("/login");
  };

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Navbar color="secondary" dark expand="md">
      <Button
        color="link"
        className="navbar-toggler"
        onClick={handleToggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </Button>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          {["/starter", "/about"].map((path) => (
            <NavItem key={path}>
              <Link to={path} className="nav-link">
                {path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </Link>
            </NavItem>
          ))}
        </Nav>
        <div className="d-flex align-items-center">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
          <UserDropdown
            dropdownOpen={dropdownOpen}
            toggle={toggle}
            logout={logout}
          />
        </div>
      </Collapse>
    </Navbar>
  );
};

const ThemeToggleButton = ({ theme, toggleTheme }) => (
  <Button color="secondary" onClick={toggleTheme}>
    {theme === "light" ? "Dark Mode" : "Light Mode"}
  </Button>
);

const UserDropdown = ({ dropdownOpen, toggle, logout }) => (
  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle color="primary" className="profile-dropdown">
      <img src={user1} alt="Profile" className="rounded-circle" width="30" />
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem header>Account Info</DropdownItem>
      <DropdownItem>
        <Link to="/Account">My Account</Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/forms">Edit Profile</Link>
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem>My Balance</DropdownItem>
      <DropdownItem>Inbox</DropdownItem>
      <DropdownItem onClick={logout}>Logout</DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export default Header;

import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Reg. Admin / User",
    href: "/registeruser",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Enroll Admin",
    href: "/enrollAdmin",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },
  {
    title: "Role",
    href: "/about",
    icon: "bi bi-people",
  },
  {
    title: "Buyer_Details",
    href: "/data",
    icon: "bi bi-people",
  },
  {
    title: "Insurance Plan",
    href: "/plan",
    icon: "bi bi-people",
  },

  // {
  //   title: "Hospital_Details",
  //   href: "/Hospital",
  //   icon: "bi bi-people",
  // },
  // {
  //   title: "Personal Information",
  //   href: "/personalinfo",
  //   icon: "bi bi-people",
  // },
  {
    title: "Treatment",
    href: "/treatment",
    icon: "bi bi-people",
  },
  {
    title: "Treatment_Details",
    href: "/tdetails",
    icon: "bi bi-people",
  },
];

const Sidebar = ({ role }) => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const filteredNavigation = navigation.filter((item) => {
    if ((item.title === "Role" || item.title === "Table") && role !== "Admin") {
      return false;
    }
    return true;
  });

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        {/* <Logo /> */}
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {filteredNavigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

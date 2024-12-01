import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import Starter from "../views/Starter";

const FullLayout = ({ setAuth, role }) => {
  const location = useLocation();

  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/* Sidebar */}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/* Content Area */}
        <div className="contentArea">
          {/* Header */}
          <Header setAuth={setAuth} />
          {/* Middle Content */}
          <Container className="p-4 wrapper" fluid>
            {/* Show Starter Component only when at the root path */}
            {location.pathname === "/" && <Starter role={role} />}
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;

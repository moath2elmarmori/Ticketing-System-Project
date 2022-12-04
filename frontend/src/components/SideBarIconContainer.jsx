import { NavLink } from "react-router-dom";

const activeStyle = {
  backgroundColor: "#00225a",
};

function SideBarIconContainer({ children, wherToNavigate }) {
  return (
    <NavLink
      to={wherToNavigate}
      className="icon-container"
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
    >
      {children}
    </NavLink>
  );
}

export default SideBarIconContainer;

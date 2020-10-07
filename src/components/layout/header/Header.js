import React, { useEffect } from "react";
import Logo from "../../../media/logo.png";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./header.scss";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import StorefrontIcon from "@material-ui/icons/Storefront";
function Header(props) {
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line
  }, []);
  function renderSections() {
    if (typeof props.sections === "object") {
      return (
        <ul className="sectionsList">
          {props.sections.map((item, index) => {
            return (
              <li key={index}>
                {" "}
                <NavLink to={`/${item.name}`}> {item.name} </NavLink>{" "}
              </li>
            );
          })}
        </ul>
      );
    }
  }
  return (
    <header>
      <div className="logoContainer">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="rSide">
        <div className="sectionsContainer">{renderSections()}</div>
        <div className="navContainer">
          <button className="nav-entry no-login">
            <PersonOutlineIcon /> Sign in
          </button>
          <button
            onClick={(e) => props.togglePost()}
            className="nav-entry no-store"
          >
            <StorefrontIcon />
            Select Store
          </button>
          <button className="nav-entry cart" onClick={() => props.toggleCart()}>
            <StorefrontIcon /> Cart
          </button>
        </div>
      </div>
    </header>
  );
}
const mapStateToProps = (state) => {
  return {

  };
};
export default connect(mapStateToProps, {})(Header);

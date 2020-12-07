import React, { useMemo } from "react";
import Logo from "../../../media/logo.png";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import "./header.scss";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { Tooltip } from "@material-ui/core";
function Header(props) {
  const { cart } = props;
  const number = useMemo(() => {
    return cart.reduce((acc, item) => (acc += 1 * item.amount), 0);
  }, [cart]);
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, li) => sum + parseInt(li.price), 0);
  }, [cart]);
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
        <Link to={props.store ? "/menu" : "/"}>
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="rSide">
        <div className="sectionsContainer">{renderSections()}</div>
        <div className="navContainer">
          <Tooltip
            className="signInButton"
            title="Accounts not implemented, takes too much for too little return"
          >
            <button className="nav-entry">
              <PersonOutlineIcon /> Sign in
            </button>
          </Tooltip>
          <Link to="/" className="nav-entry">
            <StorefrontIcon />
            {props.store ? props.store.postcode : "Select Store"}
          </Link>
          <button
            className="nav-entry nob cart"
            onClick={() => props.toggleCart()}
          >
            <StorefrontIcon />{" "}
            <span className="cartButton">
              {cartTotal > 0 ? cartTotal + "$" : "Cart"}{" "}
              {number > 0 && <small>{number}</small>}{" "}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
const mapStateToProps = (state) => {
  return {
    store: state.store,
    cart: state.cart,
  };
};
export default connect(mapStateToProps, {})(Header);

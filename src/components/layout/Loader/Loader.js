import React from "react";
import "./loader.scss";
function Loader(props) {
  return (
    <div className={`loaderBox ${props.active === false ? 'active' : ''}`}>
      <div className="loaderInner">
        <div className="lds-hourglass"></div>
        <h3>Loading ... Please wait</h3>
      </div>
    </div>
  );
}
export default Loader;

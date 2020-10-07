import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./pizzagriditem.scss";
import { motion } from "framer-motion";
import { AddToCart } from "../../actions";
function ProdGriditem(props) {
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <motion.div
      animate={{ scale: [0.5, 1] }}
      className={`gridItem ${props.active}`}
      whileHover={{ scale: 1.03 }}
    >
      <div className="gridItemInner">
        <motion.div
          className="prodImageDiv"
          style={{
            backgroundImage: "url(" + props.image + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          animate={{
            borderRadius: ["100%","0%"],
          }}
        ></motion.div>
        <table className="itemData">
          <tbody>
            <tr className="priceName">
              <td> {props.name}</td>
              <td>${props.price}</td>
            </tr>
            <tr className="descBox">
              <td colSpan="2">desc</td>
            </tr>
          </tbody>
        </table>
        <table className="itemOptions">
          <tbody>
            <tr>
              <td>
                <button className="btn orange ">Customize</button>
              </td>
              <td>
                <button
                  className="btn green "
                  onClick={() => props.AddToCart(props.id)}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, { AddToCart })(ProdGriditem);

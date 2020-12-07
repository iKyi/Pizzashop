import React, { useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { AddToCart, RemoveCart } from "../../../actions";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import CloseIcon from "@material-ui/icons/Close";
import "./cart.scss";
import { useHistory } from "react-router-dom";
function Cart(props) {
  const { cart } = props;
  const { store } = props;
  const history = useHistory();
  useEffect(() => {
    const storageStore = JSON.parse(localStorage.getItem("store"));
    if (!storageStore) {
      history.push("/");
    }
    return () => {};
  }, [history]);
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, li) => sum + parseInt(li.price), 0);
  }, [cart]);
  function goToCheck() {
    props.setCartActive(false);
    history.push("/checkout");
  }

  function renderItems() {
    if (cart) {
      return (
        <div className={`cartContainer ${props.active ? "active" : ""}`}>
          <div
            className="cartHeader"
            onClick={() => props.setCartActive(false)}
          >
            <h5>Cart</h5>
            <button>
              <CloseIcon />
            </button>
          </div>
          <ul className="cartListing">
            {cart.map((item, index) => {
              return (
                <li
                  key={index}
                  className="cartEntry"
                  id={`cartItem_${item.id}`}
                >
                  <table>
                    <tbody>
                      <tr>
                        <td className="buttonTd">
                          <button
                            className="btn green"
                            onClick={() => props.AddToCart(item)}
                          >
                            <PlusOneIcon />
                          </button>
                        </td>
                        <td className="middleTD">
                          <div className="innerData">
                            <div className="head">
                              <div className="amount">
                                {item.amount}
                                <small>x</small>{" "}
                              </div>
                              <div className="name">{item.name}</div>
                              <div className="price">
                                {" "}
                                - <small>{item.price}$</small>
                              </div>
                            </div>
                            <div className="foot">{item.type}</div>
                          </div>
                        </td>
                        <td className="buttonTd">
                          <button
                            className="btn red"
                            onClick={() => props.RemoveCart(item.id)}
                          >
                            <ExposureNeg1Icon />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              );
            })}
          </ul>
          {cartTotal > 0 && (
            <div className="cartFooter">
              <div className="totalBox">
                <span>Total:</span>
                <span>{cartTotal}$</span>
              </div>
              {cartTotal < store.minSpend && (
                <div className="minSpendBox">
                  {(store.minSpend - cartTotal).toFixed(2)}$ below minimum
                  spending amount.
                </div>
              )}

              <div
                className={`proceedBox ${
                  cartTotal < props.store.minSpend ? "inactive" : ""
                }`}
              >
                <button onClick={(e) => goToCheck()} className="btn green">
                  Checkout !
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
  return <div>{renderItems()}</div>;
}
const mapStateToProps = (state) => {
  return {
    store: state.store,
    cart: state.cart,
  };
};
export default connect(mapStateToProps, { AddToCart, RemoveCart })(Cart);

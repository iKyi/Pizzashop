import React, { useMemo } from "react";
import { connect } from "react-redux";
import { AddToCart, RemoveCart } from "../../actions";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
const Checkout = (props) => {
  const { cart } = props;
  const { store } = props;
  const { sizes } = props;
  const { crusts } = props;
  const { dips } = props;

  const postcode = useMemo(() => {
    return store && store.postcode ? store.postcode : "noValue";
  }, [store]);

  const city = useMemo(() => {
    return store && store.city ? store.city : "noValue";
  }, [store]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, li) => sum + parseInt(li.price), 0);
  }, [cart]);
  return (
    <div className="container checkoutPage">
      <h1>Checkout</h1>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          <table className="checktable">
            <tbody>
              <tr>
                <td colSpan="2">
                  <h4>Contact information</h4>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <TextField
                    label="Phone No."
                    variant="outlined"
                    defaultValue="073333333"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <h4>Delivery information</h4>
                </td>
              </tr>
              <tr>
                <td colSpan="1">
                  <TextField
                    label="First Name"
                    variant="outlined"
                    defaultValue="Steve"
                    disabled
                  />
                </td>
                <td colSpan="1">
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    defaultValue="Stevenson"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <TextField
                    label="Address"
                    variant="outlined"
                    defaultValue="8th Downing Street"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <TextField
                    label="Appartment / Suite etc. (optional)"
                    variant="outlined"
                    defaultValue="Ap. 8, Floor 2"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    label="Postcode"
                    variant="outlined"
                    value={postcode}
                    disabled
                  />
                </td>
                <td>
                  <TextField
                    label="City"
                    variant="outlined"
                    value={city}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div className="totalBox">Total: {cartTotal}$</div>
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <Link
                    to="/thankyou"
                    className={`btn green tyButton ${
                      cart.length === 0 ? "disabled" : ""
                    } `}
                  >
                    Finish
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6">
          {cart && cart.length > 0 ? (
            <ul className="checkCart">
              {cart.map((item, index) => {
                return (
                  <li key={index}>
                    <div className="amount">
                      {item.amount} <small>x</small>{" "}
                    </div>
                    <div className="name">
                      <h6>{item.name}</h6>
                    </div>
                    <div className="price">
                      {" "}
                      <small>-</small> {item.price}$
                    </div>
                    {item.crust !== null ||
                    item.size !== null ||
                    item.dip !== null ||
                    item.toppings !== null ? (
                      <div className="detail">
                        {dips.length > 0 && item.dip ? (
                          <div className="sizeEntry">
                            Free Dip: {dips[item.dip].name}
                          </div>
                        ) : null}
                        {sizes.length > 0 && item.size ? (
                          <div className="sizeEntry">
                            > {sizes[item.size].name}
                          </div>
                        ) : null}
                        {crusts.length > 0 && item.crust ? (
                          <div className="crustEntry">
                            > {crusts[item.crust].name}
                          </div>
                        ) : null}
                        {item.toppings &&
                          item.toppings.map((topping, index) => {
                            return <div key={index}> + {topping} </div>;
                          })}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Your basket is empty ...</p>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    crusts: state.crusts,
    sizes: state.sizes,
    toppings: state.toppings,
    dips: state.dips,
    store: state.store,
    cart: state.cart,
  };
};
export default connect(mapStateToProps, { AddToCart, RemoveCart })(Checkout);

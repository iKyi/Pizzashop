import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { AddToCart } from "../../../../../actions";
import { useToasts } from "react-toast-notifications";
import CloseIcon from "@material-ui/icons/Close";
function CustomizePizza(props) {
  const { product } = props;
  const [visible, setVisible] = useState(false);
  const [selectedT, setT] = useState([]);
  const [crust, setCrust] = useState(3);
  const [size, setSize] = useState(1);
  const [dip, setDip] = useState(0);
  const { basePrice } = props.product || 0;
  const [qty, setQty] = useState(1);
  const history = useHistory();
  const { sizes } = props;
  const { toppings } = props;
  const { crusts } = props;
  const { dips } = props;
  const { addToast } = useToasts();
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => {};
  }, []);
  function addTopping(topping) {
    var current = _.cloneDeep(selectedT);
    if (current.includes(topping)) {
      current = current.filter((item) => item !== topping);
      setT(current);
    } else {
      current.push(topping);
      setT(current);
    }
  }
  const totalprice = useMemo(() => {
    let total = 0;
    total += basePrice;
    const multiplier = sizes[size] ? sizes[size].multiplier : 1;
    total = total * multiplier;
    if (selectedT) {
      selectedT.map((selected) => {
        total += toppings.find((item) => item.name === selected).adder;
        return null;
      });
    }
    total = total * qty;
    return total.toFixed(2);
  }, [basePrice, selectedT, size, qty, toppings, sizes]);
  const cartadd = (pricee) => {
    let prodSend = {
      id: product.id,
      name: product.name,
      amount: qty,
      singlePrice: pricee / qty,
      price: pricee,
      size: product.type === "pizza" ? size : null,
      crust: product.type === "pizza" ? crust : null,
      toppings: selectedT || null,
      dip: product.type === "side" ? dip : null,
    };
    props.AddToCart(prodSend);

    addToast(
      (prodSend.size && props.sizes
        ? props.sizes[prodSend.size].name + " "
        : "") +
        prodSend.name +
        " added to basket",
      {
        appearance: "success",
        autoDismiss: true,
      }
    );
  };
  function closeCust() {
    setVisible(false);
    setTimeout(() => {
      history.push("/menu");
    }, 300);
  }
  function closeAdd(price) {
    cartadd(price);
    closeCust();
  }
  if (product) {
    return (
      <>
        <div
          onClick={(e) => {
            e.target.classList.contains("overlay") && closeCust();
          }}
          className={`overlay ${visible ? "active" : ""}`}
        >
          <div className="custInner">
            <div
              className={`header ${product.type}`}
              style={{ background: `url(/${product.image})` }}
            >
              <button className="closeDialog" onClick={(e) => closeCust()}>
                <CloseIcon />
              </button>
            </div>
            <div className="body">
              <h3 className="title">{product.name}</h3>
              <p className="desc">{product.description}</p>
              {product.type === "pizza" && (
                <div className="section">
                  <h4 className="sTitle">Size</h4>
                  <select
                    value={size}
                    name="sizeSelector"
                    id="sizeSelector"
                    onChange={(e) => setSize(e.target.value)}
                  >
                    {sizes &&
                      sizes.map((item, index) => {
                        return (
                          <option key={index} value={index}>
                            {item.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}
              {crusts && product.type === "pizza" && (
                <div className="section">
                  <h4 className="sTitle">Crust</h4>
                  <div className="crustsList">
                    {crusts.map((crust, index) => {
                      return (
                        <label
                          htmlFor={crust.name}
                          className="crustEntry"
                          key={index}
                        >
                          <input
                            id={crust.name}
                            type="radio"
                            name="crustSelectors"
                            value={index}
                            defaultChecked={index === 3 ? true : false}
                            onChange={(e) => setCrust(e.target.value)}
                          />
                          <div className="inner">
                            <div className="name">{crust.name}</div>
                            <div className="desc">{crust.description}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
              {product.type === "side" && (
                <div className="section">
                  <h4 className="sTitle">Select free dip</h4>
                  <div className="dipOptions">
                    {dips.map((dipp, index) => {
                      return (
                        <label
                          htmlFor={dipp.name}
                          className="dipEntry"
                          key={index}
                        >
                          <input
                            id={dipp.name}
                            type="radio"
                            name="dipSelectors"
                            value={index}
                            defaultChecked={index === 3 ? true : false}
                            onChange={(e) => setDip(e.target.value)}
                          />
                          <div className="inner">
                            <div
                              className="image"
                              style={{ background: `url('/${dipp.image}')` }}
                            ></div>
                            <div className="name">{dipp.name}</div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
              {dips && product.type === "pizza" && (
                <div className="section">
                  <h4 className="sTitle">
                    Extra Toppings ? <small>+ $1.40 each</small>
                  </h4>
                  <ul className="toppingList">
                    {props.toppings &&
                      props.toppings.map((topping, index) => {
                        return (
                          <li key={index}>
                            <button
                              onClick={(e) => addTopping(topping.name)}
                              className={`toppingButton ${
                                selectedT.includes(topping.name) ? "active" : ""
                              }`}
                            >
                              <div>{topping.name}</div>
                              <i
                                className={`picon ${topping.name.replace(
                                  new RegExp(" ", "g"),
                                  ""
                                )}`}
                              ></i>
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )}
            </div>
            <div className="footer">
              <div className="lSide">
                <button
                  className="minus"
                  disabled={qty === 1 ? true : false}
                  onClick={(e) => {
                    let value = qty > 1 ? qty - 1 : 1;
                    setQty(value);
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <button
                  className="plus"
                  onClick={(e) => {
                    let current = qty + 1;
                    setQty(current);
                  }}
                >
                  +
                </button>
              </div>
              <div className="rSide">
                <button onClick={(e) => closeAdd(totalprice)}>
                  Add to Basket - {totalprice}$
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
}
const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.item);
  return {
    product: state.products.find((item) => item.id === id),
    crusts: state.crusts,
    toppings: state.toppings,
    sizes: state.sizes,
    dips: state.dips,
  };
};
export default connect(mapStateToProps, { AddToCart })(CustomizePizza);

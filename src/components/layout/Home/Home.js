import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, useRouteMatch } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import "./home.scss";
import { setCart } from "../../../actions";
import CustomizePizza from "./items/CustomizePizza/CustomizePizza";
import ProductEntry from "./items/ProductEntry/ProductEntry";
import Floatmenu from "./FloatMenu/Floatmenu";
function Home(props) {
  const match = useRouteMatch();
  const [floaty, setFloaty] = useState(false);
  const { setCart } = props;
  useEffect(() => {
    setCart();
    return () => {};
  }, [setCart]);
  const { products, psizes } = props;
  function renderContent(filter = null) {
    if (!products || !psizes) {
      return null;
    }
    var arePizzas = false;
    var areSides = false;
    var areBurgers = false;
    var areDrinks = false;
    var areDesserts = false;
    var data = products.map((product, index) => {
      if (product.type === "pizza") {
        const obj = <ProductEntry key={index} data={product} sizes={psizes}  timing={index} />;
        const title = (
          <h2 key={`title${index}`} className="sectionTitle" id="pizzas">
            Pizzas
          </h2>
        );
        if (arePizzas === false) {
          arePizzas = true;
          return [title, obj];
        }
        return obj;
      }
      if (product.type === "side") {
        const obj = (
          <ProductEntry key={index} data={product} dips={props.dips}   timing={index}/>
        );
        const title = (
          <h2 key={`title${index}`} className="sectionTitle" id="sides">
            Sides
          </h2>
        );
        if (areSides === false) {
          areSides = true;
          return [title, obj];
        }
        return obj;
      }
      if (product.type === "dessert") {
        const obj = <ProductEntry key={index} data={product}   timing={index}/>;
        const title = (
          <h2 key={`title${index}`} className="sectionTitle" id="desserts">
            Desserts
          </h2>
        );
        if (areDesserts === false) {
          areDesserts = true;
          return [title, obj];
        }
        return obj;
      }
      if (product.type === "burger") {
        const obj = <ProductEntry key={index} data={product}  timing={index} />;
        const title = (
          <h2 key={`title${index}`} className="sectionTitle" id="burgers">
            Burgers
          </h2>
        );
        if (areBurgers === false) {
          areBurgers = true;
          return [title, obj];
        }
        return obj;
      }
      if (product.type === "drink") {
        const obj = <ProductEntry key={index} data={product}  timing={index} />;
        const title = (
          <h2 key={`title${index}`} className="sectionTitle" id="drinks">
            Drinks
          </h2>
        );
        if (areDrinks === false) {
          areDrinks = true;
          return [title, obj];
        }
        return obj;
      }
      return null;
    });
    return data;
  }

  useScrollPosition(({ prevPos, currPos }) => {
    const value = currPos.y > prevPos.y;
    setFloaty(value);
  });

  return (
    <>
      <div className="container-fluid p-0">
        <Floatmenu floating={floaty} products={products} />
        <div className="container p-0">
          <div className="prodRow">{renderContent()}</div>
        </div>
      </div>
      <Route path={match.url + `/customize/:item`} component={CustomizePizza} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    dips: state.dips,
    products: state.products,
    psizes: state.sizes,
  };
};
export default connect(mapStateToProps, { setCart })(Home);

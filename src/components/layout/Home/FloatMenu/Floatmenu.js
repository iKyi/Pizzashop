import React from "react";

const Floatmenu = (props) => {
  const { products } = props;
  const { floating } = props;
  return (
    <div className={`floatMenu ${floating ? "fixed" : ""}`}>
      {products.find((item) => item.type === "pizza") && (
        <a href="#pizzas">Pizzas</a>
      )}
      {products.find((item) => item.type === "burger") && (
        <a href="#burgers">Burgers</a>
      )}
      {products.find((item) => item.type === "side") && (
        <a href="#sides">Sides</a>
      )}
      {products.find((item) => item.type === "dessert") && (
        <a href="#desserts">Desserts</a>
      )}
      {products.find((item) => item.type === "drink") && (
        <a href="#drinks">Drinks</a>
      )}
    </div>
  );
};

export default Floatmenu;

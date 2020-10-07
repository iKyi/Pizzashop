import React from "react";

function PizzaEntry(props) {
  const {
    name,
    image,
    basePrice,
    vegan,
    vegetarian,
    description,
    glutenFree,
  } = props.data;
  var prodType = props.data.type;

  function triggerModal(e) {
    e.preventDefault();
    e.stopPropagation();
    var elem = e.target;
    var classes = elem.classList;
    if (classes.contains("addButton")) {
      console.log("button pressed");
    } else {
      console.log("modal triggered");
    }
  }
  return (
    <div
      onClick={(e) => triggerModal(e)}
      className="pizzaEntry"
      data-type={prodType}
    >
      <div className="EntryInner">
        <div className="imageCont">
          <div className="image" style={{ background: `url(${image})` }}></div>
        </div>
        <div className="body">
          <h3 className="title">{name}</h3>
          <h6 className="desc">{description}</h6>
          <button className="addButton">Add - {basePrice}</button>
        </div>
      </div>
    </div>
  );
}

export default PizzaEntry;

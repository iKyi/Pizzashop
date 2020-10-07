import React from "react";
import "./home.scss";
import PizzaEntry from "./items/pizzaEntry/PizzaEntry";
function Home(props) {
  const testobj = {
    products: {
      iv: [
        {
          name: "Senses Assault",
          type: "pizza",
          description: "Senses Assault desc text",
          basePrice: 12,
          image: "images/senses_asssault.png",
          vegan: true,
          vegetarian: false,
          glutenFree: false,
        },
        {
          name: "BBQ Chicken",
          type: "pizza",
          description: "desc desc",
          basePrice: 13,
          image: "images/bbq_chicken.png",
          vegan: false,
          vegetarian: false,
          glutenFree: false,
        },
        {
          name: "Classic Light",
          type: "pizza",
          description: "desc",
          basePrice: 11,
          image: "images/classic_light.png",
          vegan: null,
          vegetarian: null,
          glutenFree: null,
        },
        {
          name: "Everything Included",
          type: "pizza",
          description: "desc desc",
          basePrice: 15,
          image: "images/everything_included.png",
          vegan: null,
          vegetarian: null,
          glutenFree: null,
        },
        {
          name: "Full Spectrum",
          type: "pizza",
          description: "desc desc",
          basePrice: 13,
          image: "images/full_spectrum.png",
          vegan: false,
          vegetarian: false,
          glutenFree: true,
        },
        {
          name: "Light Hawaiian",
          type: "pizza",
          description: "desc desc",
          basePrice: 13,
          image: null,
          vegan: true,
          vegetarian: true,
          glutenFree: true,
        },
        {
          name: "Mediteranean",
          type: "pizza",
          description: "desc desc",
          basePrice: 12,
          image: "images/Mediteranean.png",
          vegan: true,
          vegetarian: true,
          glutenFree: false,
        },
        {
          name: "Olive Insanity",
          type: "pizza",
          description: "desc desc",
          basePrice: 13,
          image: "images/olive_insanity.png",
          vegan: true,
          vegetarian: true,
          glutenFree: true,
        },
        {
          name: "Onion Intense",
          type: "pizza",
          description: "Onion Intense desc",
          basePrice: 13,
          image: "images/onion_intense.png",
          vegan: true,
          vegetarian: true,
          glutenFree: true,
        },
      ],
    },
    crustVariants: {
      iv: [
        {
          name: "Cheesy Pan Crust",
          description:
            "Our original Pan Pizza finished with a cheese sprinkle baked on to the crust",
          multiplier: 1.2,
        },
        {
          name: "Pan",
          description: "Our famously delicious thick-crust pizza",
          multiplier: 1.1,
        },
        {
          name: "Stuffed Crust",
          description: "Our iconic crust, filled with delicious mozzarella",
          multiplier: 1.35,
        },
        {
          name: "Classic Crust",
          description: " A thin base with a thick crust and Garlic Sprinkles",
          multiplier: 1,
        },
        {
          name: "Classic Crust Without Garlic",
          description: "A thin base with a tasty thick crust",
          multiplier: 0.95,
        },
        {
          name: "Gluten-Free",
          description: "A light, square gluten-free dough",
          multiplier: 0.9,
        },
      ],
    },
    toppings: {
      iv: [
        {
          name: "Smoked Bacon",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Triple Cheese Blend",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Chicken",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Ham",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Pepperoni",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Seasoned Minced Beef",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Spicy Pork",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Green Chillies",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Jalapeños",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Mixed Peppers",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Mushrooms",
          imageurl: null,
          adder: null,
        },
        {
          name: "Pineapple",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Red Onions",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Sliced Black Olives",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Sweetcorn",
          imageurl: null,
          adder: 1.4,
        },
        {
          name: "Tomato",
          imageurl: null,
          adder: 1.4,
        },
      ],
    },
    pizzaSizes: {
      iv: [
        {
          name: "Small",
          multiplier: 0.85,
        },
        {
          name: "Medium",
          multiplier: 1,
        },
        {
          name: "Large",
          multiplier: 1.5,
        },
      ],
    },
    dips: {
      iv: [
        {
          name: "Garlic Dip",
          image: null,
        },
        {
          name: "Sweet Chilli Dip",
          image: null,
        },
        {
          name: "Sour Cream & Chive Dip",
          image: null,
        },
        {
          name: "BBQ Dip",
          image: null,
        },
        {
          name: "Hot Dip",
          image: null,
        },
      ],
    },
  };
  //console.log(testobj);
  const products = testobj.products.iv;
  const pizzas = products.filter((item) => item.type === "pizza");
  
  const PizzaList = ({pizzaList}) => pizzaList.map((pizza, index) =>
      <PizzaEntry key={index} data={pizza} />
    );
  
  const PizzaView = () =>
      <>
        <h2 className="sectionTitle" id="pizzas">
          Pizzas
        </h2>
        <PizzaList
            pizzaList={pizzas}
        />
      </>
  
  
  return (
    <div className="container-fluid p-0">
      <div className="container p-0">
        <div className="prodRow">
          <PizzaView/>
        </div>
      </div>
    </div>
  );
}
export default Home;

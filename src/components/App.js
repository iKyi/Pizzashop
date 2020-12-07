import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./bootstrap-grid.min.css";
import "./App.scss";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Home from "../components/layout/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "../components/layout/Cart";
import { fetchData, SetStore } from "../actions/index";
import Loader from "./layout/Loader/Loader";
import StoreFinder from "./layout/StoreFinder/StoreFinder";
import { ToastProvider } from "react-toast-notifications";
import Checkout from "./Checkout";
import IntroModal from "./IntroModal/IntroModal";
import { setCart } from "../actions";
import ThankYou from "./layout/ThankYou";
const testobj = {
  products: {
    iv: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
        name: "Classic Light",
        type: "pizza",
        description: "desc",
        basePrice: 11,
        image: "images/classic_light.png",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
      },
      {
        id: 4,
        name: "Everything Included",
        type: "pizza",
        description: "desc desc",
        basePrice: 15,
        image: "images/everything_included.png",
        vegan: false,
        vegetarian: true,
        glutenFree: false,
      },
      {
        id: 5,
        name: "Full Spectrum",
        type: "pizza",
        description: "desc desc",
        basePrice: 13,
        image: "images/full_spectrum.png",
        vegan: true,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 6,
        name: "Light Hawaiian",
        type: "pizza",
        description: "desc desc",
        basePrice: 13,
        image: "images/light_hawaiian.png",
        vegan: true,
        vegetarian: false,
        glutenFree: true,
      },
      {
        id: 7,
        name: "Mediteranean",
        type: "pizza",
        description: "desc desc",
        basePrice: 12,
        image: "images/Mediteranean.png",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 8,
        name: "Olive Insanity",
        type: "pizza",
        description: "desc desc",
        basePrice: 13,
        image: "images/olive_insanity.png",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 9,
        name: "Onion Intense",
        type: "pizza",
        description: "Onion Intense desc",
        basePrice: 13,
        image: "images/onion_intense.png",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
      },
      {
        id: 10,
        name: "Useless Vegan Burger",
        type: "burger",
        description: "This has literally no taste",
        basePrice: 8,
        image: "images/10.png",
        vegan: null,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 11,
        name: "Double Bazoogle",
        type: "burger",
        description: "One big thing with twoo small things inside",
        basePrice: 14,
        image: "images/11.png",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 12,
        name: "Lazy Sunday",
        type: "burger",
        description: "This makes sure you aren't leaving the house today",
        basePrice: 14,
        image: "images/12.png",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 13,
        name: "Saladchicken with salad and chicken",
        type: "burger",
        description:
          "Features salad and chicken, sometimes fried, sometimes deep fried",
        basePrice: 9,
        image: "images/13.png",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 14,
        name: "Artery Destroyer",
        type: "burger",
        description: "This comes with a free heart checkup",
        basePrice: 15,
        image: "images/14.png",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 15,
        name: "Modest tasty boi",
        type: "burger",
        description: "Nothing special to see here",
        basePrice: 8,
        image: "images/15.png",
        vegan: false,
        vegetarian: true,
        glutenFree: false,
      },
      {
        id: 16,
        name: "Diabeetus Skyscraper",
        type: "burger",
        description:
          "They say that one person once ate this in only one sitting, and that person is now deceased",
        basePrice: 18,
        image: "images/16.png",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 17,
        name: "Meaty Gluten Free",
        type: "burger",
        description: "Doesn't have gluten but has everything else",
        basePrice: 11,
        image: "images/17.png",
        vegan: false,
        vegetarian: false,
        glutenFree: true,
      },
      {
        id: 18,
        name: "Vegatarian Callorie Bomb",
        type: "burger",
        description: "You would think this is healthy but it ain't",
        basePrice: 7,
        image: "images/18.png",
        vegan: false,
        vegetarian: true,
        glutenFree: false,
      },
      {
        id: 19,
        name: "Doritoes Nachos",
        type: "side",
        description:
          "Single portion of Doritos Lightly Salted Tortilla Chips, served warm with melted cheese, tangy salsa and jalapeños. Best served with a sour cream & chive dip",
        basePrice: 4.99,
        image: "images/doritoes_nachos.jpg",
        vegan: true,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 20,
        name: "Breaded Chicken Strips (5 strips)",
        type: "side",
        description:
          "Strips of succulent chicken breast marinated then coated with crispy breadcrumbs",
        basePrice: 5.99,
        image: "images/chicken_strips.jpg",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 21,
        name: "Breaded Chicken Strips (5 strips)",
        type: "side",
        description:
          "A delicious cheese and garlic folded pizza bread cut into strips. Perfect for tearing and sharing",
        basePrice: 7.49,
        image: "images/cheesy_garlic.jpg",
        vegan: false,
        vegetarian: true,
        glutenFree: false,
      },
      {
        id: 22,
        name: "BBQ Chicken Wings (7 wings)",
        type: "side",
        description: "Succulent chicken wings coated with Texan barbecue sauce",
        basePrice: 4.99,
        image: "images/bbq_wings.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 23,
        name: "Hot 'N' Spicy Chicken Strips (8 Strips)",
        type: "side",
        description: "Chicken breast strips coated in unique spicy breadcrumbs",
        basePrice: 4.99,
        image: "images/chicken_strips2.jpg",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
      },
      {
        id: 24,
        name: "Potato Wedges",
        type: "side",
        description: "Chunky potato chunks covered in a light seasoning",
        basePrice: 4.99,
        image: "images/potato_wedges.jpg",
        vegan: false,
        vegetarian: true,
        glutenFree: false,
      },
      {
        id: 25,
        name: "Ace 1L",
        type: "drink",
        description: "Purifies your insides both physically and spiritually",
        basePrice: 1.99,
        image: "images/ace.png",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 26,
        name: "Spirtus",
        type: "drink",
        description: "Great for cleaning wounds and rust",
        basePrice: 1.99,
        image: "images/spirtus.webp",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 27,
        name: "Brawndo",
        type: "drink",
        description: "If you don't know what this is, you should find out",
        basePrice: 1.99,
        image: "images/brawndo.png",
        vegan: null,
        vegetarian: null,
        glutenFree: null,
      },
      {
        id: 28,
        name: "Tide Pods",
        type: "dessert",
        description: "Smooth tasty Tide Pods",
        basePrice: 4.99,
        image: "images/tide_pods.jpg",
        vegan: true,
        vegetarian: true,
        glutenFree: true,
      },
      {
        id: 29,
        name: "Ariel Pods",
        type: "dessert",
        description: "Same as Tide pods, but green",
        basePrice: 4.99,
        image: "images/ariel_pods.jpg",
        vegan: true,
        vegetarian: true,
        glutenFree: true,
      },
      {
        id: 30,
        name: "Chair",
        type: "dessert",
        description: "You can sit and eat",
        basePrice: 4.99,
        image: "images/chair.png",
        vegan: true,
        vegetarian: true,
        glutenFree: true,
      },
    ],
  },
  crustVariants: {
    iv: [
      {
        id: null,
        name: "Cheesy Pan Crust",
        description:
          "Our original Pan Pizza finished with a cheese sprinkle baked on to the crust",
        multiplier: 1.2,
      },
      {
        id: null,
        name: "Pan",
        description: "Our famously delicious thick-crust pizza",
        multiplier: 1.1,
      },
      {
        id: null,
        name: "Stuffed Crust",
        description: "Our iconic crust, filled with delicious mozzarella",
        multiplier: 1.35,
      },
      {
        id: null,
        name: "Classic Crust",
        description: " A thin base with a thick crust and Garlic Sprinkles",
        multiplier: 1,
      },
      {
        id: null,
        name: "Classic Crust Without Garlic",
        description: "A thin base with a tasty thick crust",
        multiplier: 0.95,
      },
      {
        id: null,
        name: "Gluten-Free",
        description: "A light, square gluten-free dough",
        multiplier: 0.9,
      },
    ],
  },
  toppings: {
    iv: [
      {
        id: null,
        name: "Smoked Bacon",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Triple Cheese Blend",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Chicken",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Ham",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Pepperoni",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Seasoned Minced Beef",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Spicy Pork",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Green Chillies",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Jalapeños",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Mixed Peppers",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Mushrooms",
        imageurl: null,
        adder: null,
      },
      {
        id: null,
        name: "Pineapple",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Red Onions",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Sliced Black Olives",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
        name: "Sweetcorn",
        imageurl: null,
        adder: 1.4,
      },
      {
        id: null,
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
        id: 0,
        name: "Garlic Dip",
        image: "dips/0.svg",
      },
      {
        id: null,
        name: "Sweet Chilli Dip",
        image: "dips/1.svg",
      },
      {
        id: null,
        name: "Sour Cream & Chive Dip",
        image: "dips/2.svg",
      },
      {
        id: null,
        name: "BBQ Dip",
        image: "dips/3.svg",
      },
      {
        id: null,
        name: "Hot Dip",
        image: "dips/4.svg",
      },
    ],
  },
};
function App(props) {
  const [cartActive, setCartActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState(false);
  const { setCart } = props;
  const { SetStore, fetchData } = props;
  useEffect(() => {
    const storagestore = JSON.parse(localStorage.getItem("store"));
    SetStore(storagestore);
    fetchData(testobj).then((resp) => {
      if (resp) {
        setLoaded(true);
      }
    });
    return () => {};
  }, [SetStore, fetchData]);
  useEffect(() => {
    setCart();
    return () => {};
  }, [setCart]);
  /// ends here
  function toggleCart() {
    setCartActive(!cartActive);
  }
  return (
    <ToastProvider placement="bottom-left">
      <div className="App">
        <Router>
          <Header toggleCart={toggleCart} />
          <Cart active={cartActive} setCartActive={setCartActive} />
          <Switch>
            <Route path="/menu">
              <Home store={props.store} />
            </Route>
            <Route exact path="/">
              <StoreFinder />
            </Route>
            <Route path="/checkout">
              <Checkout setCartActive={setCartActive} />
            </Route>
            <Route path="/thankyou">
              <ThankYou />
            </Route>
          </Switch>
        </Router>
        <Footer />
        <Loader active={loaded} />
      </div>
      <IntroModal />
    </ToastProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    store: state.store,
    products: state.products,
  };
};
export default connect(mapStateToProps, { fetchData, SetStore, setCart })(App);

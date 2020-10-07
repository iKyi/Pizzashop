import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./bootstrap-grid.min.css";
import "./App.scss";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Home from "../components/layout/Home";
import PostCode from "./layout/header/sub/postcode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "../components/layout/Cart";
import { fetchData } from "../actions/index";
import Loader from "./layout/Loader/Loader";
function App(props) {
  const [cartActive, setCart] = useState(false);
  const [post, setPost] = useState(false);
  const [wHeight, setHeight] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    return () => {};
  }, [cartActive]);
  /// mount piece starts here
  useEffect(() => {
    // Promise.resolve(props.fetchData()).then((resp) => {
    //   if (resp) {
    //     setLoaded(true);
    //   } else {
    //     setError(true);
    //   }
    // });
    return () => {};
  }, []);
  /// ends here
  function toggleCart() {
    setCart(!cartActive);
  }
  function togglePost() {
    setPost(!post);
  }
  function getHeight() {
    let WH = window.innerHeight;
    return WH;
  }
  window.onload = function () {
    setHeight(getHeight());
  };
  window.onresize = function () {
    setHeight(getHeight());
  };
  return (
    <div className="App" style={{ minHeight: wHeight }}>
      <Router>
        <Header toggleCart={toggleCart} togglePost={togglePost} />
        <Cart active={cartActive} toggleCart={toggleCart} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      {post && <PostCode togglePost={togglePost} />}
      <Footer />
      <Loader active={loaded} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    crusts: state.crusts,
    products: state.products,
    toppings: state.toppings,
    dips: state.dips,
    sizes: state.sizes
  };
};
export default connect(mapStateToProps, { fetchData })(App);

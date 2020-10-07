import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductGridItem from "../../prodGridItem";
import _ from "lodash";
function Section(props) {
  const [filters, setFilter] = useState([]);
  const [visible, setVisible] = useState(false);
  function setFilters(filter) {
    var newfilters = _.cloneDeep(filters);
    if (filter === 0) {
      newfilters = [];
    } else if (!newfilters.includes(filter)) {
      newfilters.push(filter);
    } else {
      for (var i = newfilters.length - 1; i >= 0; i--) {
        if (newfilters[i] === filter) {
          newfilters.splice(i, 1);
        }
      }
    }
    console.log(newfilters);
    setFilter(newfilters);
  }
  useEffect(() => {

    return () => {
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 300);
    return () => {
      setVisible(false);

      // eslint-disable-next-line
    };
  }, [props.name]);
useEffect(() => {
    
    return () => {
        
    }
}, [filters])
  function renderFilters() {
    if (props.products.length > 0) {
      var filterss = [];
      props.products.map((item) => {
        if (!filterss.includes(item.subtype)) {
          filterss.push(item.subtype);
        }
        return false;
      });
      return (
        <div className="filtersBox">
          <h5>Filters:</h5>
          <ul>
            {filterss.map((item, index) => {
              return (
                <li
                  key={index}
                  className={filters.includes(item) ? "active" : ""}
                >
                  <button
                    className="filterEntry"
                    onClick={() => setFilters(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
            <li>
              <button className="clearButton" onClick={() => setFilters(0)}>
                Clear
              </button>
            </li>
          </ul>
        </div>
      );
    }
  }
  function renderProducts() {
    if (props.products.length > 0) {
      return (
        <div className="itemGrid">
          {props.products.map((item, index) => {
            return (
              <ProductGridItem
                active={`${
                  filters.length === 0 || filters.includes(item.subtype)
                    ? "active"
                    : ""
                }`}
                image={item.image}
                key={index}
                name={item.name + ' ' +index}
                price={item.price}
                id={item.id}
              />
            );
          })}
        </div>
      );
    }
  }
  return (
    <div
      className={`Section ${visible ? "active" : ""}`}
    >
      <h1 className="sectionName">
        <span>{props.name}</span>
      </h1>
      <div className="container">
        <div className="row no-gutters">
          <div className="col-12 col-sm-12 col-md-2 col-lg-2">
            {renderFilters()}
          </div>
          <div className="col-12 col-sm-12 col-md-10 col-lg-10">
            {renderProducts()}
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
export default connect(mapStateToProps, {  })(Section);

import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { SetStore } from "../../../actions/index";
import StoreEntry from "./StoreEntry";
import StoreSmallEntry from "./StoreSmallEntry";
import { useHistory, Link } from "react-router-dom";
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function StoreFinder(props) {
  const history = useHistory();
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState("");
  const [returnedData, setReturned] = useState(null);
  const [nearest, setNearest] = useState([]);
  useEffect(() => {
    renderSugData(selected);
    return () => {};
    // eslint-disable-next-line
  }, [selected]);
  const searchSuggestions = async (term) => {
    if (term.length >= 2) {
      await axios
        .get("https://api.postcodes.io/postcodes/" + term + "/autocomplete")
        .then((response) => {
          if (response.data.result && response.data.result.length > 0) {
            setSuggestions(response.data.result);
          } else {
            setSuggestions(null);
          }
        });
    } else {
      setSuggestions(null);
    }
  };
  async function renderSugData(suggestion) {
    const thisSuggestion = suggestion;
    if (thisSuggestion) {
      const response = await axios
        .get("https://api.postcodes.io/postcodes/" + thisSuggestion)
        .then((response) => {
          return response;
        });
      const store = {
        name:
          response.data.result.region ||
          response.data.result.parliamentary_constituency + " Store",
        minSpend: "9.99",
        dFee: "1.49",
        postcode: response.data.result.postcode,
        city: response.data.result.nuts,
      };
      setReturned(store);
      getNearst(thisSuggestion);
      //return data;
      return null;
    }
  }
  async function getNearst(postcode) {
    if (postcode) {
      const response = await axios
        .get("https://api.postcodes.io/postcodes/" + postcode + "/nearest")
        .then((response) => {
          return response;
        });
      if (response.data.result.length > 0) {
        const locations = response.data.result.map((location) => {
          const item = {
            name:
              location.region || location.parliamentary_constituency + " Store",
            minSpend: getRndInteger(6, 16) + ".99",
            dFee: getRndInteger(1, 4) + ".49",
            postcode: location.postcode,
            city: location.nuts,
          };
          return item;
        });
        setNearest(locations);
      }
    }
  }
  const renderSuggestions = () => {
    if (suggestions) {
      return suggestions.map((item, index) => {
        return (
          <li key={index}>
            <button
              onClick={(e) => {
                setSelected(item);
                setSuggestions(null);
              }}
            >
              {" "}
              {item}
            </button>
          </li>
        );
      });
    }
  };
  function renderNearest() {
    if (!nearest) {
      return null;
    }
    const items = nearest.map((location, index) => {
      return (
        <StoreSmallEntry
          key={index}
          selectStore={selectStore}
          data={location}
        />
      );
    });
    const title = (
      <h6 className="otherStores" key="00023">
        Other stores in your area:
      </h6>
    );
    return [title, items];
  }
  function selectStore(event, store) {
    event.preventDefault();
    setSuggestions(null);
    props.SetStore(store);
    if (store) {
      history.push('/menu');
    }
  }
  if (!props.store) {
    return (
      <div className="storeFinderBox">
        <h2>Find a store near you !</h2>
        <div className="autoCompleteBox">
          <input
            type="text"
            className="autocompleteInput"
            onInput={(e) => searchSuggestions(e.target.value)}
            placeholder="Start typing your postcode ... Ex: 'MK'"
          />
          <ul className="options">{renderSuggestions()}</ul>
        </div>
        <div className="resultsRow">
          {returnedData ? (
            <StoreEntry data={returnedData} selectStore={selectStore} />
          ) : null}
          {nearest.length > 0 ? renderNearest() : null}
        </div>
      </div>
    );
  } else {
    const { store } = props;
    return (
      <div className="storeFinderBox">
        <h5 className="CurrstoreTitle">Your current store</h5>
        {<StoreEntry data={store} selectStore={selectStore} selected={true} />}
        <Link to="/menu" className="btn green big startOrderingBtn">
          Start Ordering
        </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    store: state.store,
  };
};
export default connect(mapStateToProps, { SetStore })(StoreFinder);

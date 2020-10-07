import React, { useState } from "react";
import _ from "lodash";
import axios from "axios";
import "./style.scss";
function Postcode(props) {
  const [results, setResults] = useState([]);
  const [postcode, setPostcode] = useState(null);
  function searchby(val) {
    axios
      .get("https://api.postcodes.io/postcodes/" + val + "/autocomplete")
      .then((response) => {
        if (response.data.result && response.data.result.length > 0) {
          setResults(response.data.result);
        } else {
          setResults(null);
        }
      });
  }
  var dSearch = _.debounce(searchby, 300);
  function cityname(val, e) {
    var elem = e.target.children[0];
    setTimeout(() => {
      axios
        .get("https://api.postcodes.io/postcodes?q=" + val)
        .then((response) => {
          if (elem) {
            elem.innerHTML = `${response.data.result[0].admin_district}, ${response.data.result[0].admin_ward}`;
          }
        });
    }, 200);
  }
  function SelectCode(code) {
    setPostcode(code);
  }
  function setPC() {
    console.log(postcode);
  }
  function CloseViaOverLay(e) {
    var target = e.target;
    if (target.classList.contains("postContainer")) {
      props.togglePost()
    }
  }
  return (
    <div className="postContainer" onClick={(e) => CloseViaOverLay(e)}>
      <div className="inputwrapper">
        <h2 className="mTitle">Store Finder</h2>
        <input
          type="text"
          onInput={(e) => dSearch(e.target.value)}
          placeholder="Start typing your postcode ... (ex: BD )"
        />
        <div className="resultsBox">
          {results && results.length > 0 ? <h4>Results:</h4> : null}
          {results && results.length > 0
            ? results.map((location, index) => {
                return (
                  <button
                    className="LocationResult"
                    key={index}
                    onMouseOver={(e) => cityname(location, e)}
                    onClick={(e) => SelectCode(location)}
                  >
                    {location}
                    <span className="hInfo">Loading ...</span>
                  </button>
                );
              })
            : null}
          {results === null && <div>No Results</div>}
        </div>
        <div className="submitBox">
          <button
            disabled={postcode !== null ? false : true}
            onClick={(e) => setPC()}
          >
            Select Code {postcode !== null ? ` - ${postcode}` : null}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Postcode;

import React from "react";

export default function StoreEntry(props) {
  return (
    <>
      {!props.selected && <h6 className="foundStore">Closest:</h6>}
      <div className={`storeEntry ${props.selected ? "selected" : ""}`}>
        <h2 className="title">{props.data.name}</h2>
        <h4 className="subtitle">{props.data.city}</h4>
        <table className="info">
          <tbody>
            <tr>
              <td>Postcode</td>
              <td>{props.data.postcode}</td>
            </tr>
            <tr>
              <td>Minimum spending for delivery</td>
              <td>£{props.data.minSpend}</td>
            </tr>
            <tr>
              <td>Delivery Fee</td>
              <td>£{props.data.dFee}</td>
            </tr>
          </tbody>
        </table>
        {!props.selected && (
          <button
            className="btn big green"
            onClick={(e) => props.selectStore(e, props.data)}
          >
            Select this store
          </button>
        )}
        {props.selected && (
          <button
            className="textButton"
            onClick={(e) => props.selectStore(e, null)}
          >
            Change Store?
          </button>
        )}
      </div>
    </>
  );
}

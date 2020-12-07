import React from "react";

export default function StoreSmallEntry(props) {
  return (
    <>
      <div className="storeEntry nearest">
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
        <button
          className="btn orange"
          onClick={(e) => props.selectStore(e, props.data)}
        >
          Select this store
        </button>
      </div>
    </>
  );
}

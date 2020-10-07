import React from 'react';
import { connect } from 'react-redux';
import { AddToCart, RemoveCart } from '../../../actions'
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import CloseIcon from '@material-ui/icons/Close';
import "./cart.scss"
function Cart(props) {
    function renderItems() {
        if (props.cart) {
            return (
                <div className={`cartContainer ${props.active ? "active" : ""}`}>
                    <div className="cartHeader" onClick={() => props.toggleCart()}>
                        <h5>Cart</h5>
                        <button >
                            <CloseIcon />
                        </button>
                    </div>
                    <ul className="cartListing">
                        {props.cart.map((item, index) => {
                            return (
                                <li key={index} className="cartEntry">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="buttonTd">
                                                    <button className="btn green" onClick={() => props.AddToCart(item.id)}>
                                                        <PlusOneIcon />
                                                    </button>
                                                </td>
                                                <td className="middleTD">
                                                    <div className="innerData">
                                                        <div>
                                                            <div className="amount">{item.amount}</div>
                                                            <div className="name">{item.name}</div>
                                                            <div className="price">{item.price}</div>
                                                        </div>
                                                        <div>
                                                            <div className="type">{item.type}</div>
                                                            <div className="subType">{item.subtype}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="buttonTd">
                                                    <button className="btn red" onClick={() => props.RemoveCart(item.id)}>
                                                        <ExposureNeg1Icon />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
    }
    return (
        <div>
            {renderItems()}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        cart: state.cart
    };
};
export default connect(
    mapStateToProps, { AddToCart, RemoveCart }
)(Cart);

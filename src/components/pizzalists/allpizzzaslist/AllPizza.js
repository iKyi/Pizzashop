import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { FetchAllPizza } from '../../../actions'
import ProductGridItem from '../../prodGridItem'
function AllPizza(props) {
const {FetchAllPizza} = props;
    useEffect(() => {
        FetchAllPizza();
        return () => {
        }
    }, [])

    function renderPizzas() {
        if (props.pizzas.length > 0) {
            return (
                <div className="itemGrid">
                    {props.pizzas.map((item, index) => {
                        return (
                            <ProductGridItem image={item.image} key={index} name={item.name} price={item.price} id={item.id}/>
                        )
                    })}
                </div>
            )
        }
    }
    return (
        <div>
            <div className="container">
                {renderPizzas()}
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        pizzas: state.products
    };
};
export default connect(
    mapStateToProps,
    { FetchAllPizza }
)(AllPizza);

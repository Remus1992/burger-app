import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // };

    // changed this from componentDidMount to allow for ingredients to be sent along with
    // 'null' initialized state
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         // ['salad', '1']
    //         // this loop adds ingredients to the empty dict above, so we need
    //         // to build an if statement to account for the price that we passed along
    //         // in the queryParams from BurgerBuilder.js
    //         // the current method below though is a 'work around' and isn't the most efficient
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    //     console.log(ingredients);
    //     console.log(price)
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    };

    render() {
        let summary = <Redirect to='/'/>;
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        // instead of passing ContactData as a 'component'
                        // we are rendering it manually to pass props
                        // component={ContactData}
                        // passing along props to get history element
                        component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients
    }
};

// we don't need mapDispatchToProps because we are not dispatching anything
// we do navigate via these props but we use React-Router for this

export default connect(mapStateToProps)(Checkout);
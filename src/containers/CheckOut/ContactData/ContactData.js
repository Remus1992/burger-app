import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'slowest', displayValue: 'Slowest'},
                        {value: 'normal', displayValue: 'Normal'},
                        {value: 'fastest', displayValue: 'Fastest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        // submitting a form will reload the page by default
        // so we run the following function to prevent that to access
        // the console.log and see that ingredients have indeed
        // been passed down from CheckOut.js
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        };
        // '.json' is necessary for Firebase specifically
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                // we'd normally be able to do this but since
                // we are manually rendering the component on CheckOut.js
                // we can't access history, so we can use withRouter
                // or we can pass along the props in the anonymous func from CheckOut.js
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    };

    render() {
        let form = (
            <form>
                <Input elementType="..." elementConfig="..." value="..."/>
                <Input inputtype="input" type='email' name="email" placeholder="Your Email"/>
                <Input inputtype="input" type='text' name="street" placeholder="Street"/>
                <Input inputtype="input" type='text' name="postal" placeholder="Postal Code"/>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
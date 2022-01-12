import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { idbPromise } from '../../utils/helpers';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
// import ProductList from '../components/ProductList';
// import CategoryMenu from '../components/CategoryMenu';
// import Cart from '../components/Cart';
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutPage = () => {
   const state = useSelector(state => state);
    const dispatch = useDispatch() ;
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
           
          });
        }
      }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
               
        } 
    

        if (!state.cart.length) {
            getCart();
        }
        console.log(state.cart) 
    }, [state.cart.length, dispatch]);

    
    return (
        <div className='container'>
            <h1>this is the checkout page</h1>
        </div>
    );
};

export default CheckoutPage;
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-router-bootstrap'
import { addToCart } from '../actions/cartActions'
 
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
 // use location to set the value of the params to the qty variable, qty will be set to the value after the ? in the params, .split is used to get just the number after the equal
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)

  const { cartItems } = cart 
  
  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])
  return (
    <div>
      <h2>Cart Screen</h2>
    </div>
  )
}
export default CartScreen
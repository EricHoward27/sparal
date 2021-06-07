import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loaders from '../components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()

  // grab product list from state and deconstruct these props
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  // use to fire off the state 
  useEffect(() => {
    dispatch(listProducts())
    
  }, [dispatch])

  return (
    <div>
      <h1>Lastest Products</h1>
      {loading ? <Loaders /> : error ? <Message variant='danger'>{error}</Message> : <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row> }
      
    </div>
  )
}
export default HomeScreen
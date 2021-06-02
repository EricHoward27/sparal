import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      // deconstruct data from the axios request
      const { data } = await axios.get('/api/products')
      // set the products to the data fetch from axios
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <h1>Lastest Products</h1>
      <Row>
          {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
    </div>
  )
}
export default HomeScreen
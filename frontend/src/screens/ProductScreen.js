import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ListGroup, Col, Row } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
  const [product, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`)
      setProducts(data)
    }
    fetchProducts()
  }, [])
  return (
    <section className="py-5">
    <Link className='btn btn-dark my-3' to='/'> Go Back</Link>
        <div className="container px-4 px-lg-5 my-5">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.image} alt="..." /></div>
                <div className="col-md-6">
                    <div className="small mb-1">SKU: BST-498</div>
                    <h1 className="display-5 fw-bolder">{product.name}</h1>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <div className="fs-5 mb-5">
                        <ListGroup.Item>${product.price}</ListGroup.Item>
                    </div>
                    <p className="lead">{product.description}</p>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <div className="d-flex">
                        <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style={ { maxWidth: '3rem' } } />
                        <button className="btn btn-outline-dark flex-shrink-0" type="button" disabled={product.countInStock === 0}>
                            <i className="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
  </section>
  )
}
export default ProductScreen
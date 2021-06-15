import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Col, Row, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetail } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ history, match }) => {
  const [ qty, setQty ] = useState(0)

  const dispatch = useDispatch()

  const productDetail = useSelector(state => state.productDetail)
  const { loading, error, product } = productDetail

  useEffect(() => {
    dispatch(listProductDetail(match.params.id))
  }, [dispatch, match])
  
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <section className="py-5">
    <Link className='btn btn-dark my-3' to='/'> Go Back</Link>
    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <div className="container px-4 px-lg-5 my-5">
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
                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                  
                      )}
                        <button className="btn btn-outline-dark flex-shrink-0" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                            <i className="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div> }
        
  </section>
  )
}
export default ProductScreen
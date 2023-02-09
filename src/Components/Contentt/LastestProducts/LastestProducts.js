import React, { useEffect, useState } from 'react'
import { Container, Card, CardBody, CardLink, CardText, CardTitle, Col, Row, Button } from 'reactstrap'
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { displayProductDentail } from '../../Actions/shop24h.Actions';
export default function LastestProducts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // sản phẩm theo xu hướng
    const [productList7,setProductList7] = useState([])
    // 4 điện thoại đắt nhất
    const [productList4Max1,setProductList4Max1] = useState([])
    // 4 điện thoại rẻ nhất
    const [productList4Min1,setProductList4Min1] = useState([])
    useEffect ( () => {
      // 4 điện thoại đắt nhất
      const productList4Max1Fc = async () => {
        await fetch(`http://localhost:8002/api/Product/?minPrice=28000000`)
        .then(res => res.json())
        .then((result) => {
          setProductList4Max1(result.data)
        })
        .catch((error) => {
            console.log(error.message);
        })  
      }
      // 4 điện thoại rẻ nhất
      const productList4Min1Fc = async () => {
        await fetch(`http://localhost:8002/api/Product/?minPrice=8890000&maxPrice=9790000`)
        .then(res => res.json())
        .then((result) => {
          setProductList4Min1(result.data)
        })
        .catch((error) => {
            console.log(error.message);
        })  
      }
      productList4Max1Fc();
      productList4Min1Fc();
    },[])
    console.log(productList4Max1)
    //console.log(productList4Min1)
  
    const onBtnProDucDentail = (productDetail) => {
      navigate("/products/productDentail")
      dispatch(displayProductDentail(productDetail))
      console.log(productDetail)
    }
  return (
    <>
      <Container className='mt-5 container-lastest'>
          <Row className='banner '>
            <img src='https://bachlongmobile.com/bnews/wp-content/uploads/2023/01/title-tientao-home-min.png'/>
          </Row>
          <Row className='mt-4 text-center sale'>
            <span className='mt-2'> Sản phẩm bán chạy</span>
          </Row>          
          <Row className='p-5'>
              <Carousel fade>
                  <Carousel.Item >
                      <Row className='text-center'>
                          {productList4Max1.map((element, index) => {
                              return (
                                  <Col className='pt-3' sm={4} key={index}>
                                      <a type='button' onClick={() => onBtnProDucDentail(element)}>
                                          <Card className='h-100 '>
                                              <CardBody>
                                                  <CardTitle className=' card-title'>
                                                      <b> Sale</b>
                                                  </CardTitle>
                                              </CardBody>
                                              <div className='img-product'>
                                                  <img src={element.imageUrl} width="100%" />
                                              </div>
                                              <CardBody>
                                                  <CardLink className='card-link' >
                                                      <b>{element.name}</b> <br /> <br />
                                                  </CardLink>
                                                  <CardText className='card-text'>
                                                      <p id='p-text'>Giá từ: {(element.buyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</p>
                                                      <p> Chỉ còn: <span style={{ color: "red" }}> {(element.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</span> </p>
                                                  </CardText>
                                              </CardBody>

                                          </Card>
                                      </a>
                                  </Col>
                              )
                          })}
                      </Row>
                  </Carousel.Item>
                   <Carousel.Item >
                   <Row className='text-center'>
                          {productList4Min1.map((element, index) => {
                              return (
                                  <Col className='pt-3' sm={4} key={index}>
                                      <a type='button' onClick={() => onBtnProDucDentail(element)}>
                                          <Card className='h-100 w-100'>
                                              <CardBody>
                                                  <CardTitle className=' card-title'>
                                                      <b> Sale</b>
                                                  </CardTitle>
                                              </CardBody>
                                              <div className='img-product'>
                                                  <img src={element.imageUrl} width="100%" />
                                              </div>
                                              <CardBody>
                                                  <CardLink className='card-link' >
                                                      <b>{element.name}</b> <br /> <br />
                                                  </CardLink>
                                                  <CardText className='card-text'>
                                                      <p id='p-text'>Giá từ: {(element.buyPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</p>
                                                      <p> Chỉ còn: <span style={{ color: "red" }}> {(element.promotionPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫</span> </p>
                                                  </CardText>
                                              </CardBody>

                                          </Card>
                                      </a>
                                  </Col>
                              )
                          })}
                    </Row>
                  </Carousel.Item> 
              </Carousel>
          </Row>
          
      </Container>
      <Container className='text-center pt-5'>
            <Button
                onClick={() => navigate("/products")}
                style={{border: "solid 5px #fed403", borderRadius: "25px"}}
                color='dark'
                size='lg'
                className='px-5 py-3'><b style={{fontSize: "30px",}}>Đi đến cửa hàng</b></Button>
      </Container>
    </>
  )
}

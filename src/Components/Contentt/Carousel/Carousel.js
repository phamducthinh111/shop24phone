import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem , CardLink, Row } from 'reactstrap';
import banner2 from '../../../assets/images/Carousel/banner-6.png'
import bannerIphone from '../../../assets/images/Carousel/iphone14-banner.png'
import { displayProductDentail } from '../../Actions/shop24h.Actions';


function IndividualIntervalsExample() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // sản phẩm theo xu hướng
  const [productList7,setProductList7] = useState([])
  // 4 điện thoại đắt nhất
  const [productList4Max1,setProductList4Max1] = useState([])
  // 4 điện thoại rẻ nhất
  const [productList4Min1,setProductList4Min1] = useState([])
  useEffect ( () => {
     // sản phẩm theo xu hướng
    const productList7Fc = async () => {
      await fetch(`http://localhost:8002/api/Product/?minPrice=25890000`)
      .then(res => res.json())
      .then((result) => {
        setProductList7(result.data)
      })
      .catch((error) => {
          console.log(error.message);
      })  
    }
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
    productList7Fc();
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
      <Container className='pt-3'>
        <Row >
          <Col  lg={2} md={23} sm={12}>
            <Card 
              style={{
                width: '13rem',
              }}>
              <CardHeader className='bg-danger text-white text-center'>
                <b>Xu hướng mua sắm</b>
              </CardHeader>
              <CardBody style={{
                fontSize: "10px"
                
              }}>
                <ListGroup  flush >
                {
                  productList7.map((item, index) => {
                    return (
                      <ListGroupItem key={index}>         
                        <CardLink > 
                          <a
                            type = "button"
                            onClick = { () => onBtnProDucDentail(item)}
                            style={{fontSize: "15px"}}
                          > {item.name}</a>
                        </CardLink>   
                      </ListGroupItem>                  
                    )
                  })
                }
                </ListGroup> 
              </CardBody>
            </Card>
          </Col>
          <Col  lg={7} md={7} sm={12}>
            
            <Carousel fade>
              <Carousel.Item interval={1000}>
                <a type='button' onClick={() => navigate("/products")}>
                  <img
                    className="d-block w-100"
                    width="746px"
                    height="360px"
                    src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-ip14-pro-max-th2.png"
                    alt="First slide"
                  />
                </a>     
              </Carousel.Item>
              <Carousel.Item interval={500}>
                <a type='button' onClick={() => navigate("/products")}>
                  <img
                    className="d-block w-100"
                    src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/IMG_20230201_201302_475990.jpg"
                    width="746px"
                    height="360px"
                    alt="Second slide"
                  />
                </a>            
              </Carousel.Item>
              <Carousel.Item>
                <a type='button' onClick={() => navigate("/products")}>
                  <img
                    className="d-block w-100"
                    width="746px"
                    height="360px"
                    src= "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-dat-coc-s23.png"
                    alt="Third slide"
                  />
                </a>
              </Carousel.Item>
            </Carousel>
            
            
          </Col>
          <Col lg={3} md={3} sm={12} >
            <Row tag="a" href="/products">
              <img  src="https://bachlongmobile.com/media/tmp/catalog/product//b/a/banner-apple_tet_home-min.png" />
            </Row>
            <Row tag="a" href="/products" className='mt-3'>
              <img height="205px"  src={banner2} />
            </Row>
          </Col>
        </Row>
      </Container>
      <div className='mt-5 picture-banner'>
        <a href="/products"> <img height="100%" width="100%" src='https://bachlongmobile.com/bnews/wp-content/uploads/2023/01/HEADHOME_HELLOT2_1920x350_310123-min.png'/> </a>
      </div>
    </>
    
  );
}

export default IndividualIntervalsExample;
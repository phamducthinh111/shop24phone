import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, CardText, Col, Container, List, Row } from 'reactstrap'
import routerList from '../../../router'
import { FaCheckCircle, FaGift, FaGifts } from 'react-icons/fa';
import { handleProductCard } from '../../Actions/shop24h.Actions'

const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export default function ProductDetail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const { productDentail} = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    const routerHandle = (path) => {
      navigate(path)
    }
    const addProductInCard = () => {
      dispatch(handleProductCard(productDentail))
    }
    const onBtnBuyProductClick = () => {
      dispatch(handleProductCard(productDentail))
      navigate("/card")
    }
  return (
    <div  style={{ background: "#f3f2f3" }}>
      <Container className='py-1'>
        <Breadcrumb>
          {
            routerList.map((router, index) => {
              return(
                  router.label ?
                  <BreadcrumbItem key={index}>
                    <a  type='button' onClick={() => routerHandle(router.path)}>
                      {router.label}
                    </a>
                  </BreadcrumbItem>
                  : null
              )
            })
          }
          <BreadcrumbItem>
                      {productDentail.name}
          </BreadcrumbItem>
        </Breadcrumb>
        <Row className='bg-white p-5 mt-1'>
          <Col sm={6} >
            <div className='productDt-img p-3 text-center'>
                <img src={productDentail.imageUrl}/>
            </div>
            <Row className='mt-4'>
              <h5>Tính năng nổi bật: </h5>
              <Col sm={6}>
                <div>
                  <List>
                    <li>
                      <b>Hệ điều hành:</b> {productDentail.description.Operating}
                    </li>
                    <li>
                    <b>Chip (CPU):</b> {productDentail.description.Chip}
                    </li>
                    <li>
                    <b>Hãng: </b>{productDentail.type.name}
                    </li>

                  </List>
                </div>
              </Col>
              <Col sm={6}>
                <div>
                  <List>
                    <li>
                    <b>Màn hình: </b> {productDentail.description.Screen}
                    </li>
                    <li>
                    <b>Camera Trước: </b> {productDentail.description.frontCamera}
                    </li>
                    <li>
                    <b>Camera Sau: </b> {productDentail.description.rearCamera}
                    </li>
                    
                  </List>
                </div>
              </Col>
            </Row>
          </Col>
          <Col sm={6} >
            <div style={{borderBottom: "black dotted 1px"}}>
              <h2>{productDentail.name}</h2>
              <p style={{fontSize:"15px"}}> <b>Số lượng còn:</b>  20</p>
              <p style={{fontSize:"15px"}}> {productDentail.description.description}</p>
            </div>
            <div className='mt-3'>
              <b style={{color:"red",fontSize:"30px"}}>{VND.format(productDentail.promotionPrice)}</b> &emsp; 
              <b style={{color:"#909091",fontSize:"25px",textDecorationLine:"line-through"}}>{VND.format(productDentail.buyPrice)}</b>
            </div>
            <Row className='mt-5'>
              <Col sm={8}>
              <Button
                block
                onClick={onBtnBuyProductClick}
                color='danger'><b>MUA NGAY </b> <br/><span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>  </Button>
              </Col>
              <Col sm={4}>
                <Button
                outline
                color='info'
                
                onClick={addProductInCard}
                ><img width="50%"  src='https://cdn2.cellphones.com.vn/50x,webp,q70/media/wysiwyg/add-to-cart.png'/>
                </Button>
              </Col>          
            </Row>
            <div className='mt-4'>
              <Card className="my-2"
                style={{
                  width: '36rem'
                }}>
                  <CardHeader>
                    <i style={{fontSize:"20px", color:"green"}}><FaGift/></i>&emsp;
                    <b>Ưu đãi thêm</b>
                  </CardHeader>
                  <CardBody >
                    
                      <i style={{ color:"#2D1EC1"}}><FaCheckCircle/> </i> &ensp; <span style={{fontWeight:"none"}}>Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)</span> <br/><br/>
                      <i style={{ color:"#2D1EC1"}}><FaCheckCircle/> </i> &ensp; <span style={{fontWeight:"none"}}>Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng</span> <br/><br/>
                      <i style={{ color:"#2D1EC1"}}><FaCheckCircle/> </i> &ensp; <span style={{fontWeight:"none"}}> Giảm thêm 4% (tối đa 250.000đ) qua ví Moca cho đơn hàng từ 500.000đ</span> <br/><br/>
                      <i style={{ color:"#2D1EC1"}}><FaCheckCircle/> </i> &ensp; <span style={{fontWeight:"none"}}> Giảm thêm tới 300k cho đơn hàng từ 5 triệu khi thanh toán qua VNPAY</span> <br/><br/>
                      <i style={{ color:"#2D1EC1"}}><FaCheckCircle/> </i> &ensp; <span style={{fontWeight:"none"}}>Thu cũ đổi mới: Giá thu cao - Thủ tục nhanh chóng - Trợ giá tốt nhất</span> <br/>  <br/>
                            
                  </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div> 

   
  )
}

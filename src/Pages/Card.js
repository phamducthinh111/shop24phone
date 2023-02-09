import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Card, CardBody, Col, Container, ListGroup, ListGroupItem, Row, Table } from 'reactstrap'
import { deletedProductInCard, getAccountGoogle, increaseQuantity, reductionQuantity } from '../Components/Actions/shop24h.Actions'
import routerList from '../router'
import auth from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import ModalLogin from '../Components/Header/ModalLogin/ModalLogin'
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const provider = new GoogleAuthProvider()

export default function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const routerHandle = (path) => {
        navigate(path)
    }
    const { card  } = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    // tăng số lượng sp
    const onBtnIncreaseQuantity = (id ) => {
        dispatch(increaseQuantity(id));
    }
    // giảm số lượng sp
    const onBtnReductionQuantity = (id) => {
        dispatch(reductionQuantity(id))
    }
    // xóa sp
    const onBtnDeletedProductCart = (id) => {
        card.filter((item) => {
            return item._id !== id
        });
        dispatch(deletedProductInCard(id))
    }
    // tính tổng all số tiền sp
    const Total = card.reduce((tong,currentValue) => {
        return (tong + currentValue.promotionPrice*currentValue.amount)
    },0)
    // tính tổng all sản phẩm
    const quantity = card.reduce((tong,currentValue) => {
        return (tong + currentValue.amount )
    },0)
    
    // kiểm tra có account hay không
    const [account, setAccount] = useState({})
     useEffect (() => {
        onAuthStateChanged(auth, (result) => {
            setAccount(result) 
        })
    })
    // moDal hiển thị login account
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    // login account
    const loginGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            //console.log(result)
        })
        .catch((error) => {
            console.error(error)
        });
        toggle();
    }

    const onBtnOrderClick = () => {
        dispatch(getAccountGoogle(account))
        if(account == null) {
            setModal(true)
            return false
        }
        navigate("/order")
        return true
    }
  return (
      <div style={{ background: "#f3f2f3",paddingBottom:"100px" }}>
          <Container className='py-1'>
              <Row>
                  <Breadcrumb>
                      {
                          routerList.map((router, index) => {
                              return (
                                  router.label ?
                                      <BreadcrumbItem key={index}>
                                          <a type='button' onClick={() => routerHandle(router.path)}>
                                              {router.label}
                                          </a>
                                      </BreadcrumbItem>
                                      : null
                              )
                          })
                      }
                      <BreadcrumbItem>
                      Card
                    </BreadcrumbItem>
                  </Breadcrumb>
              </Row>
            <Row className='mt-5'>
                <Table className='text-center' striped>
                    <thead className='bg-info text-white'>
                    <tr>
                        <th>
                            Product
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Quantity
                        </th>
                        <th>
                            Total
                        </th>
                        <th>
                            Total
                        </th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {card.map((element,index) => {
                            return (
                                <tr key={index}>
                                    <td width="316px">
                                        <img width="35%" src={element.imageUrl}/>
                                        
                                    </td>
                                    <td style={{fontSize: "18px"}}>
                                        {element.name}
                                    </td>
                                    <td>
                                        <b>{VND.format(element.promotionPrice)}</b>
                                    </td>
                                   
                                    <td>
                                        <ButtonGroup>
                                            { element.amount >= 2 ?
                                            <Button onClick={() => onBtnReductionQuantity(element._id)}> -</Button>
                                            :
                                            <Button disabled> -</Button>
                                            }
                                            <Button> <span>{element.amount}</span></Button>
                                            { element.amount <= 3 ?
                                            <Button onClick={() => onBtnIncreaseQuantity(element._id)}> +</Button>
                                            :
                                            <Button disabled> +</Button>
                                            }
                                        </ButtonGroup>
                                    </td>
                                    <td>
                                        <b>{VND.format(element.amount * element.promotionPrice)}</b>
                                    </td>
                                    
                                    <td>
                                        <Button
                                            onClick={ () => onBtnDeletedProductCart(element._id)}
                                            color='success'> Xóa</Button>
                                    </td>
                                     
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>
            <Button 
                    size='lg'
                    color='primary'
                    onClick={() => navigate("/products")} > Tiếp tục mua hàng </Button>
            <Row className="col d-flex justify-content-center">
                
                <Card 
                    style={{
                        width: '30rem'
                      }}>
                    <CardBody>
                      <ListGroup flush>
                        <ListGroupItem>
                            <Row style={{fontSize: "20px"}}>
                                <Col sm={8}>
                                    <b>Số lượng sản phẩm: </b>
                                </Col>
                                <Col className='text-center' sm={4}>
                                    <b style={{color: "red"}}> {quantity}</b>
                                </Col>
                            </Row>
                            <Row style={{fontSize: "20px"}} className="mt-3">
                                <Col sm={6}>
                                    <b>Tổng tạm tính: </b>
                                </Col>
                                <Col  className='text-center' sm={6}>
                                    <b style={{color: "red"}}> {VND.format(Total) }</b>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem className='mt-2'>
                            <Button
                                
                                onClick={onBtnOrderClick}
                                color='danger' block size='lg'> TIẾN HÀNH ĐẶT HÀNG</Button>
                        </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                </Card> 
            </Row>
            <ModalLogin modal={modal} toggle={() => setModal(!modal)} loginGoogle = {loginGoogle}/>
          </Container>

          
      </div>
  )
}

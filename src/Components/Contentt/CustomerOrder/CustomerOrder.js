import { async } from '@firebase/util';
import { Select } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  Await, useNavigate } from 'react-router-dom';
import { Alert, Breadcrumb, BreadcrumbItem, Button, Col, Container, Form, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import routerList from '../../../router'
import { openModalDentailOrderCustomer } from '../../Actions/shop24h.Actions';
import ModalOrder from '../ModalOrder/ModalOrder';

const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export default function CustomerOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routerHandle = (path) => {
    navigate(path)
  }
  const { card ,accountGoogle } = useSelector((reduxData) => {
    return reduxData.shop24hReduces
  })
  const [city, setCity] = useState([])
 useEffect(() => {
    const cityApi = async () => { 
      await fetch(`https://provinces.open-api.vn/api/?depth=1`)
      .then(res => res.json())
      .then((result) => {
        setCity(result)
      })
      .catch((error) => {
          console.log(error.message);
      })     
    }
    cityApi();

  },[])
  // tính tổng all số tiền sp
  const Total = card.reduce((tong,currentValue) => {
    return (tong + currentValue.promotionPrice*currentValue.amount)
},0)
  // thông tin ca nhan customer
  const  [fullName, setName] = useState(accountGoogle.displayName)
  const  [email, setEmail] = useState(accountGoogle.email)
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("VIETNAM")
  const [address, setAddress] = useState("")
  const [cityIp, setCityIp] = useState("N")

  const onChangeHandleName = (event) => {
    setName(event.target.value)
    
  }
  const onChangeHandleEmail = (event) => {
    setEmail(event.target.value)
   
  }
  const onChangeHandlePhone = (event) => {
    setPhone(event.target.value)
    
  }
  const onChangeHandleCity = (event) => {
    setCityIp(event.target.value)
    
  }
  const onChangeHandleAddress = (event) => {
    setAddress(event.target.value)
    
  }
  // aler canh bao
  const [alerName,setAlerName] = useState(false)
  const [alerEmail,setAlerEmail] = useState(false)
  const [alerPhone,setAlerPhone] = useState(false)
  const [alerCity,setAlerCity] = useState(false)
  const [alerDiaChi,setAlerDiaChi] = useState(false)

  // ham kiem tra email
  const kiemTraEmail = (paramEmail) => {
    const vValidateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return vValidateEmail.test(String(paramEmail).toLowerCase())
  }

  // modal hiển thị chi tiết order
  const [modalOrder, setModalOrder] = useState(false);
  const onBtnConfirmClick = () => {
    if(fullName === "" || fullName === undefined) {
      setAlerName(true);
      return false
    }
    setAlerName(false);
    if(!kiemTraEmail(email)) {
      setAlerEmail(true);
      return false
    }
    setAlerEmail(false);
    if(phone === "") {
      setAlerPhone(true);
      return false
    }
    setAlerPhone(false);
    if(cityIp === "N") {
      setAlerCity(true);
      return false
    }
    setAlerCity(false);
    if(address === "") {
      setAlerDiaChi(true);
      return false
    }
    setAlerDiaChi(false);

    //tao biến chứa thông tin order
    const orderCustomer = {
      fullName : fullName,
      phone: phone,
      email: email,
      address: address,
      country: country,
      city: cityIp,
      products: card,
      cost: Total
    }
    dispatch(openModalDentailOrderCustomer(orderCustomer))
    // hiển thị modal order
    setModalOrder(true)
    
    return true 
  }

  return (
    <div style={{ background: "#f3f2f3" }}>
      <Container style={{paddingBottom:"100px"}} >
        <Row>
          <Breadcrumb >
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
              <a type='button' onClick={() => navigate("/card")}>
                Card
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              Order
            </BreadcrumbItem>
          </Breadcrumb>
        </Row>
        <Row className='py-5' >
          <Col sm={6} style={{borderRight: "#6c757d solid 2px", paddingRight: "50px" }}>
            <h3>Thông tin giao hàng</h3>
            <Form className='mt-3'>
              <FormGroup>
                <Input
                  onChange={onChangeHandleName}
                  value={fullName}
                  type='name'
                  bsSize='lg'
                  placeholder='Họ và tên' />
                <Alert color='danger' isOpen={alerName}> Họ và tên không hợp lệ</Alert>
              </FormGroup>
              <Row>
                <Col sm={8}>
                <FormGroup>
                  <Input
                    onChange={onChangeHandleEmail}
                    value={email}
                    name="email"
                    bsSize='lg'
                    placeholder="Email"
                    type="email"
                  />
                  <Alert color='danger' isOpen={alerEmail}> Email không hợp lệ</Alert>
                </FormGroup>
                </Col>
                <Col sm={4}>
                <FormGroup>
                  <Input
                  onChange={onChangeHandlePhone}
                    name="phone"
                    bsSize='lg'
                    placeholder="Số điện thoại"
                    type="phone"
                  />
                  <Alert color='danger' isOpen={alerPhone}> Số điện thoại không hợp lệ</Alert>
                </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                <FormGroup>
                  <Input disabled
                    type='select'
                    bsSize='lg'
                  >
                    <option value={country}> Việt Nam</option>
                  </Input>
                </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Input
                      type="select"
                      bsSize='lg'
                      value={cityIp}
                      onChange={onChangeHandleCity}
                    >              
                      <option value="N"> Chọn tỉnh thành</option>
                      {
                        city.map((element, index) => {
                          return (
                            <>
                              <option value={element.name} key={index}> {element.name}</option>
                            </>
                          )
                        })
                      }
                    </Input>
                    <Alert color='danger' isOpen={alerCity}> Bạn chưa chọn tỉnh thành</Alert>
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                  <Input
                    onChange={onChangeHandleAddress}
                    name='address'
                    bsSize='lg'
                    placeholder="Địa chỉ cụ thể"
                  />
                </FormGroup>
                <Alert color='danger' isOpen={alerDiaChi}> Địa chỉ không hợp lệ</Alert>
            </Form>
            <Row>
              <Col sm={4}>
                    <Button
                 
                    block
                    color = "success"
                    onClick = {() => navigate("/card")}
                    > Giỏ hàng</Button>
              </Col>
              <Col sm={8}>
                    <Button
                    onClick={onBtnConfirmClick}
                    block
                    color = "danger"
                    size='lg'
                    > XÁC NHẬN</Button>
              </Col>
            </Row>
          </Col>
          <Col className='' sm={6} style={{paddingLeft: "50px"}}>
            <Table size='sm'>
              <thead>
              <tr>
                <th>
                  
                </th>
                <th>
                  
                </th>
                <th>
                  
                </th>
                <th>
                  
                </th>
              </tr>
              </thead>
              <tbody>
                {card.map((element,index) => {
                  return (
                  <tr key={index}>
                    <td width="150px">
                      <img width="45%" src={element.imageUrl} />
                    </td>
                    <td width="280px" style={{ fontSize: "15px" }}>
                      {element.name}
                    </td>
                    <td width="70px" className=''>
                      <b>{(element.amount)}</b>
                    </td>
                    <td>
                      <b>{VND.format(element.amount * element.promotionPrice)}</b>
                    </td>
                </tr>
                )
                })}      
              </tbody>
            </Table>
              <Row className='text-center'>
                <Col sm={6} style={{fontSize: "30px"}}>
                  Thành tiền:
                </Col>
                <Col sm={6} style={{fontSize: "35px"}}>
                  <b>{VND.format(Total)}</b> 
                </Col>
              </Row>
          </Col>
        </Row>
      </Container>
      <ModalOrder modal = {modalOrder} toggle = {() => setModalOrder(!modalOrder)}/>
    </div>
  )
}

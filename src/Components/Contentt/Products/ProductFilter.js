import React, { useEffect, useState } from 'react'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { filterMinPriceProduct, filterNameProduct, filterProduct, filterTypeProduct } from '../../Actions/shop24h.Actions';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });


export default function ProductFilter() {
    const dispatch = useDispatch();
    const { nameProduct , minPrice ,maxPrice, typeProduct} = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    const [range, setRange ]= useState({
        min: (1000000),
        max: (50000000),
      });
    
    const onChangeHandleName = (event) => {
        dispatch(filterNameProduct(event.target.value))
    }

    const onChaneHandlePrice = (value) => {
        setRange(value);
        dispatch(filterMinPriceProduct(value))
    }
    
    const onChangeHandleType = (event) => {
        dispatch(filterTypeProduct(event.target.value))
    }
    
    const onBtnLocClick = () => {
        fetch(`http://localhost:8002/api/Product/?name=${nameProduct}&minPrice=${minPrice}&maxPrice=${maxPrice}&type=${typeProduct}`)
            .then(res => res.json())
            .then((result) => {
                dispatch(filterProduct(result.data))
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

  return (
    <>
    <Container>
        <Row>
            <Col sm={3} className="mt-5" >
                <Form>
                <FormGroup>
                    <Input                    
                    value={nameProduct}
                    placeholder="Name"
                    
                    onChange={onChangeHandleName}
                    />
                </FormGroup>
                </Form>
            </Col>
            <Col className="mt-5" sm={3} style= {{marginLeft: "40px", paddingLeft: "30px"}}>
                <Form action=''>
                    <FormGroup >
                        
                        <div style= {{marginTop: "15px"}}>   
                            <InputRange 
                                maxValue={(50000000)}
                                minValue={(1000000)}
                                value={range}
                                formatLabel= {value => VND.format(value) }
                                onChange={onChaneHandlePrice}
                            />  
                        </div>
                        
                    </FormGroup>
                </Form>
            </Col>
            <Col sm={3}  style= {{marginLeft: "50px", paddingLeft: "50px"}}>
                <Form onChange={onChangeHandleType} >                
                   <FormGroup  check>
                        <Input 
                            value="SAMSUNG"
                            name="type"
                            type="radio"
                        />
                        {' '}
                        <Label check>
                        <img width="50%" src='https://didongviet.vn/pub/media/efw/category/image//s/a/samsung42-b_25_1_1.jpg' />
                        </Label>
                    </FormGroup>
                    <FormGroup  check>
                        <Input 
                            value="APPLE"
                            name="type"
                            type="radio"
                        />
                        {' '}
                        <Label check>
                        <img width="50%" src='https://didongviet.vn/pub/media/efw/category/image//a/p/apple.png' />
                        </Label>
                    </FormGroup>
                    <FormGroup  check>
                        <Input 
                            value="XIAOMI"
                            name="type"
                            type="radio"
                        />
                        {' '}
                        <Label check>
                        <img width="50%" src='https://didongviet.vn/pub/media/efw/category/image//d/a/danh-muc-xiaomi.jpg' />
                        </Label>
                    </FormGroup>
                    <FormGroup  check>
                        <Input 
                            value="OPPO"
                            name="type"
                            type="radio"
                        />
                        {' '}
                        <Label check>
                        <img width="50%" src='https://didongviet.vn/pub/media/efw/category/image//o/p/oppo42-b_9.png' />
                        </Label>
                    </FormGroup>
                    <FormGroup  check>
                        <Input 
                            value="VIVO"
                            name="type"
                            type="radio"
                        />
                        {' '}
                        <Label check>
                        <img width="50%" src='https://didongviet.vn/pub/media/efw/category/image//v/i/vivo42-b_50.jpg' />
                        </Label>
                    </FormGroup>                   
                </Form>
            </Col>
            <Col className="mt-5" sm={2} >
                <Button
                    onClick={onBtnLocClick}
                    color='info'
                    block><b>Lọc</b></Button>
            </Col>
        </Row>
    </Container>
    </>
  )
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardLink, CardText, CardTitle, Col } from 'reactstrap'
import { displayProductDentail } from '../../Actions/shop24h.Actions';


export default function ProductCart() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { productList } = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    const onBtnProDucDentail = (productDetail) => {
        navigate("/products/productDentail")
        dispatch(displayProductDentail(productDetail))
    }
    return (
        <>
            {productList.map((element, index) => {
                return (
                    <Col className='pt-3' sm={3} key={index}>
                        <a type='button' onClick={ () => onBtnProDucDentail(element)}>
                            <Card  className='h-100'>
                                <CardBody>
                                    <CardTitle className=' card-title-viewall'>
                                        <h5> Sẵn hàng</h5>
                                    </CardTitle>
                                </CardBody>
                                <div className='img-product'>
                                    <img  src={element.imageUrl} width= "100%" />
                                </div>                          
                                <CardBody>
                                    <CardLink  >
                                        <h5>{element.name}</h5> <br />
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
        </>
    )
}

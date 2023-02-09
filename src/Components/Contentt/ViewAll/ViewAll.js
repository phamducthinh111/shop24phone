import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardLink, CardText, CardTitle, Col, Container, PaginationLink, Row } from 'reactstrap';
import { loadProductList, pageChangePagination } from '../../Actions/shop24h.Actions';
import ProductCart from '../Products/ProductCart';
import ProductFilter from '../Products/ProductFilter';
export default function ViewAll() {
    const dispatch = useDispatch();

    const { page, currentPage ,limit } = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    // call API load danh sách product
    useEffect(() => {
        //fetch("http://localhost:8002/api/Product/")
        //    .then(res => res.json())
        //    .then((result) => {
        //        dispatch(loadProductList(result.data))
        //    })
        //    .catch((error) => {
          //      console.log(error.message);
            //})
        dispatch(loadProductList(currentPage, limit))
    },[currentPage])
    const onChangePagination = (event, value) => {
        dispatch(pageChangePagination(value));
    }
    return (
        <div style={{backgroundColor: "#f3f2f3"}}>
        <Container className='pt-1' style={{ width: "1200px" }}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <a href="/">
                        Trang chủ
                    </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <a href="products">
                        Cửa hàng
                    </a>
                </BreadcrumbItem>
            </Breadcrumb>
            <ProductFilter/>
            <div className='text-center mt-5 pb-5'>
                <Row >
                   <ProductCart/>
                </Row>
                <Row className='pt-5 text-center'>
                    <Pagination onChange={onChangePagination} count={page} page={currentPage} color="secondary" />
                </Row>
            </div>
        </Container>
        </div>
    );
}


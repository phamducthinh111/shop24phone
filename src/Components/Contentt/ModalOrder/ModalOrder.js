
import { async } from '@firebase/util';
import React, { useState } from 'react';
import { ModalTitle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import SnackbarsCreateOrder from './SnackbarsCreateOrder';

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});
function ModalOrder({ modal, toggle }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderCustomer, card } = useSelector((reduxData) => {
        return reduxData.shop24hReduces
    })
    var d = new Date()
    // Modal tao don hang thanh cong
    const [modalOrderSuccessful, setModalOrderSuccessful] = useState(false)
    //  snackbar tạo đơn hàng thành công
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [orderCode,setOrdercode] = useState("")
    const onBtnCreateOrder = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(orderCustomer);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
        await fetch("http://localhost:8002/api/Order", requestOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result.orders)
            setOrdercode(result.orders.orderCode)
        })
        .catch(error => console.log('error', error));
       

        // tắt modal thông tin đơn hàng
        toggle();
        // hiện snackbar tạo đơn hàng thành công
        setOpenSnackbar(true)
        
        // hiện modal tạo đơn hàng thành công
        setModalOrderSuccessful(true)
    }
    const onBtnCancleModalCLick = () => {
        setModalOrderSuccessful(!modalOrderSuccessful)
        // quay lại trang chủ
        //navigate("/")
        window.location.href = "/"
    }

    return (
        <div >
            <Modal style={{ fontSize: "18px", fontFamily: "Arial" }} isOpen={modal} toggle={toggle} size="lg" >

                <ModalBody>
                    <div className='mb-5 mt-2 text-center'>
                        <h2> <b>Thông tin đặt hàng</b></h2>
                    </div>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Họ và tên người đặt:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{orderCustomer.fullName}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Số điện thoại:</p>
                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{orderCustomer.phone}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Email:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{orderCustomer.email}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Địa chỉ nhận hàng:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{orderCustomer.address}/ {orderCustomer.city}</b><br />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Thành tiền:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{VND.format(orderCustomer.cost)}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Ngày đặt hàng:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}</b>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Ngày giao hàng:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <p>(Từ 7 đến 10 ngày kể từ ngày đặt hàng)</p>
                        </Col>
                    </Row>
                    <Row className='pt-5'>
                        <Button
                            className='py-3 mb-1'
                            color="danger"
                            size='lg'
                            onClick={onBtnCreateOrder}>
                            <b> HOÀN TẤT ĐẶT HÀNG</b>
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            HỦY
                        </Button>
                    </Row>
                </ModalBody>
            </Modal>
            <Modal style={{ fontSize: "20px", fontFamily: "Arial" }} isOpen={modalOrderSuccessful} toggle={() => setModalOrderSuccessful(!modalOrderSuccessful)} >
                <ModalTitle className='bg-warning'>
                    <div className='text-center my-3'>
                        <h3><b> Đặt hàng thành công</b> </h3>
                    </div>
                </ModalTitle>
                <ModalBody>
                    <Row>
                        <Col lg={4} md={4} sm={12}>
                            <p> Mã đơn hàng:</p>

                        </Col>
                        <Col lg={8} md={8} sm={12}>
                            <b>{orderCode}</b>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button size='lg' color="danger" onClick={onBtnCancleModalCLick}>
                        Xác nhận
                    </Button>
                </ModalFooter>
            </Modal>
            <SnackbarsCreateOrder open={openSnackbar} setOpen={() => setOpenSnackbar(!openSnackbar)} />
        </div>
    );
}

export default ModalOrder;
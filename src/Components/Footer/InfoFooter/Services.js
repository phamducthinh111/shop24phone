import React, { Component } from 'react';

class Services extends Component {
    render() {
        return (
            <>
                <h5>Thông tin</h5>
                <ul className="nav-list nav-link">
                    <li><a href="#about"> Giới thiệu</a></li>
                    <li><a href="#projects">Khuyến mãi</a></li>
                    <li><a href="#blog">Bảo hành và sữa chữa</a></li>
                    <li><a href="#contacts">Tuyển dụng</a></li>
                    <li><a href="#pricing">Tin tức</a></li>
                    <li><a href="#contacts">Phương thức thanh toán</a></li>
                    <li><a href="#pricing">Gửi góp ý, khiếu nại</a></li>
                </ul>
            </>
        );
    }
}

export default Services;
import React, { Component } from 'react';

class Support extends Component {
    render() {
        return (
            <>
                <h5>Chính sách</h5>
                <ul className="nav-list nav-link">
                    <li><a href="#about"> Trả góp</a></li>
                    <li><a href="#projects">Giao hàng</a></li>
                    <li><a href="#blog">Giao hàng (ZaloPay)</a></li>
                    <li><a href="#contacts">Hủy giao dịch</a></li>
                    <li><a href="#pricing">Đổi trả</a></li>
                    <li><a href="#contacts">Bảo hành</a></li>
                    <li><a href="#pricing">Giải quyết khiếu nại</a></li>
                    <li><a href="#pricing">Bảo mật thông tin</a></li>
                </ul>
            </>
        );
    }
}

export default Support;
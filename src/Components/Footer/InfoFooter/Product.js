import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <>
                <h5>Sản phẩm</h5>
                <ul className="nav-list nav-link">
                    <li><a href="#about"> Samsung</a></li>
                    <li><a href="#projects">Apple</a></li>
                    <li><a href="#blog">Xiaomi</a></li>
                    <li><a href="#contacts">Oppo</a></li>
                    <li><a href="#pricing">Vivo</a></li>
                    
                </ul>
            </>
        );
    }
}

export default Product;
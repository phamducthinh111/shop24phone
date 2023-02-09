import "./Footer.css"
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Product from './InfoFooter/Product';
import Services from './InfoFooter/Services';
import Support from './InfoFooter/Support';
import Social from './SocialFooter/Social';

class Footer extends Component {
    render() {
        return (
            <div className='bg-secondary footer pt-5 pb-5'>
                <Container>
                    <Row>
                        <Col sm={3}>
                            <Product/>
                        </Col>
                        <Col sm={3}>
                            <Services/>
                        </Col>
                        <Col sm={3}>
                            <Support/>
                        </Col>
                        <Col sm={3}>
                            <Social/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;
import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import IconNavBar from './IconNavBar/IconNavBar';
import Logo from './Logo/Logo';
import NavbarHeader from './NavBar/NavBar';

class Header extends Component {
    render() {
        return (
            <div className='pt-2 pb-3 bg-secondary' >
                <Container>
                    <Row>
                        <Col className='pt-2' sm={3}>
                            <Logo />
                        </Col>
                        <Col sm={6}>
                            <NavbarHeader/>
                        </Col>
                        <Col className='pt-3' sm={3} style={{ textAlign: "right" }}>
                            <IconNavBar />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Header;
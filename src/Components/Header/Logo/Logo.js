import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import "./logo.css"
import LogoShop from "../../../assets/images/Carousel/2.png"

export default function Logo() {
    const navigate = useNavigate();
    const onBtnRouterBackHome = () => {
        navigate("/")
    }
        return (
            <Container>
                 <a className='text-white' type='button' onClick={onBtnRouterBackHome}><img src={LogoShop} width="70%" /></a>
            </Container>
        );
}

import React, { Component } from 'react';
import LogoPhone from "../../../assets/images/Carousel/2.png"


class Social extends Component {
    render() {
        return (
            <div>
                <a href='/'>
                    <img src={LogoPhone} width="80%"/></a> <br/> 
                <div className='social mt-4'>
                    <a href='facebook'> <i class="fab fa-facebook"></i></a>&nbsp; &nbsp;
                    <a href='instagram'> <i class="fab fa-instagram-square"></i></a>&nbsp; &nbsp;
                    <a href='youtube'> <i class="fab fa-youtube"></i></a>&nbsp; &nbsp;
                    <a href='twitter'> <i class="fab fa-twitter"></i></a>
                </div>

            </div>
        );
    }
}

export default Social;
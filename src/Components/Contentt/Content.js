import React, { Component } from 'react';
import Example from './Carousel/Carousel';
import LastestProducts from './LastestProducts/LastestProducts';
import ViewAll from './ViewAll/ViewAll';

class Content extends Component {
    render() {
        return (
            <div className='mt-5 picture-cover'>
                <Example/>
                <LastestProducts/>
                {/*<ViewAll/>*/}
            </div>
        );
    }
}

export default Content;
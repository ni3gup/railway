import React from 'react'
import { Carousel } from 'react-bootstrap';

import Mumbai from '../images/mumbai.jpg';
import Kolkata from '../images/kolkata.jpg';
import Varanasi from '../images/varanasi.jpg';
import Bangalore from '../images/bangalore.jpg';

const Slider = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-block w-100" src={Mumbai} width="1110" height="547" alt="First slide" />
                <Carousel.Caption>
                    <h3>Mumbai</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={Varanasi} width="1110" height="547" alt="First slide" />
                <Carousel.Caption>
                    <h3>Varanasi</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={Bangalore} width="1110" height="547" alt="First slide" />
                <Carousel.Caption>
                    <h3>Bangalore</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={Kolkata} width="1110" height="547" alt="First slide" />
                <Carousel.Caption>
                    <h3>Kolkata</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Slider

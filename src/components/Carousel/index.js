import Carousel from 'react-bootstrap/Carousel';
import Image1 from '../../assets/images/carousel1.png';
import Image2 from '../../assets/images/carousel2.png';
import Image3 from '../../assets/images/carousel3.png';

export function CarouselHome() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' src={Image1} alt='First slide' />
        <Carousel.Caption>
          <h3>Online Flight Planning App</h3>
          <p>Designed to make pilot's life easier</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={Image2} alt='Second slide' />

        <Carousel.Caption>
          <h3>Reliable Weather Information</h3>
          <p>METAR and TAF weather data</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={Image3} alt='Third slide' />

        <Carousel.Caption>
          <h3>Flight Record System</h3>
          <p>Record all your flights and aircrafts in one place</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

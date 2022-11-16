import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import image from '../Images/MainPage_1.png';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sliderImage_1 from "../Images/slider1.png"
import sliderImage_2 from "../Images/slider2.png"
import sliderImage_3 from "../Images/slider3.png"

function FirstMainBlock() {
    return(
        <>
            <Card
                className="bg-dark text-white mb-3"
                style = {{ "height": "496px" }}>
                <Card.Img src={image} alt="Card image" style = {{ "height": "496px" }}/>
                <Card.ImgOverlay>
                    <Container>
                            <Row>
                                <Col>
                                    <h1
                                        style = {{ "height": "118x", "width": "579px",  marginTop: "80px"}}>
                                        Amet minim mollit non deserunt ullamco.
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <InputGroup style = {{ "height": "70px", "width": "795px", marginLeft: "100px" }}>
                                        <Form.Control
                                            placeholder = "Введите текст.."
                                            aria-label = "Введите текст.."
                                            aria-describedby="basic-addon2"/>
                                        <Button
                                            variant="outline-secondary"
                                            style = {{ "height": "70px", "width": "125px", marginLeft: "0px" }}>
                                            Поиск
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                    </Container>
                </Card.ImgOverlay>
            </Card>
        </>
    );
}

function ProjectsSlider() {
    return(
        <>
            <Carousel style = {{"height": "600px"}} className = "mb-3">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={sliderImage_1}
                        alt="First slide"
                        style = {{"height": "600px"}}
                    />
                    <Carousel.Caption>
                        <h3>Саня!</h3>
                        <p>Здарова брат!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={sliderImage_2}
                        alt="Second slide"
                        style = {{"height": "600px"}}
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={sliderImage_3}
                        alt="Third slide"
                        style = {{"height": "600px"}}
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
}

export default function Main() {
    return (
        <div>
            <FirstMainBlock/>
            <div>
                <Card
                    bg="primary"
                    text="white"
                    style={{ "width": "440px", "height": "56px" }}
                    className="mb-2 ms-3 w-600">
                    <h1 className="text-center">Новости</h1>
                </Card>
            </div>
            <ProjectsSlider/>
        </div>
    );
}

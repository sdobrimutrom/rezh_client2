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

function FirstMainBlock() {
    return(
        <>
            <Card className="bg-dark text-white">
                <Card.Img src={image} alt="Card image" />
                <Card.ImgOverlay>
                    <Container>
                        <Row>
                            <Col>
                                <Card.Title className="fs-1 fw-bold">Amet minim mollit non deserunt ullamco.</Card.Title>
                            </Col>
                        </Row>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <InputGroup size="sm">
                                        <Form.Control
                                            placeholder = "Введите текст.."
                                            aria-label = "Введите текст.."
                                            aria-describedby="basic-addon2"/>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <Button variant="outline-secondary" size="sm">
                                        Поиск
                                    </Button>
                                </Col>
                                <Col>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Container>
                </Card.ImgOverlay>
            </Card>
        </>
    );
}

function ProjectsSlider() {
    return(
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ytimg.com/vi/NKk6rGDpq6Y/sddefault.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Саня!</h3>
                        <p>Здарова брат!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ytimg.com/vi/NKk6rGDpq6Y/sddefault.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://i.ytimg.com/vi/NKk6rGDpq6Y/sddefault.jpg"
                        alt="Third slide"
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
            <ProjectsSlider/>
        </div>
    );
}

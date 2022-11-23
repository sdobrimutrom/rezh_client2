import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import image from '../Images/MainPage_1.png';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sliderImage_1 from "../Images/slider1.png";
import sliderImage_2 from "../Images/slider2.png";
import sliderImage_3 from "../Images/slider3.png";
import newsImage_1 from "../Images/News1.png";
import newsImage_2 from "../Images/News2.png";
import newsImage_3 from "../Images/News3.png";

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
                                <Col>
                                    <div className="list-group me-3" style = {{ "width": "355px", marginTop: "80px" }}>
                                        <a href="#!"
                                           className="list-group-item list-group-item-action list-group-item-secondary">Dapibus
                                            ac facilisis in</a>
                                        <a href="#!"
                                           className="list-group-item list-group-item-action list-group-item-secondary">Dapibus
                                            ac facilisis in</a>
                                        <a href="#!"
                                           className="list-group-item list-group-item-action list-group-item-secondary">Dapibus
                                            ac facilisis in</a>
                                    </div>

                                </Col>
                            </Row>
                    </Container>
                </Card.ImgOverlay>
            </Card>
        </>
    );
}

function NewsBlock() {
    return(
        <>
            <Container className = "ms-2" fluid>
                <Row>
                    <Col>
                        <h1 style={{ "width": "440px", "height": "56px" }}
                            className="text-center ms-3 bg-secondary text-white">
                            Фильтры</h1>
                        <div className = "ms-3 mt-0" style={{ "width":"440px" }}>
                            <Form.Select aria-label = "default">
                                <option>Тип</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select aria-label = "default">
                                <option>Все сферы</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select aria-label = "default">
                                <option>Источник</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Form.Select aria-label = "default">
                                <option>Период публикации</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>

                        <button type="button" className="btn btn-secondary text-center ms-3 w-600" style = {{ "width": "440px", "height": "77px" }}>Показать</button>
                    </Col>
                    <Col className = "me-3">
                        <Card className="bg-dark text-white mb-3">
                            <Card.Img src={newsImage_1} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Header>*Время* *Сфера*</Card.Header>
                                <Card.Text className="align-text-top">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white mb-3 ms-0" >
                            <Card.Img src={newsImage_2} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Header>*Время* *Сфера*</Card.Header>
                                <Card.Text className="align-text-top">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white mb-3">
                            <Card.Img src={newsImage_3} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Header>*Время* *Сфера*</Card.Header>
                                <Card.Text className="align-text-top">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className = "d-flex justify-content-end mb-3 me-3">
                <button type="button" className="btn btn-secondary">Перейти к новостям</button>
            </div>
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
                    className="text-center ms-3 bg-secondary text-white mb-3 ms-3 w-600"
                    style={{ "width": "440px", "height": "56px" }}>
                    <h1>Новости</h1>
                </Card>
            </div>
            <NewsBlock/>
            <ProjectsSlider/>
        </div>
    );
}

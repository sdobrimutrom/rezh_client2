import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import image from '../Images/MainPage_1.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import sliderImage_1 from "../Images/slider1.png";
import newsImage_1 from "../Images/News1.png";
import newsImage_2 from "../Images/News2.png";
import newsImage_3 from "../Images/News3.png";
import { useNavigate } from 'react-router-dom';



function FirstMainBlock() {
    return (
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
                                        Электронный портал города Реж
                                    </h1>
                                </Col>
                            </Row>
                    </Container>
                </Card.ImgOverlay>
            </Card>
        </>
    );
}

function NewsBlock() {
    const navigate = useNavigate()
    return(
        <>
            <Container className = "ms-2" fluid>
                <Row>
                    <Col>
                        <Card
                            className="text-center bg-secondary text-white mb-3 w-600"
                            style={{ "width": "440px", "height": "56px" }}>
                            <h1>Новости</h1>
                        </Card>
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

                        <button type="button" className="btn btn-secondary text-center ms-3" style = {{ "width": "440px", "height": "77px" }}>
                            <h1>Показать</h1>
                        </button>
                    </Col>
                    <Col className = "me-3">
                        <Card className="bg-dark text-white mb-3">
                            <Card.Img src={newsImage_1} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Header>
                                    <span className="border rounded border-primary bg-primary text-white me-2">15 октября</span>
                                    <span className="border rounded border-light bg-light text-black">Образование</span>
                                </Card.Header>
                                <span className="align-self-end mb-3 text-black">Был произведён ремонт школьной библиотеки.</span>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white mb-3" >
                            <Card.Img src={newsImage_2} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Header>
                                    <span className="border rounded border-primary bg-primary text-white me-2">8 декабря</span>
                                    <span className="border rounded border-light bg-light text-black">Спорт</span>
                                </Card.Header>
                                <Card.Text className="align-self-end mb-3">Прошло собрание тренеров нашего города.</Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white mb-3">
                            <Card.Img src={newsImage_3} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Header>
                                    <span className="border rounded border-primary bg-primary text-white me-2">15 ноября</span>
                                    <span className="border rounded border-light bg-light text-black">Политика</span>
                                </Card.Header>
                                <Card.Text className="align-text-bottom">Наш город посетил губернатор области.</Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div className = "d-flex justify-content-end mb-3 me-3">
                <button type="button" className="btn btn-secondary" onClick={ () => navigate('/news') }>Перейти к новостям</button>
            </div>
        </>
    );
}

// function ProjectsSlider() {
//     return(
//         <>
//             <Carousel style = {{"height": "600px"}} className = "mb-3">
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src={sliderImage_1}
//                         alt="First slide"
//                         style = {{"height": "600px"}}
//                     />
//                     <Carousel.Caption>
//                         <h3>Title</h3>
//                         <p>Text</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src={sliderImage_1}
//                         alt="Second slide"
//                         style = {{"height": "600px"}}
//                     />
//
//                     <Carousel.Caption>
//                         <h3>Second slide label</h3>
//                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src={sliderImage_1}
//                         alt="Third slide"
//                         style = {{"height": "600px"}}
//                     />
//
//                     <Carousel.Caption>
//                         <h3>Third slide label</h3>
//                         <p>
//                             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//                         </p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             </Carousel>
//         </>
//     );
// }

export default function Main() {
    return (
        <div>
            <FirstMainBlock/>
            <NewsBlock/>
        </div>
    );
}

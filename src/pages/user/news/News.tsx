import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import newsImage_1 from "../Images/News1.png";

import NewsItem from '../../../components/news/NewsItem';
import { INews } from '../../../store/models/INews';

export default function News() {
    const newsMocks: INews[] = [
        {
            id: 1,
            title: 'Media heading',
            content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
            image: 'https://thumbs.dreamstime.com/b/wispy-clouds-horizontal-sky-panorama-high-altitude-wind-swept-blue-147437736.jpg',
            created_by: 1,
        },
        {
            id: 2,
            title: 'Media heading',
            content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
            image: 'https://thumbs.dreamstime.com/b/wispy-clouds-horizontal-sky-panorama-high-altitude-wind-swept-blue-147437736.jpg',
            created_by: 1,
        },
        {
            id: 3,
            title: 'Media heading',
            content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
            image: 'https://thumbs.dreamstime.com/b/wispy-clouds-horizontal-sky-panorama-high-altitude-wind-swept-blue-147437736.jpg',
            created_by: 1,
        },
        {
            id: 4,
            title: 'Media heading',
            content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
            image: 'https://thumbs.dreamstime.com/b/wispy-clouds-horizontal-sky-panorama-high-altitude-wind-swept-blue-147437736.jpg',
            created_by: 1,
        },
        {
            id: 5,
            title: 'Media heading',
            content: 'Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.',
            image: 'https://thumbs.dreamstime.com/b/wispy-clouds-horizontal-sky-panorama-high-altitude-wind-swept-blue-147437736.jpg',
            created_by: 1,
        }
    ];

    function SearchButton() {
        return(
            <>
                <InputGroup className = "mb-3">
                    <Form.Control
                        placeholder = "Введите текст.."
                        aria-label = "Введите текст.."
                        aria-describedby="basic-addon2"
                        className='w-50'
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                        Поиск
                    </Button>
                </InputGroup>
            </>
        )
    }

    function SelectSort() {
        return(
            <>
                <Form.Select aria-label="Default select example" className="mb-3">
                    <option>Сортировать</option>
                    <option value="1">По заголовку</option>
                    <option value="2">По дате</option>
                    <option value="3">По номеру</option>
                </Form.Select>
            </>
        )
    }

    return (
        <div>
            <div className="page-header ms-3">
                <h1>Новости</h1>
            </div>
            <div>
                <Container className="justify-content-md-center">
                    <Row>
                        <Col><SearchButton/></Col>
                    </Row>
                    <Row>
                        <Col><SelectSort/></Col>
                        <Col><Button variant="outline-primary" className="mb-3">Очистить фильтры</Button>{' '}</Col>
                    </Row>
                </Container>
            </div>
            <div>
                {newsMocks.map((newsItem: INews) => {
                    return <NewsItem news={newsItem} key={newsItem.id} />;
                })}
            </div>
        </div>
    );
}

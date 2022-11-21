import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { INews } from '../store/models/INews';

interface NewsItemProps {
    news: INews;
}

export default function NewsItem({ news }: NewsItemProps) {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" width={171} height={180} src={news.image} />
            <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.content}</Card.Text>
                <Button variant="primary">Читать далее</Button>
            </Card.Body>
            <Card.Footer className="text-muted">createdAt</Card.Footer>
        </Card>
    );

}

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';

interface NewsItemProps {
    id: number;
    title: string;
    createdAt: Date;
    text: string;
    img: string;
}

export default function NewsItem({ id, title, createdAt, text, img }: NewsItemProps) {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" width={171} height={180} src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button variant="primary">Читать далее</Button>
            </Card.Body>
            <Card.Footer className="text-muted">createdAt</Card.Footer>
        </Card>
    );

}

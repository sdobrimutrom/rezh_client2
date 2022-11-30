import React from 'react';
import Card from 'react-bootstrap/Card';
import { IRequest } from '../store/models/IRequest';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import AccordionItem from 'react-bootstrap/AccordionItem';

interface NewsItemProps {
    request: IRequest;
}

export default function RequestItem({ request }: NewsItemProps) {
    return (
        <Card className="mb-3">
            <Card.Header>
                <Card.Text>Дата: { request?.createdAt?.toString() }</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Title>{ request?.title }</Card.Title>
                <Card.Text>{ request?.text }</Card.Text>
            </Card.Body>
            <Card.Body>
                { request?.files?.map(file =>
                    <a className={ 'text-decoration-none d-block' } href={ `${file}` } key={ file }>
                        Файл: { file }</a>
                ) }
            </Card.Body>
            <Accordion>
                <AccordionHeader>Данные пользователя</AccordionHeader>
                <AccordionBody>
                    <AccordionItem eventKey={'email'}>{request?.email}</AccordionItem>
                    <AccordionItem eventKey={'email'}>{request?.first_name}</AccordionItem>
                    <AccordionItem eventKey={'email'}>{request?.second_name}</AccordionItem>
                    <AccordionItem eventKey={'email'}>{request?.father_name}</AccordionItem>
                </AccordionBody>
            </Accordion>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
    );

}

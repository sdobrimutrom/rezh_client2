import React from 'react';
import Card from 'react-bootstrap/Card';
import { IRequest } from '../../store/models/IRequest';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import { getFileURL } from '../../helpers/url.helper';
import { moderatingText } from '../../helpers/consts';
import { useModerateRequestMutation } from '../../store/api/requests.api';
import Button from 'react-bootstrap/Button';
import RequestItemModerate from './RequestItemModerate';
import RequestItemAnswer from './RequestItemAnswer';

interface NewsItemProps {
    request: IRequest;
    withModeratingUI?: boolean;
    withAnsweringUI?: boolean;
}

export default function RequestItem({ request, withModeratingUI = false, withAnsweringUI = false }: NewsItemProps) {
    return (
        <Card className={ 'p-0' }>
            <Card.Header className={ 'd-flex flex-row justify-content-between' }>
                <Card.Text>Дата: { request?.updatedAt?.toString() }</Card.Text>
                <Card.Text>Статус: { moderatingText(request?.approved, request?.moderated) }</Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Title>Обращение{ request?.deputat_id && ` к ${ request?.deputat_id }` }</Card.Title>
                <Card.Subtitle>{ request?.title }</Card.Subtitle>
                <Card.Text>{ request?.text }</Card.Text>
            </Card.Body>
            { request?.files && <Accordion>
              <AccordionHeader>Приложения к обращению</AccordionHeader>
              <AccordionBody>
                  { request?.files?.map(file =>
                      <a className={ 'text-decoration-none d-block' } href={ `${ getFileURL(file) }` } key={ file }>
                          Файл: { file }</a>,
                  ) }
              </AccordionBody>
            </Accordion> }
            <Accordion>
                <AccordionHeader>Данные пользователя</AccordionHeader>
                <AccordionBody>
                    <Card.Text>{ request?.email }</Card.Text>
                    <Card.Text>{ request?.first_name }</Card.Text>
                    <Card.Text>{ request?.second_name }</Card.Text>
                    <Card.Text>{ request?.father_name }</Card.Text>
                    <Card.Text>{ request?.phone_number }</Card.Text>
                    <Card.Text>{ request?.organization_name }</Card.Text>
                </AccordionBody>
            </Accordion>
            { request?.answer && <Accordion>
              <AccordionHeader>Ответ на обращение</AccordionHeader>
              <AccordionBody>
                <Card.Subtitle>
                    { `Ответил: ` +
                        `${ request?.answer?.user?.second_name } ` +
                        `${ request?.answer?.user?.first_name } ` +
                        `${ request?.answer?.user?.father_name } ` +
                        `Email: ${ request?.answer?.user?.email }` }
                </Card.Subtitle>
                <Card.Text>{ request?.answer.text }</Card.Text>
                  { request.answer.files && <Accordion>
                    <AccordionHeader>Приложения к ответу</AccordionHeader>
                    <AccordionBody>
                        { request?.answer.files?.map(file =>
                            <a className={ 'text-decoration-none d-block' } href={ `${ getFileURL(file) }` }
                               key={ file }>
                                Файл: { file }</a>,
                        ) }
                    </AccordionBody>
                  </Accordion> }
              </AccordionBody>
            </Accordion> }
            { withModeratingUI && request?.id && <RequestItemModerate id={ request?.id } /> }
            { withAnsweringUI && request?.id && <RequestItemAnswer id={ request?.id } /> }
        </Card>
    );

}

import React from 'react';
import Card from 'react-bootstrap/Card';
import { IRequest } from '../../../store/models/IRequest';
import { Accordion } from 'react-bootstrap';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import { getFileURL } from '../../../helpers/url.helper';
import { moderatingText } from '../../../helpers/consts';
import RequestItemModerate from './RequestItemModerate';
import RequestItemAnswer from './RequestItemAnswer';
import { getDateString } from '../../../helpers/date.helper';
import AccordionItem from 'react-bootstrap/AccordionItem';

interface NewsItemProps {
    request: IRequest;
    withModeratingUI?: boolean;
    withAnsweringUI?: boolean;
}

export default function RequestItem({ request, withModeratingUI = false, withAnsweringUI = false }: NewsItemProps) {
    return (
        <Card className={ 'p-0' }>
            <Card.Header className={ 'd-flex flex-row justify-content-between' }>
                <Card.Text>Дата обращения: { getDateString(request?.updatedAt) }</Card.Text>
                <Card.Text>
                    { 'Статус:' } { moderatingText(request?.approved, request?.moderated) }
                    { request?.moderating_text &&
                      <div className={ 'text-wrap' }>{ `Причина: ${ request?.moderating_text }` }</div> }
                </Card.Text>
            </Card.Header>
            <Card.Body>
                <Card.Title>Обращение{ request?.deputat_id && ` к ${ request?.deputat_id }` }</Card.Title>
                <Card.Subtitle>{ request?.title }</Card.Subtitle>
                <Card.Text>{ request?.text }</Card.Text>
            </Card.Body>
            <Accordion flush alwaysOpen>
                { !!request?.files?.length &&
                  <AccordionItem eventKey={ '1' }>
                    <AccordionHeader>Приложения к обращению</AccordionHeader>
                    <AccordionBody>
                        { request?.files?.map(file =>
                            <a className={ 'text-decoration-none d-block' } href={ `${ getFileURL(file) }` }
                               key={ file }>
                                Файл: { file }</a>,
                        ) }
                    </AccordionBody>
                  </AccordionItem> }
                { (request?.email || request?.first_name || request?.second_name
                        || request?.father_name || request?.phone_number || request?.organization_name)
                    && <AccordionItem eventKey={ '2' }>
                    <AccordionHeader>Данные пользователя</AccordionHeader>
                    <AccordionBody>
                        { request?.email && <Card.Text>{ `Электронная почта: ${ request?.email }` }</Card.Text> }
                        { (request?.first_name || request?.second_name || request?.father_name)
                            && <Card.Text>
                                { `ФИО: ${ request?.first_name } ${ request?.second_name } ${ request?.father_name }` }
                          </Card.Text> }
                        { request?.phone_number &&
                          <Card.Text>{ `Номер телефона: ${ request?.phone_number }` }</Card.Text> }
                        { request?.organization_name &&
                          <Card.Text>{ `Название организации: ${ request?.organization_name }` }</Card.Text> }
                    </AccordionBody>
                  </AccordionItem> }
                { request?.answer &&
                  <AccordionItem eventKey={ '3' }>
                    <AccordionHeader>Ответ на обращение</AccordionHeader>
                    <AccordionBody>
                      <Card.Text>Дата ответа: { getDateString(request?.answer?.updatedAt) }</Card.Text>
                        { (request?.answer?.user?.first_name || request?.answer?.user?.second_name ||
                                request?.answer?.user?.father_name || request?.answer?.user?.email) &&
                          <Card.Subtitle>
                              { `Ответил: ` +
                                  `${ request?.answer?.user?.second_name || '' } ` +
                                  `${ request?.answer?.user?.first_name || '' } ` +
                                  `${ request?.answer?.user?.father_name || '' } ` +
                                  `Email: ${ request?.answer?.user?.email || '' }` }
                          </Card.Subtitle> }
                      <Card.Text>{ request?.answer.text }</Card.Text>
                        { !!request.answer?.files?.length && <Accordion>
                          <AccordionItem eventKey={ '4' }>
                            <AccordionHeader>Приложения к ответу</AccordionHeader>
                            <AccordionBody>
                                { request?.answer.files?.map(file =>
                                    <a className={ 'text-decoration-none d-block' } href={ `${ getFileURL(file) }` }
                                       key={ file }>
                                        Файл: { file }</a>,
                                ) }
                            </AccordionBody>
                          </AccordionItem>
                        </Accordion> }
                    </AccordionBody>
                  </AccordionItem> }
            </Accordion>
            { withModeratingUI && request?.id && <RequestItemModerate id={ request?.id } /> }
            { withAnsweringUI && request?.id && <RequestItemAnswer id={ request?.id } /> }
        </Card>
    );
}

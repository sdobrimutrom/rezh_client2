import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { IRequest } from '../../../store/models/IRequest';

interface RequestItemEditProps {
    id: number;
    request: IRequest;
}

export default function RequestItemEdit({ id, request }: RequestItemEditProps) {
    const navigate = useNavigate();
    const toEdit = () => {
        navigate(`/requests/${ id }`);
    };

    return (
        <Card.Footer className={ 'd-flex flex-row p-2 justify-content-end' }>
            <Button disabled={ !!request?.answer } onClick={ toEdit } variant={ 'dark' }
                    className={ '' }>Редактировать</Button>
        </Card.Footer>
    );
}
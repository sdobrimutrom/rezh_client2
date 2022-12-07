import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

interface RequestItemAnswerProps {
    id: number;
}

export default function RequestItemAnswer({ id }: RequestItemAnswerProps) {
    const navigate = useNavigate();
    const toAnswer = () => {
        navigate(`/deputat/requests/${ id }`);
    };

    return (
        <Card.Footer className={ 'd-flex flex-row p-2 justify-content-end' }>
            <Button onClick={ toAnswer } variant={ 'dark' } className={ '' }>Ответить</Button>
        </Card.Footer>
    );
}
import React, { ChangeEvent, useState } from 'react';
import { useModerateRequestMutation } from '../../store/api/requests.api';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Alert, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';

interface RequestItemModerateProps {
    id: number;
}

export default function RequestItemModerate({ id }: RequestItemModerateProps) {
    const [moderateRequest, moderateMeta] = useModerateRequestMutation();
    const approveRequest = () => {
        moderateRequest({
            id,
            moderated: true,
            approved: true,
            moderating_text: undefined,
        });
    };
    const declineRequest = (moderating_text: string) => {
        moderateRequest({
            id,
            moderated: true,
            approved: false,
            moderating_text,
        });
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card.Footer className={ 'd-flex flex-row p-2 gap-2 justify-content-end' }>
            <Button onClick={ handleOpen } variant={ 'danger' } className={ '' }>Отклонить</Button>
            <Button onClick={ approveRequest } variant={ 'success' } className={ '' }>Принять</Button>
            <DeclineRequestModal open={ open } handleClose={ handleClose } declineRequest={ declineRequest } />
        </Card.Footer>
    );
}

interface DeclineRequestModalProps {
    open: boolean;
    handleClose: () => void;
    declineRequest: (moderating_text: string) => void;
}

function DeclineRequestModal({ open, handleClose, declineRequest }: DeclineRequestModalProps) {
    const [moderatingText, setModeratingText] = useState<string>('');

    const handleModeratingTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setModeratingText(e.target.value);
    };

    const handleDeclineClick = () => {
        declineRequest(moderatingText);
        handleClose();
    };

    return (
        <Modal show={ open } onHide={ handleClose }>
            <Modal.Header>
                <Modal.Title>Отклонить обращение</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant={'info'}>Укажите причину отклонения обращения</Alert>
                <FormGroup>
                    <FormLabel>Причина отклонения</FormLabel>
                    <FormControl type={ 'text' } onChange={ handleModeratingTextChange }
                                 placeholder={ 'Укажите причину отклонения' } />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ handleDeclineClick } variant={ 'danger' } type={ 'submit' }>
                    Отклонить
                </Button>
                <Button variant={ 'outline-dark' } onClick={ handleClose }>
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
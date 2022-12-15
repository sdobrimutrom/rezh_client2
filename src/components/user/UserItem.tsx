import React, { useState } from 'react';
import { IUser } from '../../store/models/IUser';
import Card from 'react-bootstrap/Card';
import { getFileURL } from '../../helpers/url.helper';
import { Alert, Image } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
    CaretDownFill, CaretUpFill,
} from 'react-bootstrap-icons';
import { Controller } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

interface IUserItemProps {
    user: IUser;
}

const UserItem: React.FC<IUserItemProps> = ({ user }) => {
    const [isWrapped, setIsWrapped] = useState<boolean>(false);
    const handleIsWrappedChange = (value: boolean) => () => {
        setIsWrapped(value);
    };

    return (
        <Card className={ 'p-0' }>
            <Card.Body className={ 'p-0 d-flex flex-row justify-content-between' }>
                <Col className={ 'flex-grow-0' }>
                    <Image width={ 150 } height={ 150 } rounded src={ getFileURL(user?.avatar) } />
                </Col>
                <Col className={ 'd-flex flex-column justify-content-between' }>
                    <Card.Text className={ 'px-5 pt-3' }>
                        <h4 className={ 'd-flex flex-row gap-1 align-items-center justify-content-start' }>
                            { `${ user?.second_name } ${ user?.first_name } ${ user?.father_name }` }
                        </h4>
                    </Card.Text>
                    <Card.Text className={ 'px-5' }>
                        <h6 className={ 'd-flex flex-row gap-1 align-items-center justify-content-start' }>
                            <b>Сфера:</b>
                            { `Образование` }
                        </h6>
                    </Card.Text>
                    { isWrapped ?
                        <Button onClick={ handleIsWrappedChange(false) } variant={ 'light w-100' }>
                            Скрыть <CaretUpFill />
                        </Button> :
                        <Button onClick={ handleIsWrappedChange(true) } variant={ 'light w-100' }>
                            Подробнее <CaretDownFill />
                        </Button>
                    }
                </Col>
            </Card.Body>
            { isWrapped && <Card.Footer className={'p-0 pt-3'}>
              <Card.Text className={'px-4'}>
                <h6 className={ 'd-flex flex-row gap-1 align-items-center justify-content-start' }>
                  <b>Электронная почта:</b>
                    { `${ user?.email }` }
                </h6>
              </Card.Text>
              <Card.Text className={'px-4'}>
                <h6 className={ 'd-flex flex-row gap-1 align-items-center justify-content-start' }>
                  <b>Контактный номер:</b>
                    { `${ user?.phone_number }` }
                </h6>
              </Card.Text>
              <Card.Text>
                <Alert variant={ 'info' }
                       className={ 'p-4 border border-0 rounded-0 rounded-bottom my-0' }>
                  <b>Информация о пользователе</b>
                  <div className={ 'pt-2' }>
                      { user?.description || 'Не указано' }
                  </div>
                </Alert>
              </Card.Text>
            </Card.Footer> }
        </Card>
    );
};

export default UserItem;
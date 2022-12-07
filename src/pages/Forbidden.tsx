import { useNavigate } from 'react-router-dom';

export default function Forbidden() {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">403</h1>
                <p className="fs-3">
                    <span className="text-danger">Упс!</span>Доступ запрещён.
                </p>
                <p className="lead">
                    Доступ к этой странице Вам запрещён.
                </p>
                <button type="button" className="btn btn-primary" onClick={ () => navigate('/') }>На главную</button>
            </div>
        </div>
    );
}

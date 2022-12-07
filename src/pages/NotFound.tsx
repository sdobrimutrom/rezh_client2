import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3">
                    <span className="text-danger">Упс!</span>Страница не найдена.
                </p>
                <p className="lead">
                    Страница, которую вы ищете - не существует.
                </p>
                <button type="button" className="btn btn-primary" onClick={ () => navigate('/') }>На главную</button>
            </div>
        </div>
    );
}

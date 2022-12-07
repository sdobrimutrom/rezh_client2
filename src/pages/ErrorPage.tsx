import { useNavigate } from 'react-router-dom';

export default function ErrorPage({ error }: { error: Error }) {
    const navigate = useNavigate();
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3">
                    <span className="text-danger">Упс!</span>Произошла непредвиденная ошибка.
                </p>
                <p className="lead">
                    { error.message }
                </p>
                <button type="button" className="btn btn-primary" onClick={ () => navigate('/') }>На главную</button>
            </div>
        </div>
    );
}
// TODO: стилизовать

export default function ErrorPage({ error }: { error: Error }) {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">400</h1>
                <p className="fs-3">
                    <span className="text-danger">Упс!</span>Произошла непредвиденная ошибка.
                </p>
                <p className="lead">
                    { error.message }
                </p>
                <a role={'button'} href={'/'} className="btn btn-primary">На главную</a>
            </div>
        </div>
    );
}

import { useParams } from 'react-router-dom';

export default function NewsItem() {
    const { id } = useParams();
    return <div>NewsItem c id: {id}</div>;
}

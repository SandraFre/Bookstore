import {useParams} from "react-router-dom";

export default ()=> {
    const {bookId} = useParams();

    return(
        <div>
            Book id: {bookId}
        </div>
    )
}
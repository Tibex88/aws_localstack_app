import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => {
    return (
        <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
}


export {LoadingSpinner}
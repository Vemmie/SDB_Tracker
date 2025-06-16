import EditForm from "../components/EditForm";
import { useParams } from "react-router-dom";

function EditPage() {
    const { id } = useParams();
    return(
        <>
            <h2>SBD Tracker</h2>
            <p>Edit Workout</p>
            <EditForm id={ id }/>
        </>
    )
}

export default EditPage;
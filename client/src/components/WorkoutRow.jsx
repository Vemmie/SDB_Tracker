import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import '../styles/Table.css'
import { Link } from "react-router-dom";

function WorkoutRow({workout, onDelete, showLiftName}){

    return(
        <tr>
            {showLiftName && <td>{workout.name}</td>}
            <td>{workout.date}</td>
            <td>{workout.reps}</td>
            <td>{workout.weight}</td>
            <td>{workout.unit}</td>
            <td className="trashCell">
                <FaRegTrashAlt onClick={() => onDelete(workout._id)} />
                <Link to={`/edit/${ workout._id }`}><MdOutlineModeEditOutline /></Link>
            </td>
        </tr>
    )
}

export default WorkoutRow;
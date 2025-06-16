import { useState } from "react";
import '../styles/Form.css';
import { useNavigate } from "react-router-dom";

// this is the form component for registration info
function EditForm({ id }) {

    // useState to handle form inputs 
    // one for name and one for email
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("lbs");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const handleEdit = async(e) => {
        e.preventDefault();

        const editInfo = {
            reps: reps,
            weight: weight,
            unit: unit,
            date: date,
        }

        const response = await fetch(`/exercises/${ id }`, {
            method: 'PUT',
            body: JSON.stringify(editInfo),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200 ) {
            alert(`Edited ${ id }`);
            navigate(-1);
        } else if ( response.status === 404 ) {
            alert(`Not found: ${ id }`);
        } else {
            const error = await response.json();
            alert(`Failed to edit workout, ${error.error}`);
        }
    };

    // returns a form where the inputs on change will update the value of there state respectively
    // then the click button handles the submit and the default function is prevented
    return(
        <form>
            <fieldset>
                <legend>Edit</legend>

                    <div className="form">
                        <label> Reps: 
                            <input 
                            type="number" value={ reps } 
                            onChange={ (e) => setReps(e.target.valueAsNumber)} 
                            min="1"
                            required
                            />
                        </label>
                    </div>

                    <div className="form">
                        <label> Weight: 
                            <input 
                            type="number" value={ weight } 
                            onChange={ (e) => setWeight(e.target.valueAsNumber)} 
                            min="1"
                            required
                            />
                        </label>
                    </div>

                    <div className="form">
                        <label>
                            Unit:
                            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                            </select>
                        </label>
                    </div>

                    <div className="form">
                        <label> Date: 
                            <input 
                            type="text" value={ date } 
                            onChange={ (e) => setDate(e.target.value)} 
                            pattern="\d{2}-\d{2}-\d{2}"
                            placeholder="MM-DD-YY"
                            required
                            />
                        </label>
                    </div>

            </fieldset>
            <button onClick={ handleEdit }>
                Submit
            </button>
        </form>
    )
}

export default EditForm;
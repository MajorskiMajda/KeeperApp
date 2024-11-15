import React, {useState, useEffect} from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


export function Note(props) {

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

        useEffect(() => {
        fetch('http://localhost:5001/notes')  
            .then((response) => response.json())
            .then((data) => {
                setNotes(data);       
                setLoading(false);     
            })
            .catch((error) => {
                console.error('Error fetching contacts:', error);
                setLoading(false);        
            });

    }, []);


    function handleClick(event) {
        props.onDelete(props.id);
        console.log(props.id);
        console.log("Note ID to delete: ", props.id);
    }


    return (
        <div className='note'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => props.onDelete(props.id)}><DeleteForeverRoundedIcon style={{ backgroundColor: 'white' }} /></button>

        </div>
    )
}
export default Note;

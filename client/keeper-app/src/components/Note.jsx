import React from 'react';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export function Note(props) {
    return (
        <div className='note'>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={() => props.onDelete(props.id)}>
                <DeleteForeverRoundedIcon style={{ backgroundColor: 'white' }} />
            </button>
        </div>
    );
}

export default Note;

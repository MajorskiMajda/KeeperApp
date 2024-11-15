import React, { useState } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import './css/createArea.css';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export function CreateArea(props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAddNote = async (title, content) => {
        if (!title || !content) {
            setError("Title and content are required!");
            return;
        }


        props.onAdd(title, content);


        setTitle('');
        setContent('');
        setError('');
        setSuccess(true);

        setSuccess('Note added successfully!');
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };

    function expand() {
        setIsExpanded(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleAddNote(title, content);
    };

    return (
        <div>
            <div className="message-div">
                {error && (
                    <p className="message error">
                        <WarningRoundedIcon />
                        {error}
                    </p>
                )}
                {success && (
                    <p className="message success">
                        <CheckCircleRoundedIcon />
                        {success}
                    </p>
                )}
            </div>

            <form className="create-note" onSubmit={handleSubmit}>
                {isExpanded && (
                    <input
                        name="title"
                        onChange={handleTitleChange}
                        value={title}
                        placeholder="Title"
                    />
                )}
                <textarea
                    onClick={expand}
                    name="content"
                    onChange={handleContentChange}
                    value={content}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab className="button" type="submit">
                        <AddRoundedIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;

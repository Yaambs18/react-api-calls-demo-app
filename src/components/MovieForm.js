import { useState } from "react";

import "./MovieForm.css";

const initialState = {
    title: '',
    openingText: '',
    releaseDate: ''
}

const MovieForm = (props) => {
    const [formObj, setFormObj] = useState(initialState);

    const titleChangeHandler = (event) => {
        const title = event.target.value;
        setFormObj(prevState => {
            return {
                ...prevState,
                title
            }
        });
    }

    const openingTextChangeHandler = (event) => {
        const openingText = event.target.value;
        setFormObj(prevState => {
            return {
                ...prevState,
                openingText
            }
        });
    }

    const releaseDateChangeHandler = (event) => {
        const releaseDate = event.target.value;
        setFormObj(prevState => {
            return {
                ...prevState,
                releaseDate
            }
        });
    }

    const addFormHandler = (event) => {
        event.preventDefault();
        props.onAddMovie(formObj);
        setFormObj(initialState);
    }

    return (
        <form onSubmit={addFormHandler} className="movie-form">
            <div className="form-item">
                <label>Title</label>
                <input 
                    placeholder="Title" 
                    name="title" 
                    id="titile" 
                    type="text" 
                    onChange={titleChangeHandler}
                />
            </div>
            <div className="form-item">
                <label>Opening Text</label>
                <input placeholder="Opening Text" name="openingText" id="openingText" type="text-area" onChange={openingTextChangeHandler} />
            </div>
            <div className="form-item">
                <label>Release Date</label>
                <input name="releaseDate" id="releaseDate" type="date" onChange={releaseDateChangeHandler}/>
            </div>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}

export default MovieForm;
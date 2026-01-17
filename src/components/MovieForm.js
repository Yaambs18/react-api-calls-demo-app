import { useState } from "react";

import "./MovieForm.css";

const initialState = {
    title: '',
    openingText: '',
    releaseDate: ''
}

const MovieForm = (props) => {
    const [formObj, setFormObj] = useState(initialState);

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormObj(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
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
                    id="title" 
                    type="text" 
                    onChange={inputChangeHandler}
                    value={formObj.title}
                />
            </div>
            <div className="form-item">
                <label>Opening Text</label>
                <input placeholder="Opening Text" name="openingText" id="openingText" type="textarea" onChange={inputChangeHandler}
                    value={formObj.openingText}
                />
            </div>
            <div className="form-item">
                <label>Release Date</label>
                <input name="releaseDate" id="releaseDate" type="date" onChange={inputChangeHandler}
                    value={formObj.releaseDate}
                />
            </div>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}

export default MovieForm;
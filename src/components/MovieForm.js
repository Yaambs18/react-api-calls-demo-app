import { useRef, useState } from "react";

import "./MovieForm.css";

const initialState = {
    title: '',
    openingText: '',
    releaseDate: ''
}

const MovieForm = (props) => {
    const titleRef = useRef();
    const openingTextRef = useRef();
    const releaseDateRef = useRef();

    const addFormHandler = (event) => {
        event.preventDefault();
        const formObj = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        }
        props.onAddMovie(formObj);
        titleRef.current.value = '';
        openingTextRef.current.value = '';
        releaseDateRef.current.value = '';
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
                    ref={titleRef}
                />
            </div>
            <div className="form-item">
                <label>Opening Text</label>
                <input placeholder="Opening Text" name="openingText" id="openingText" type="textarea" ref={openingTextRef}
                />
            </div>
            <div className="form-item">
                <label>Release Date</label>
                <input name="releaseDate" id="releaseDate" type="date" ref={releaseDateRef}
                />
            </div>
            <button className="button" type="submit">Submit</button>
        </form>
    )
}

export default MovieForm;
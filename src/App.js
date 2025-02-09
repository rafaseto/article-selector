import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'

function App() {
    const [article, setArticle] = useState(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/article/${index}`)
            .then(response => {
                setArticle(response.data);
            })
            .catch(error => {
                console.log("Article not found", error);
            });
    }, [index]);

    const answer = (my_answer) => {
        let action;

        if (my_answer == 'accept') {
            action = 'accept';
        } else {
            action = 'reject';
        }

        axios.post(`http://localhost:5000/api/answer`, {
                index: index,
                action: action    
            })
            .then(response => {
                setIndex(index + 1);
            })
            .catch(error => {
                console.log("Error saving answer", error);
            })
    }

    if (!article) return <div>Loading...</div>

    return (
        <div className='container'>
            <h1 className='sticky-title'>{article.title}</h1>
            <div className='abstract-container'>
                <p>{article.abstract}</p>
            </div>
            <div className='button-container'>
                <button onClick={() => answer('accept')}>Accept</button>
                <button onClick={() => answer('reject')}>Reject</button>
            </div>
        </div>
    );
}

export default App;

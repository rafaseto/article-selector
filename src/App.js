import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [article, setArticle] = useState(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        axios.get(`/article/${index}`)
            .then(response => {
                setArticle(response.data);
            })
            .catch(error => {
                console.log("Article not found", error);
            })
    }, [index]);

    const answer = (my_answer) => {
        axios.post(`/answer`, {index: index, my_answer})
            .then(response => {
                alert(response.data.message);
                setIndex(index + 1);
            })
            .catch(error => {
                console.log("Error saving answer", error);
            })
    }

    if (!article) return <div>Loading...</div>

    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.abstract}</p>
            <button onClick={() => answer('accept')}>Accept</button>
            <button onClick={() => answer('reject')}>Reject</button>
        </div>
    );
}

export default App;

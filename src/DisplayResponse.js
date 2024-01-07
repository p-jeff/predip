import React, { useState, useEffect } from 'react';

function DisplayResponse() {
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const fetchAnswer = async () => {
            const response = await fetch('http://localhost:3001/getresponse');
            const data = await response.json();
            setAnswer(data.answer);
        };

        fetchAnswer();
    }, []);

    return (
        <div>
            <p>The last response was: {answer}</p>
        </div>
    );
}

export default DisplayResponse;

import React, { useState, useEffect } from 'react'

function App() {
    const [quiz, setQuiz] = useState([])
    const API = 'https://restcountries.eu/rest/v2/all'

    const displayQuest = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json()
            setQuiz(data)
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        displayQuest()
    }, [])
    return (
        <div>
            <h1>Country Quiz</h1>
            {quiz.map(
                data =>
                    <div>
                        <h5>{data.capital}</h5>
                        <img src={data.flag} />
                    </div>

            )}
        </div>
    )
}

export default App
import React, { useState } from 'react'

function Quiz() {
    const [quiz, setQuiz] = useState(
        {
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true
        }
    )

    // const loadQuiz = () => {
    //     const { currentIndex } = quiz;
    //     setQuiz(() => {
    //         return {
    //             question: 
    //         }
    //     })
    // }
    return (
        <div>

        </div>
    )
}

export default Quiz
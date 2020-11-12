import React from 'react'
// import Quiz from './component/Quiz';
import QuizData from './component/QuizData';

function App() {
    return (
        <>
            <main className='app'>
                <h1>Country Quiz</h1>
                <QuizData />
                {/* <Quiz /> */}
            </main>
            <div className="footer">By Alexis Lagodka © 2020</div>
        </>
    )
}
export default App
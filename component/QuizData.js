import React from 'react'

function QuizData(props) {
    const {
        randomCountry,
        randomOptions,
        handleClick,
        showNextButton,
        correctAnswer,
        handleNext,
        question,
    } = props

    return (
        <div className="Quiz-card" >
            <div className="wrapper">
                <div className="question-component">
                    {question === 0 && (
                        <div className="question-text1">
                            <img
                                className='flag'
                                src={randomCountry.flag}
                                alt="flag"
                            />
                            <h3 className="question">Which country does this flag belong to?</h3>
                        </div>
                    )}
                    {question === 1 && (
                        <h3 className="question2">
                            {randomCountry.capital} is the capital of
                        </h3>
                    )}
                    {question === 2 && (
                        <h3>{randomCountry.demonym} are people from</h3>
                    )}
                </div>
                <div>
                    <button ref={randomOptions[0] === randomCountry.name ? correctAnswer : null} onClick={handleClick} className="options" value={randomOptions[0]}>
                        <p className='letter'>A</p>
                        <p className='answer'>{randomOptions[0]}</p>
                    </button>
                    <button ref={randomOptions[1] === randomCountry.name ? correctAnswer : null} onClick={handleClick} className="options" value={randomOptions[1]}>
                        <p className='letter'>B</p>
                        <p className='answer'>{randomOptions[1]}</p>
                    </button>
                    <button ref={randomOptions[2] === randomCountry.name ? correctAnswer : null} onClick={handleClick} className="options" value={randomOptions[2]}>
                        <p className='letter'>C</p>
                        <p className='answer'>{randomOptions[2]}</p>
                    </button>
                    <button ref={randomOptions[3] === randomCountry.name ? correctAnswer : null} onClick={handleClick} className="options" value={randomOptions[3]}>
                        <p className='letter'>D</p>
                        <p className='answer'>{randomOptions[3]}</p>
                    </button>
                </div>
                <div>
                    {showNextButton && (
                        < button
                            onClick={handleNext}
                            className='next-button'
                        >
                            Next</button >
                    )}
                </div>

            </div>
        </div >
    )
}
export default QuizData
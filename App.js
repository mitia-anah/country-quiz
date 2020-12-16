import React, { useState, useRef, useEffect } from 'react'
import QuizResult from './component/QuizResult';
import QuizData from './component/QuizData';
import adventureImg from "/assets/undraw_adventure_4hum 1.svg";

function App() {
    const [countries, setCountries] = useState([])
    const [randomCountry, setRandomCountry] = useState({})
    const [randomOptions, setRandomOptions] = useState([])
    const [isUserWin, setIsUserWin] = useState(false)
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [answer, setAnswer] = useState(false)
    const [question, setQuestion] = useState(0)
    const correctAnswer = useRef(null);

    useEffect(() => {
        const getData = async () => {
            const apiUrl = "https://restcountries.eu/rest/v2/all";
            const res = await fetch(apiUrl);
            const data = await res.json();
            setCountries(data);
            getRandomCountry(data)
        }
        getData()

    }, [])

    function getRandomCountry(randomCountry) {
        // if (randomCountry.length === 0) return null;
        const random = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOpt1 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOpt2 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOpt3 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOption = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
        randomOption.sort(() => { return 0.5 - Math.random() });
        setRandomCountry(random)
        setRandomOptions(randomOption)
    }

    function handleClick(e) {
        if (e.target.value === randomCountry.name) {
            e.currentTarget.classList.add("Win");
            e.currentTarget.classList.add('CheckImg')
            // correctAnswer.current.classList.add('originalColor')
            setShowNextButton(true)
            setAnswer(true)
        } else {
            e.currentTarget.classList.add("Lose");
            e.currentTarget.classList.add('CrossImg')
            correctAnswer.current.classList.add('Win')
            correctAnswer.current.classList.add('CheckImg')
            // correctAnswer.current.classList.add('originalColor')
            setAnswer(false)
            setShowNextButton(true)
        }
    }

    const handleNext = () => {

        setQuestion(Math.floor(Math.random() * 2))
        if (answer) {
            getRandomCountry(countries)
            setScore(prevScore => prevScore + 1)
            correctAnswer.current.classList.add('originalColor')
        }

        else if (!answer) {
            setIsUserWin(true)
        }
        setShowNextButton(false)
        console.log(answer)
    }

    return (
        <div className='app'>
            <main className="main">
                <div className="header-card"><h1>COUNTRY QUIZ</h1><img className="adventure-img" src={adventureImg} alt="adventure image" />
                </div>
                <div>
                    {isUserWin ? (
                        <QuizResult
                            score={score}
                            setIsUserWin={setIsUserWin}
                            randomCountry={randomCountry}
                            randomOptions={randomOptions}
                            getRandomCountry={getRandomCountry}
                            setScore={setScore}
                            setShowNextButton={setShowNextButton} />
                    ) : (
                            <QuizData
                                randomCountry={randomCountry}
                                randomOptions={randomOptions}
                                showNextButton={showNextButton}
                                handleClick={handleClick}
                                correctAnswer={correctAnswer}
                                question={question}
                                handleNext={handleNext}
                                countries={countries}
                            />)
                    }
                </div>
            </main>
            <footer className="footer">By Alexis Lagodka © 2020</footer>
        </div>
    )
}
export default App
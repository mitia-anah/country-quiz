import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function QuizData() {
    const [countries, setCountries] = useState([])
    const [randomCountry, setRandomCountry] = useState({})
    const [questionNum, setQuestionNum] = useState(0);
    const [randomOptions, setRandomOptions] = useState([])
    const [isUserWin, setIsUserWin] = useState(false)
    const [bgColor, setBgColor] = useState('white')
    const [score, setScore] = useState(0)
    const [isClicked, setIsClicked] = useState(false)

    const getData = async () => {
        const apiUrl = "https://restcountries.eu/rest/v2/all";
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            setCountries(data);
            getRandomCountry(data)
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getData()
    }, [questionNum])

    function getRandomCountry(randomCountry) {
        const random = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        console.log(random);
        const randomOpt1 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOpt2 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOpt3 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
        const randomOption = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
        randomOption.sort(() => { return 0.5 - Math.random() });
        setRandomCountry(random)
        setRandomOptions(randomOption)
    }

    function handleClick(e) {
        e.preventDefault()
        if (e.target.value === randomCountry.name) {
            console.log(e.target);
            setTimeout(() => {
                e.target.classList.add("Win");
                setIsUserWin(true)
                setScore(score + 1)
                setIsClicked(true)
            }, 1000);

        } else if (e.target.value !== randomCountry.name) {
            setTimeout(() => {
                e.target.classList.add("Lose");
                setIsUserWin(false)
                setIsClicked(true)
            })
        }
    }
    const handleNext = () => {
        if (!isClicked) {
            setIsClicked(false);
            setQuestionNum(questionNum + 1);
            setScore(score + 1)
        } else {
            setScore(0)
        }
    }

    return (
        <div className="Quiz-card" >
            <div className="wrapper">
                <div className="question-component">
                    {questionNum % 2 === 0 ?
                        (
                            <div className="question-text1">
                                <img
                                    className='flag'
                                    src={randomCountry.flag}
                                    alt="flag"
                                />
                                <h3 className="question">Which country does this flag belong to?</h3>
                            </div>
                        ) : (
                            <h3 className="question2">
                                {randomCountry.capital} is the capital of
                            </h3>
                        )}
                </div>
                <form onClick={handleClick}>
                    <div>
                        <button onClick={handleClick} className="options" value={randomOptions[0]}>{randomOptions[0]}</button>
                        <button onClick={handleClick} className="options" value={randomOptions[1]}>{randomOptions[1]}</button>
                        <button onClick={handleClick} className="options" value={randomOptions[2]}>{randomOptions[2]}</button>
                        <button onClick={handleClick} className="options" value={randomOptions[3]}>{randomOptions[3]}</button>
                    </div>
                    < button onClick={handleNext} className='next-button'>
                        <Link to="/result">Next</Link></button >
                </form>
            </div>
        </div >
    )
}
export default QuizData
import React, { useEffect, useState } from 'react'
import Quiz from './Quiz'

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
        const randomOption = [random, randomOpt1, randomOpt2, randomOpt3];
        randomOption.sort(() => { return 0.5 - Math.random() });
        setRandomCountry(random)
        setRandomOptions(randomOption)
    }

    const handleClick = () => {
        if (isUserWin) {
            setScore(score + 1);
            setIsUserWin({
                isUserWin: 'Win',
                bgColor: { backgroundColor: '#81C784' }
            })
            setBgColor(bgColor)
        } else {
            setIsUserWin({
                isUserWin: 'Lose',
                bgColor: { backgroundColor: '#FF8A65' }
            })
            setBgColor(bgColor)
        }
    }
    const handleNext = () => {
        if (!isClicked && randomOptions) {
            setIsClicked(false);
            setQuestionNum(questionNum + 1);
            setScore(score + 1)
        } else {
            setScore(0)
        }
    }

    return (
        <div className="main" >
            <div className="wrapper">
                <div className="question-text">
                    {questionNum % 2 === 0 ?
                        (
                            <div>
                                <img
                                    src={randomCountry.flag}
                                    alt="flag"
                                />
                                <h3 className="question">Which country does this flag belong to?</h3>
                            </div>
                        ) : (
                            <h3 className="question">
                                {randomCountry.capital} is the capital of
                            </h3>
                        )}
                </div>
                <div>
                    <h4> You scored {score} answer</h4>
                </div>
            </div>
            <form>
                {randomOptions.map(option =>
                    <div key={option.numericCode}>
                        <button onClick={() => handleClick(option.isUserWin)} className="options" value={option.name}>{option.name}</button>
                    </div>
                )}
            </form>
            < button onClick={() => handleNext()
            }> Next</button >
        </div >
    )
}
export default QuizData
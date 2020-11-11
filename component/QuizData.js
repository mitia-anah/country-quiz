import React, { useEffect, useState } from 'react'
import _ from "underscore";

function QuizData() {
    const [countries, setCountries] = useState([])
    const [randomCountry, setRandomCountry] = useState({})
    const [questionNum, setQuestionNum] = useState(0);
    const [randomOptions, setRandomOptions] = useState([])
    const [winner, setWinner] = useState('')
    const [bgColor, setBgColor] = useState('white')
    const [guesse, setGuesse] = useState(0)


    const getData = async () => {
        const apiUrl = "https://restcountries.eu/rest/v2/all";
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            setCountries(data);
            getRandomCountry(data)
            // console.log(data);
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
        // console.log(randomOptions[0]);
        setRandomOptions(randomOption)
    }

    function handleClick(e) {
        const winCountry = randomCountry.name;
        const userGuess = e.target.value;
        if (winCountry === userGuess) {
            setWinner({
                answer: 'Win',
                guesse: guess + 1,
                bgColor: { backgroundColor: '#81C784' }
            })
        } else {
            setWinner({
                winner: 'Lose',
                bgColor: { backgroundColor: '#FF8A65' }
            })
        }

    }
    return (
        <div className="main" >
            <div className="wrapper">
                <div className="img-container">
                    {questionNum === 0 ?
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
                <h2>{winner === 'Win' ? 'You guess right! ' : ''}
                    {winner === 'Lose' ? 'You guess wrong. ' : ''}
                    Score:{guesse}</h2>
            </div>
            <form>
                {randomOptions.map(option =>
                    <div key={option.numericCode}>
                        <button onClick={(e) => handleClick(e)} className="options" value={option.name}>{option.name}</button>
                    </div>
                )}
            </form>
            <button>Next</button>
        </div>
    )
}
export default QuizData
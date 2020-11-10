import React, { useEffect, useState } from 'react'

function QuizData() {
    const [countries, setCountries] = useState([])
    const [randomCountry, setRandomCountry] = useState({})
    // console.log(randomCountry);
    const [randomOption, setRandomOption] = useState([])
    const [winner, setWinner] = useState('')
    const [disableFieldset, setDisableFieldset] = useState(false)
    const [guesse, setGuesse] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState('white')

    const getData = async () => {
        const apiUrl = "https://restcountries.eu/rest/v2/all";
        try {
            const res = await fetch(apiUrl);
            const country = await res.json();
            setRandomCountry(country);
            // console.log(country);
            getRandomCountry()
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function getRandomCountry() {
        const random = countries[Math.floor(Math.random() * countries.length)];
        console.log(random);
        const randomOpt1 = countries[Math.floor(Math.random() * countries.length)];
        const randomOpt2 = countries[Math.floor(Math.random() * countries.length)];
        const randomOpt3 = countries[Math.floor(Math.random() * countries.length)];
        const randomOptions = [random, randomOpt1, randomOpt2, randomOpt3];
        randomOptions.sort(() => { return 0.5 - Math.random() });
        setRandomCountry({
            randomCountry: random,
            randomOptions: randomOptions,
            userIsWin: '',
            disableFieldset: false
        })
    }

    function checkWin(e) {
        e.preventDefault()
        const winCountry = randomCountry.name;
        const userGuess = e.target.value;
        if (winCountry === userGuess) {
            setWinner({
                winner: 'Win',
                guesse: guesse + 1,
                backgroundColor: { backgroundColor: '#81C784' }
            })
        } else {
            setWinner({
                winner: 'Lose',
                backgroundColor: { backgroundColor: '#FF8A65' }
            })
        }
        setTimeout(() => {
            getRandomCountry();
            setCountries({
                winner: '',
                disableFieldset: false,
                backgroundColor: { backgroundColor: 'white' }
            })
        }, 2000)

    }

    return (
        <div className="main" style={{ backgroundColor }}>
            <div className="wrapper">
                <h1>Country Guessing Game</h1>
                <button className="rnd mui-btn mui-btn--raised" onClick={getRandomCountry}>Random</button>
                <div className="img-container">
                    <img className="mui-panel" src={randomCountry.flag} alt="Country flag" />
                </div>
                <h2>{winner === 'Win' ? 'You guess right! ' : ''}
                    {winner === 'Lose' ? 'You guess wrong. ' : ''}
                    Score:{guesse}</h2>
            </div>
            <fieldset disabled={disableFieldset}>
                <form onClick={checkWin}>
                    <button className="mui-btn mui-btn--raised" value={randomOption[0]}>{randomOption[0]}</button>
                    <button className="mui-btn mui-btn--raised" value={randomOption[1]}>{randomOption[1]}</button>
                    <button className="mui-btn mui-btn--raised" value={randomOption[2]}>{randomOption[2]}</button>
                    <button className="mui-btn mui-btn--raised" value={randomOption[3]}>{randomOption[3]}</button>
                </form>
            </fieldset>
        </div>
    )
}

export default QuizData
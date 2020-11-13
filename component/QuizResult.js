import React from 'react'
import style from 'style.css'
import undrawWinner from '../assets/winner.svg'

function Quiz({ score, getRandomCountry }) {
    return (
        <div className='Quiz-card'>
            <div className='result'>
                <div>
                    <img className='result-img' src={undrawWinner} alt='' />
                </div>
                <div>
                    <h3>Results</h3>
                </div>
                <div>
                    <h4>Score:{score}</h4>
                </div>
                <div>
                    <button onClick={getRandomCountry} className="tryAgain-button">Try again</button>
                </div>
            </div>
        </div>
    )
}

{/* {randomOptions.map(option =>
                        <div key={option.numericCode} className='answer-content'>
                            <button onClick={handleClick} className="options" value={option.name}>{option.name}</button>
                            <button onClick={handleClick} className="options" value={option.name}>{option.name}</button>
                            <button onClick={handleClick} className="options" value={option.name}>{option.name}</button>
                            <button onClick={handleClick} className="options" value={option.name}>{option.name}</button>
                        </div>
                    )} */}


// const random = randomCountry[Math.floor(Math.random() * randomCountry.length)];
// console.log(random);
// const randomOpt1 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
// const randomOpt2 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
// const randomOpt3 = randomCountry[Math.floor(Math.random() * randomCountry.length)];
// const randomOption = [random.name, randomOpt1.name, randomOpt2.name, randomOpt3.name];
// randomOption.sort(() => { return 0.5 - Math.random() });
export default Quiz
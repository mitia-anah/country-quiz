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
export default Quiz
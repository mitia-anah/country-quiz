import React from 'react'
import QuizResult from './component/QuizResult';
import QuizData from './component/QuizData';
import { Switch, Route } from 'react-router-dom'
import adventureImg from "/assets/undraw_adventure_4hum 1.svg";

function App() {
    return (
        <div className='app'>
            <main className="main">
                <div className="header-card"><h1>COUNTRY QUIZ</h1><img className="adventure-img" src={adventureImg} alt="adventure image" />
                </div>
                <Switch>
                    <Route exact path="/">
                        <QuizData />
                    </Route>
                    <Route exact path="/result">
                        <QuizResult />
                    </Route>
                </Switch>
                {/* <Quiz /> */}</main>
            <footer className="footer">By Alexis Lagodka © 2020</footer>
        </div>
    )
}
export default App
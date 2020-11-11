function handleClick(e) {
    if (!clicked) {
        let { score, played } = clicked;
        if (Number(e.target.value) === answer) {
            setCountries({
                correct: true,
                clicked: true,
                score: score + 1,
                played: played + 1,
            });
        } else {
            setCountries({
                correct: false,
                clicked: true,
                played: played + 1
            });
        }
    }
}

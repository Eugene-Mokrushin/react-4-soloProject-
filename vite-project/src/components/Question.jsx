import React from "react";
import { nanoid } from "nanoid"

export default function ({id, data, select}) {
    const answers = data.incorrect_answers
    answers.push(data.correct_answer)

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const ansersRender = answers.map(answer => {
        const id = nanoid()
        return (
            <div className="answers" key={id} id={id}>
                <label className="label--answer" htmlFor={id}>{decodeHtml(answer)}</label>
                <input className="inp" type="radio" id={id} name={id} onChange={() => select(id)} />
            </div>
        )
    })

    return (
        <div className="question--block">
            <h2 className="question">{decodeHtml(data.question)}</h2>
            <div className="wrapper--answers">
                {ansersRender}
            </div>
        </div>
    )
}

// data:
// category: "Entertainment: Music"
// correct_answer: "Sunset Strip"
// difficulty: "medium"
// incorrect_answers: (3) ['Rattle That Lock', 'Blue Light', 'Arnold Layne']
// question: "Which of these is not a single by Pink Floyd guitarist, David Gilmour?"
// type: "multiple"
// [[Prototype]]: Object
// id: "LmhwzoJr7ahJT9KhHTjSW"
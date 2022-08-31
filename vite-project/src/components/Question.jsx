import React from "react";
import { nanoid } from "nanoid"

export default function ({ id, data, select, checking }) {

    
    
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    const ansersRender = data.allAnswers.map(answer => {
        let id_status
        if (checking) {
            if (answer === data.correct_answer) {
                id_status = 'correct'
            } else if (answer === data.selected && answer !== data.correct_answer) {
                id_status = "incorrect"
            } else {
                id_status = "notSelected"
            }
        }

        const id_answer = nanoid()
        return (
            <div key={id_answer} className="wrpapper-wrapper">
                <label
                    className={data.selected === answer ? "label--answer selected" : "label--answer"}
                    id={id_status}
                    htmlFor={id_answer}
                >
                    {decodeHtml(answer)}
                </label>
                <input
                    id={id_answer}
                    className="inp"
                    type="radio"
                    name={id}
                    checked={data.selected === answer}
                    onChange={(e) => select(e)}
                    value={answer}
                />
            </div>
        )
    })

    return (
        <div className="question--block" id={id}>
            <h2 className="question">{decodeHtml(data.question)}</h2>
            <div className="wrapper--answers" id={id}>
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
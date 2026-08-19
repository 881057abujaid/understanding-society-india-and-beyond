let currentPracticeMCQs = [];

export function renderChapterPractice(practice) {

    if (!practice) {
        return document.createDocumentFragment();
    }

    currentPracticeMCQs = practice.mcqs || [];

    const section = document.createElement("section");

    section.className = "content-section chapter-practice";

    section.innerHTML = `

        <div class="section-heading">

            <span>📝</span>

            <div>
                <p class="eyebrow">Test Yourself</p>
                <h2>Chapter Practice</h2>
            </div>

        </div>


        <div class="practice-tabs">

            <button
                class="practice-tab active"
                data-practice-tab="mcqs"
            >
                MCQs
            </button>

            <button
                class="practice-tab"
                data-practice-tab="oneMark"
            >
                1 Mark
            </button>

            <button
                class="practice-tab"
                data-practice-tab="twoMark"
            >
                2 Marks
            </button>

            <button
                class="practice-tab"
                data-practice-tab="threeMark"
            >
                3 Marks
            </button>

            <button
                class="practice-tab"
                data-practice-tab="fiveMark"
            >
                5 Marks
            </button>

            <button
                class="practice-tab"
                data-practice-tab="thinkAndApply"
            >
                Think & Apply
            </button>

        </div>


        <div class="practice-panels">

            <div
                class="practice-panel active"
                data-practice-panel="mcqs"
            >
                ${renderMCQs(practice.mcqs)}
            </div>

            <div
                class="practice-panel"
                data-practice-panel="oneMark"
            >
                ${renderWrittenQuestions(
        practice.oneMark
    )}
            </div>

            <div
                class="practice-panel"
                data-practice-panel="twoMark"
            >
                ${renderWrittenQuestions(
        practice.twoMark
    )}
            </div>

            <div
                class="practice-panel"
                data-practice-panel="threeMark"
            >
                ${renderWrittenQuestions(
        practice.threeMark
    )}
            </div>

            <div
                class="practice-panel"
                data-practice-panel="fiveMark"
            >
                ${renderFiveMarkQuestions(
        practice.fiveMark
    )}
            </div>

            <div
                class="practice-panel"
                data-practice-panel="thinkAndApply"
            >
                ${renderThinkAndApply(
        practice.thinkAndApply
    )}
            </div>

        </div>
    `;


    setupPracticeTabs(section);
    setupMCQs(section);

    return section;
}


function renderMCQs(mcqs = []) {

    if (!mcqs.length) {
        return emptyState("No MCQs available yet.");
    }

    return mcqs.map((mcq, index) => `

        <article
            class="mcq-card"
            data-mcq-id="${mcq.id}"
        >

            <p class="question-number">
                Question ${index + 1}
            </p>

            <h3>
                ${escapeHTML(mcq.question)}
            </h3>


            <div class="mcq-options">

                ${mcq.options.map(option => `
                    <label class="mcq-option">

                        <input
                            type="radio"
                            name="${mcq.id}"
                            value="${option.id}"
                        >

                        <span>
                            ${escapeHTML(option.text)}
                        </span>

                    </label>
                `).join("")}

            </div>


            <button
                type="button"
                class="check-answer"
                data-mcq-check="${mcq.id}"
            >
                Check Answer
            </button>


            <div class="mcq-feedback" hidden></div>

        </article>

    `).join("");
}


function renderWrittenQuestions(questions = []) {

    if (!questions.length) {
        return emptyState(
            "Questions for this marks category will be added soon."
        );
    }

    return questions.map(question => `

        <article class="written-question">

            <div class="written-question-header">
                <span class="marks-badge">
                    ${question.marks} Mark${question.marks > 1 ? "s" : ""}
                </span>
            </div>

            <h3>
                ${escapeHTML(question.question)}
            </h3>


            <details class="answer-details">

                <summary>
                    Show Model Answer
                </summary>

                <div class="model-answer-content">

                    <p>
                        ${escapeHTML(question.answer)}
                    </p>

                    <br>
                    <strong>Key Points:</strong>

                    <ul>
                        ${question.keyPoints
            .map(point => `
                                <li>
                                    ${escapeHTML(point)}
                                </li>
                            `)
            .join("")}
                    </ul>

                </div>

            </details>

        </article>

    `).join("");
}


function renderFiveMarkQuestions(questions = []) {

    if (!questions.length) {
        return emptyState("No 5-mark questions available yet.");
    }

    return questions.map(question => `

        <article class="written-question five-mark-question">

            <div class="written-question-header">
                <span class="marks-badge">
                    5 Marks
                </span>
            </div>

            <h3>
                ${escapeHTML(question.question)}
            </h3>


            <details class="answer-details">

                <summary>
                    Show Model Answer
                </summary>

                <div class="model-answer-content five-mark-answer">

                    ${question.answer.introduction
            ? `
                            <div class="answer-intro">
                                <strong>Introduction:</strong>
                                <p>
                                    ${escapeHTML(
                question.answer.introduction
            )}
                                </p>
                            </div>
                            `
            : ""
        }


                    <div class="answer-points">

                        ${question.answer.points
            .map(point => `
                                <div class="answer-point">

                                    <strong>
                                        ${escapeHTML(
                point.title
            )}
                                    </strong>

                                    <p>
                                        ${escapeHTML(
                point.explanation
            )}
                                    </p>

                                </div>
                            `)
            .join("")}

                    </div>


                    ${question.answer.conclusion
            ? `
                            <div class="answer-conclusion">
                                <strong>Conclusion:</strong>
                                <p>
                                    ${escapeHTML(
                question.answer.conclusion
            )}
                                </p>
                            </div>
                            `
            : ""
        }


                    <div class="answer-keypoints">
                        <strong>Key Revision Points:</strong>

                        <ul>
                            ${question.keyPoints
            .map(point => `
                                    <li>
                                        ${escapeHTML(point)}
                                    </li>
                                `)
            .join("")}
                        </ul>
                    </div>

                </div>

            </details>

        </article>

    `).join("");
}


function renderThinkAndApply(items = []) {

    if (!items.length) {
        return emptyState("No application questions available yet.");
    }

    return items.map(item => `

        <article class="apply-question">

            <span>🧠 Think & Apply</span>

            <h3>
                ${escapeHTML(item.question)}
            </h3>


            <details>

                <summary>
                    Show Thinking Direction
                </summary>

                <p>
                    ${escapeHTML(item.thinkingDirection)}
                </p>

            </details>


            <details>

                <summary>
                    Show Model Response
                </summary>

                <p>
                    ${escapeHTML(item.modelResponse)}
                </p>

            </details>

        </article>

    `).join("");
}


function setupPracticeTabs(section) {

    const tabs =
        section.querySelectorAll(".practice-tab");

    const panels =
        section.querySelectorAll(".practice-panel");


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const target =
                tab.dataset.practiceTab;


            tabs.forEach(item => {
                item.classList.toggle(
                    "active",
                    item === tab
                );
            });


            panels.forEach(panel => {

                panel.classList.toggle(
                    "active",
                    panel.dataset.practicePanel === target
                );

            });

        });

    });
}


function setupMCQs(section) {

    section.addEventListener("click", event => {

        const button =
            event.target.closest("[data-mcq-check]");

        if (!button) {
            return;
        }


        const mcqId =
            button.dataset.mcqCheck;

        const card =
            section.querySelector(
                `[data-mcq-id="${mcqId}"]`
            );


        const selected =
            card.querySelector(
                `input[name="${mcqId}"]:checked`
            );


        const feedback =
            card.querySelector(".mcq-feedback");


        if (!selected) {

            feedback.hidden = false;

            feedback.className =
                "mcq-feedback warning";

            feedback.textContent =
                "Please select an option first.";

            return;
        }


        const mcq =
            currentPracticeMCQs.find(
                item => item.id === mcqId
            );


        const isCorrect =
            selected.value === mcq.correctAnswer;


        feedback.hidden = false;

        feedback.className =
            `mcq-feedback ${isCorrect ? "correct" : "wrong"
            }`;


        feedback.textContent =
            isCorrect
                ? `✓ Correct! ${mcq.explanation}`
                : `✗ Not quite. Try again.`;
    });
}

function emptyState(message) {

    return `
        <div class="empty-state">
            ${escapeHTML(message)}
        </div>
    `;
}


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
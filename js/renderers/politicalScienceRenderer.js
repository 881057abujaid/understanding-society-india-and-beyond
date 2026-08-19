export function renderPoliticalScienceUX(subjectUX) {

    const wrapper = document.createElement("section");

    wrapper.className = "subject-ux political-science-ux";


    if (subjectUX.conceptFlow?.length) {

        wrapper.innerHTML += `
            <section class="concept-flow">

                <div class="subject-section-heading">

                    <span>🏛️</span>

                    <div>
                        <p>Conceptual Learning</p>
                        <h3>Concept Flow</h3>
                    </div>

                </div>

                <div class="concept-flow-list">

                    ${subjectUX.conceptFlow
                .map((concept, index) => `
                            <article class="concept-node">

                                <span>
                                    ${index + 1}
                                </span>

                                <div>
                                    <h4>
                                        ${escapeHTML(concept.title)}
                                    </h4>

                                    <p>
                                        ${escapeHTML(
                    concept.hindiExplanation
                )}
                                    </p>

                                    ${concept.example
                        ? `
                                            <small>
                                                Example:
                                                ${escapeHTML(
                            concept.example
                        )}
                                            </small>
                                            `
                        : ""
                    }
                                </div>

                            </article>
                        `)
                .join("")}

                </div>

            </section>
        `;
    }


    if (subjectUX.processes?.length) {

        wrapper.innerHTML += `
            <section class="political-processes">

                <h3>⚙️ How It Works</h3>

                ${subjectUX.processes.map(process => `
                    <article class="process-card">

                        <h4>
                            ${escapeHTML(process.title)}
                        </h4>

                        <ol>
                            ${process.steps.map(step => `
                                <li>
                                    <strong>
                                        ${escapeHTML(step.title)}
                                    </strong>

                                    <p>
                                        ${escapeHTML(
            step.explanation
        )}
                                    </p>
                                </li>
                            `).join("")}
                        </ol>

                    </article>
                `).join("")}

            </section>
        `;
    }


    if (subjectUX.realWorldExamples?.length) {

        wrapper.innerHTML += `
            <section class="real-world-examples">

                <h3>🌱 Real-Life Connection</h3>

                ${subjectUX.realWorldExamples
                .map(example => `
                        <article class="example-card">

                            <h4>
                                ${escapeHTML(example.title)}
                            </h4>

                            <p>
                                ${escapeHTML(example.description)}
                            </p>

                        </article>
                    `)
                .join("")}

            </section>
        `;
    }

    return wrapper;
}


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
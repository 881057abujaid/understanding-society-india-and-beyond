export function renderEconomicsUX(subjectUX) {

    const wrapper = document.createElement("section");

    wrapper.className = "subject-ux economics-ux";


    if (subjectUX.conceptChain?.length) {

        wrapper.innerHTML += `
            <section class="concept-chain">

                <div class="subject-section-heading">

                    <span>💰</span>

                    <div>
                        <p>Economic Logic</p>
                        <h3>Concept Chain</h3>
                    </div>

                </div>

                <div class="concept-chain-list">

                    ${subjectUX.conceptChain
                .map((concept, index) => `
                            <article class="chain-node">

                                <span>
                                    ${index + 1}
                                </span>

                                <div>

                                    <h4>
                                        ${escapeHTML(concept.title)}
                                    </h4>

                                    <p>
                                        ${escapeHTML(
                    concept.explanation
                )}
                                    </p>

                                </div>

                            </article>
                        `)
                .join("")}

                </div>

            </section>
        `;
    }


    if (subjectUX.relationships?.length) {

        wrapper.innerHTML += `
            <section class="economic-relationships">

                <h3>🔗 How Concepts Connect</h3>

                ${subjectUX.relationships
                .map(item => `
                        <article class="relationship-card">

                            <strong>
                                ${escapeHTML(item.from)}
                            </strong>

                            <span>
                                ${escapeHTML(item.relation)}
                            </span>

                            <strong>
                                ${escapeHTML(item.to)}
                            </strong>

                            <p>
                                ${escapeHTML(item.explanation)}
                            </p>

                        </article>
                    `)
                .join("")}

            </section>
        `;
    }


    if (subjectUX.realLifeExamples?.length) {

        wrapper.innerHTML += `
            <section class="economic-examples">

                <h3>🛒 Real-Life Examples</h3>

                ${subjectUX.realLifeExamples
                .map(example => `
                        <article class="example-card">

                            <h4>
                                ${escapeHTML(example.title)}
                            </h4>

                            <p>
                                ${escapeHTML(example.situation)}
                            </p>

                            <small>
                                ${escapeHTML(
                    example.conceptExplanation
                )}
                            </small>

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
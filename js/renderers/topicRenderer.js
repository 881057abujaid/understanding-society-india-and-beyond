export function renderTopic(topic) {

    const article = document.createElement("article");

    article.className = "topic-card";

    article.id = topic.id;

    article.innerHTML = `

        <div class="topic-header">

            <span class="topic-number">
                Topic ${topic.order}
            </span>

            <h3>
                ${escapeHTML(topic.title.english)}
            </h3>

            <p class="topic-hindi-title">
                ${escapeHTML(topic.title.hindi)}
            </p>

        </div>


        ${topic.introduction
            ? `
                <div class="topic-introduction">
                    ${escapeHTML(topic.introduction)}
                </div>
                `
            : ""
        }


        ${renderExplanation(topic.explanation)}


        ${renderVisuals(topic.visuals)}


        ${renderCuriosity(topic.curiosityQuestions)}


        ${renderImportantTerms(topic.importantTerms)}


        ${renderConnections(topic.connections)}


        ${renderQuickRevision(topic.quickRevision)}

    `;

    return article;
}


function renderExplanation(explanation) {

    if (!explanation) {
        return "";
    }

    return `
        <section class="topic-section explanation">

            <div class="section-heading small">
                <span>🧠</span>
                <h4>आसान भाषा में समझें</h4>
            </div>

            <p>
                ${escapeHTML(explanation.simpleHindi)}
            </p>


            ${explanation.deepDive
            ? `
                    <details class="deep-dive">

                        <summary>
                            और विस्तार से समझें
                        </summary>

                        <p>
                            ${escapeHTML(explanation.deepDive)}
                        </p>

                    </details>
                    `
            : ""
        }


            ${explanation.examples?.length
            ? `
                    <div class="examples">

                        <h5>💡 Example</h5>

                        ${explanation.examples.map(example => `
                            <div class="example-card">

                                <strong>
                                    ${escapeHTML(example.title)}
                                </strong>

                                <p>
                                    ${escapeHTML(example.explanation)}
                                </p>

                            </div>
                        `).join("")}

                    </div>
                    `
            : ""
        }

        </section>
    `;
}


function renderCuriosity(questions = []) {

    if (!questions.length) {
        return "";
    }

    return `
        <section class="topic-section curiosity">

            <div class="section-heading small">
                <span>🤔</span>
                <h4>सोचिए</h4>
            </div>

            <div class="curiosity-list">

                ${questions.map(question => `
                    <div class="curiosity-card">

                        <span>
                            ${escapeHTML(question.question)}
                        </span>

                    </div>
                `).join("")}

            </div>

        </section>
    `;
}


function renderImportantTerms(terms = []) {

    if (!terms.length) {
        return "";
    }

    return `
        <section class="topic-section important-terms">

            <div class="section-heading small">
                <span>📌</span>
                <h4>Important Terms</h4>
            </div>

            <div class="terms-grid">

                ${terms.map(term => `
                    <details class="term-card">

                        <summary>
                            ${escapeHTML(term.term)}
                        </summary>

                        <div class="term-details">

                            <strong>
                                ${escapeHTML(term.hindi)}
                            </strong>

                            <p>
                                ${escapeHTML(term.simpleMeaning)}
                            </p>

                            <small>
                                ${escapeHTML(term.context)}
                            </small>

                        </div>

                    </details>
                `).join("")}

            </div>

        </section>
    `;
}


function renderConnections(connections = []) {

    if (!connections.length) {
        return "";
    }

    return `
        <section class="topic-section connections">

            <div class="section-heading small">
                <span>🔗</span>
                <h4>Topic Connection</h4>
            </div>

            <div class="connection-list">

                ${connections.map(connection => `
                    <article class="connection-card">

                        <span class="connection-type">
                            ${escapeHTML(connection.title)}
                        </span>

                        <p>
                            ${escapeHTML(connection.explanation)}
                        </p>

                        ${connection.relatedTopicId
            ? `
                                <button
                                    type="button"
                                    class="topic-jump"
                                    data-target-topic="${connection.relatedTopicId}"
                                >
                                    Go to related topic →
                                </button>
                                `
            : ""
        }

                    </article>
                `).join("")}

            </div>

        </section>
    `;
}


function renderQuickRevision(points = []) {

    if (!points.length) {
        return "";
    }

    return `
        <section class="topic-section quick-revision">

            <div class="section-heading small">
                <span>⚡</span>
                <h4>Quick Revision</h4>
            </div>

            <ul>
                ${points.map(point => `
                    <li>${escapeHTML(point)}</li>
                `).join("")}
            </ul>

        </section>
    `;
}


function renderVisuals(visuals = []) {
    if (!visuals || !visuals.length) {
        return "";
    }

    return `
        <section class="topic-section topic-visuals">
            <div class="section-heading small">
                <span>🌍</span>
                <h4>Visual Explanation</h4>
            </div>

            <div class="visuals-list">
                ${visuals.map(visual => `
                    <article class="visual-explanation-card" id="${escapeHTML(visual.id || '')}">
                        <div class="visual-image-wrapper" onclick="window.openVisualModal && window.openVisualModal('${escapeHTML(visual.src)}', '${escapeHTML(visual.title || '')}')">
                            <img 
                                src="${escapeHTML(visual.src)}" 
                                alt="${escapeHTML(visual.title || 'Diagram')}" 
                                loading="lazy"
                                class="visual-img"
                            />
                            <div class="zoom-hint">🔍 Click to Expand</div>
                        </div>

                        <div class="visual-info">
                            <h5>${escapeHTML(visual.title)}</h5>
                            ${visual.caption ? `<p class="visual-caption">${escapeHTML(visual.caption)}</p>` : ''}

                            ${visual.explanation ? `
                                <div class="visual-explanation-text">
                                    <strong>💡 क्या देख रहे हैं?</strong>
                                    <p>${escapeHTML(visual.explanation)}</p>
                                </div>
                            ` : ''}

                            ${visual.importantLabels?.length ? `
                                <div class="visual-labels-box">
                                    <h6>📌 Important Labels</h6>
                                    <ul>
                                        ${visual.importantLabels.map(item => `
                                            <li>
                                                <strong>${escapeHTML(item.label)}</strong>: ${escapeHTML(item.explanation)}
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
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
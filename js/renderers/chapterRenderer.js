import { renderSubjectUX } from "./subjectRenderer.js";
import { renderTopic } from "./topicRenderer.js";


export function renderChapterHeader(chapter) {

    return createSection(`
        <section class="chapter-header">

            <span class="chapter-number">
                Chapter ${chapter.chapterNumber}
            </span>

            <span class="subject-badge">
                ${formatSubject(chapter.subject)}
            </span>

            <h1>
                ${escapeHTML(chapter.title.english)}
            </h1>

            <h2>
                ${escapeHTML(chapter.title.hindi)}
            </h2>

            <p>
                ${escapeHTML(chapter.overview.shortHindi)}
            </p>

        </section>
    `);
}


export function renderBigQuestions(questions = []) {

    if (!questions.length) {
        return document.createDocumentFragment();
    }

    const section = createSection(`
        <section class="content-section big-questions">

            <div class="section-heading">
                <span>💡</span>
                <div>
                    <p class="eyebrow">Chapter Focus</p>
                    <h2>Big Questions</h2>
                </div>
            </div>

            <div class="question-list">
                ${questions.map((item, index) => `
                    <article class="big-question">
                        <span>${index + 1}</span>

                        <p>
                            ${escapeHTML(item.question)}
                        </p>
                    </article>
                `).join("")}
            </div>

        </section>
    `);

    return section;
}


export function renderOverview(overview) {

    const section = createSection(`
        <section class="content-section chapter-overview">

            <div class="section-heading">
                <span>🧠</span>
                <div>
                    <p class="eyebrow">Before You Start</p>
                    <h2>इस Chapter में क्या सीखेंगे?</h2>
                </div>
            </div>

            <p>
                ${escapeHTML(overview.detailedHindi)}
            </p>

            <ul class="learning-outcomes">
                ${overview.learningOutcomes.map(item => `
                    <li>${escapeHTML(item)}</li>
                `).join("")}
            </ul>

        </section>
    `);

    return section;
}


export function renderTopics(chapter) {

    const fragment = document.createDocumentFragment();

    const wrapper = document.createElement("section");

    wrapper.className = "content-section topics-section";

    wrapper.innerHTML = `
        <div class="section-heading">
            <span>📖</span>

            <div>
                <p class="eyebrow">Learn Step by Step</p>
                <h2>Topics</h2>
            </div>
        </div>
    `;

    const subjectUX = renderSubjectUX(chapter.subjectUX);

    if (subjectUX) {
        wrapper.appendChild(subjectUX);
    }

    const topicContainer = document.createElement("div");

    topicContainer.className = "topics-container";

    chapter.topics
        .sort((a, b) => a.order - b.order)
        .forEach(topic => {
            topicContainer.appendChild(
                renderTopic(topic)
            );
        });

    wrapper.appendChild(topicContainer);

    fragment.appendChild(wrapper);

    return fragment;
}


export function renderNavigation(navigation) {

    const section = createSection(`
        <nav class="chapter-navigation">

            ${navigation.previousChapter
            ? `
                    <a
                        href="./chapter.html?chapter=${navigation.previousChapter.id}"
                        class="nav-card previous"
                    >
                        <span>← Previous Chapter</span>

                        <strong>
                            ${escapeHTML(navigation.previousChapter.title)}
                        </strong>
                    </a>
                    `
            : `
                    <div></div>
                    `
        }

            ${navigation.nextChapter
            ? `
                    <a
                        href="./chapter.html?chapter=${navigation.nextChapter.id}"
                        class="nav-card next"
                    >
                        <span>Next Chapter →</span>

                        <strong>
                            ${escapeHTML(navigation.nextChapter.title)}
                        </strong>
                    </a>
                    `
            : `
                    <div></div>
                    `
        }

        </nav>
    `);

    return section;
}


function createSection(html) {

    const template = document.createElement("template");

    template.innerHTML = html.trim();

    return template.content.firstElementChild;
}


function formatSubject(subject) {

    const labels = {
        foundation: "Foundation",
        history: "History",
        geography: "Geography",
        "political-science": "Political Science",
        economics: "Economics"
    };

    return labels[subject] || subject;
}


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
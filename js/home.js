import { getAllChapters } from "../data/index.js";

function renderChaptersList() {
    const chaptersContainer = document.querySelector("#chapters-list");
    if (!chaptersContainer) return;

    const chapters = getAllChapters();

    if (!chapters.length) {
        chaptersContainer.innerHTML = `
            <div class="state-card">
                <p>No chapters available yet.</p>
            </div>
        `;
        return;
    }

    chaptersContainer.innerHTML = chapters.map(chapter => `
        <article class="content-section chapter-card">
            <div>
                <span class="chapter-number">Chapter ${chapter.chapterNumber}</span>
                <span class="subject-badge">${formatSubject(chapter.subject)}</span>
                <h3>${escapeHTML(chapter.title.english)}</h3>
                <h4>${escapeHTML(chapter.title.hindi)}</h4>
                <p>${escapeHTML(chapter.overview?.shortHindi || "")}</p>
            </div>
            <a href="chapter.html?chapter=${chapter.id}" class="primary-button">
                Start Learning →
            </a>
        </article>
    `).join("");
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

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderChaptersList);
} else {
    renderChaptersList();
}

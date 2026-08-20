import { getChapter } from "../data/index.js";

import {
    renderChapterHeader,
    renderBigQuestions,
    renderOverview,
    renderTopics,
    renderNavigation
} from "./renderers/chapterRenderer.js";

import {
    renderGlossary
} from "./renderers/glossaryRenderer.js";

import {
    renderChapterRevision
} from "./renderers/revisionRenderer.js";

import {
    renderChapterPractice
} from "./renderers/practiceRenderer.js";


function getChapterIdFromURL() {
    const params = new URLSearchParams(window.location.search);

    return params.get("chapter") || "ch01";
}


function renderNotFound() {
    const content = document.querySelector("#chapter-content");
    if (!content) return;

    content.innerHTML = `
        <section class="state-card error-state">
            <h1>Chapter Not Found</h1>

            <p>
                The requested chapter could not be found.
            </p>

            <a href="./index.html">
                ← Back to Chapters
            </a>
        </section>
    `;
}


function renderChapter(chapter) {
    const content = document.querySelector("#chapter-content");
    if (!content) return;

    content.innerHTML = "";

    content.append(
        renderChapterHeader(chapter),
        renderBigQuestions(chapter.bigQuestions),
        renderOverview(chapter.overview),
        renderTopics(chapter),
        renderGlossary(chapter.glossary),
        renderChapterRevision(chapter.quickRevision),
        renderChapterPractice(chapter.chapterPractice),
        renderNavigation(chapter.navigation)
    );
}


function init() {
    const content = document.querySelector("#chapter-content");
    if (!content) {
        return;
    }

    const chapterId = getChapterIdFromURL();

    const chapter = getChapter(chapterId);

    if (!chapter) {
        renderNotFound();
        return;
    }

    document.title =
        `${chapter.chapterNumber}. ${chapter.title.english} | Understanding Society`;

    renderChapter(chapter);
}


if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

document.addEventListener("click", event => {

    const target =
        event.target.closest("[data-target-topic]");

    if (!target) {
        return;
    }

    const topicId =
        target.dataset.targetTopic;

    scrollToTopic(topicId);
});


document.addEventListener("click", event => {

    const target =
        event.target.closest("[data-topic-target]");

    if (!target) {
        return;
    }

    const topicId =
        target.dataset.topicTarget;

    scrollToTopic(topicId);
});


function scrollToTopic(topicId) {

    const topic =
        document.getElementById(topicId);

    if (!topic) {
        return;
    }

    topic.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    topic.classList.add("topic-highlight");


    setTimeout(() => {
        topic.classList.remove("topic-highlight");
    }, 1800);
}

window.openVisualModal = function(src, title) {
    let modal = document.getElementById("image-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "image-modal";
        modal.className = "image-modal-overlay";
        modal.innerHTML = `
            <button type="button" class="image-modal-close" onclick="closeVisualModal()">&times;</button>
            <img id="image-modal-img" class="image-modal-content" src="" alt="" />
            <div id="image-modal-caption" class="image-modal-caption"></div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.classList.contains("image-modal-close")) {
                closeVisualModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeVisualModal();
        });
    }

    const modalImg = document.getElementById("image-modal-img");
    const modalCap = document.getElementById("image-modal-caption");

    if (modalImg) modalImg.src = src;
    if (modalCap) modalCap.textContent = title || "";

    modal.style.display = "flex";
};

window.closeVisualModal = function() {
    const modal = document.getElementById("image-modal");
    if (modal) modal.style.display = "none";
};
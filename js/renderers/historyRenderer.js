export function renderHistoryUX(subjectUX) {

    const wrapper = document.createElement("section");

    wrapper.className = "subject-ux history-ux";

    if (!subjectUX.timeline?.enabled) {
        return wrapper;
    }

    wrapper.innerHTML = `
        <div class="subject-section-heading">

            <span>🕰️</span>

            <div>
                <p>History Learning Path</p>
                <h3>Timeline</h3>
            </div>

        </div>

        <div class="history-timeline">

            ${subjectUX.timeline.events
            .map(event => `
                    <button
                        type="button"
                        class="timeline-event"
                        data-topic-target="${event.topicId}"
                    >

                        <span class="timeline-date">
                            ${escapeHTML(event.date.display)}
                        </span>

                        <strong>
                            ${escapeHTML(event.title)}
                        </strong>

                        <small>
                            ${escapeHTML(event.shortDescription)}
                        </small>

                    </button>
                `)
            .join("")}

        </div>
    `;

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
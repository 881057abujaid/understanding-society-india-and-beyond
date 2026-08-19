export function renderChapterRevision(revisions = []) {

    if (!revisions.length) {
        return document.createDocumentFragment();
    }

    const section = document.createElement("section");

    section.className = "content-section chapter-revision";

    section.innerHTML = `
        <div class="section-heading">

            <span>⚡</span>

            <div>
                <p class="eyebrow">Before Practice</p>
                <h2>Chapter Quick Revision</h2>
            </div>

        </div>


        <div class="revision-grid">

            ${revisions.map((revision, index) => `
                <article class="revision-card">

                    <span>
                        Topic ${index + 1}
                    </span>

                    <ul>
                        ${revision.points
            .map(point => `
                                <li>
                                    ${escapeHTML(point)}
                                </li>
                            `)
            .join("")}
                    </ul>

                </article>
            `).join("")}

        </div>
    `;

    return section;
}


function escapeHTML(value = "") {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
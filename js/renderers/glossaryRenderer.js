export function renderGlossary(glossary = []) {

    if (!glossary.length) {
        return document.createDocumentFragment();
    }

    const section = document.createElement("section");

    section.className = "content-section glossary-section";

    section.innerHTML = `
        <div class="section-heading">

            <span>📚</span>

            <div>
                <p class="eyebrow">Reference</p>
                <h2>Glossary</h2>
            </div>

        </div>


        <div class="glossary-search">

            <input
                type="search"
                id="glossary-search"
                placeholder="Search glossary..."
                aria-label="Search glossary"
            >

        </div>


        <div class="glossary-list">

            ${glossary.map(item => `
                <details
                    class="glossary-item"
                    data-glossary-term="${escapeHTML(
        item.term.toLowerCase()
    )}"
                >

                    <summary>

                        <strong>
                            ${escapeHTML(item.term)}
                        </strong>

                        <span>
                            ${escapeHTML(item.hindi)}
                        </span>

                    </summary>

                    <div>

                        <p>
                            ${escapeHTML(item.definition)}
                        </p>

                        ${item.relatedTerms?.length
            ? `
                                <small>
                                    Related:
                                    ${item.relatedTerms
                .map(escapeHTML)
                .join(", ")}
                                </small>
                                `
            : ""
        }

                    </div>

                </details>
            `).join("")}

        </div>
    `;


    const input =
        section.querySelector("#glossary-search");

    const items =
        section.querySelectorAll(".glossary-item");


    input.addEventListener("input", event => {

        const query =
            event.target.value.trim().toLowerCase();

        items.forEach(item => {

            const term =
                item.dataset.glossaryTerm;

            item.hidden =
                query && !term.includes(query);
        });
    });


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
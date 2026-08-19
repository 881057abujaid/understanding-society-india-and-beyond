export function renderGeographyUX(subjectUX) {

    const wrapper = document.createElement("section");

    wrapper.className = "subject-ux geography-ux";

    if (subjectUX.visuals?.length) {

        const visuals = document.createElement("div");

        visuals.className = "geography-visuals";

        visuals.innerHTML = `
            <h3>🌍 Visual Learning</h3>

            ${subjectUX.visuals.map(renderVisual).join("")}
        `;

        wrapper.appendChild(visuals);
    }


    if (subjectUX.processes?.length) {

        const processes = document.createElement("div");

        processes.className = "geography-processes";

        processes.innerHTML = `
            <h3>🔄 Processes</h3>

            ${subjectUX.processes
                .map(renderProcess)
                .join("")}
        `;

        wrapper.appendChild(processes);
    }

    return wrapper;
}


function renderVisual(visual) {

    return `
        <article class="visual-card">

            <h4>
                ${escapeHTML(visual.title)}
            </h4>

            <p>
                ${escapeHTML(visual.description || "")}
            </p>

            ${visual.labels?.length
            ? `
                    <div class="visual-labels">

                        ${visual.labels.map(label => `
                            <div class="visual-label">

                                <strong>
                                    ${escapeHTML(label.label)}
                                </strong>

                                <span>
                                    ${escapeHTML(label.hindi)}
                                </span>

                                <p>
                                    ${escapeHTML(label.explanation)}
                                </p>

                            </div>
                        `).join("")}

                    </div>
                    `
            : ""
        }

        </article>
    `;
}


function renderProcess(process) {

    return `
        <article class="process-card">

            <h4>
                ${escapeHTML(process.title)}
            </h4>

            <div class="process-steps">

                ${process.steps.map(step => `
                    <div class="process-step">

                        <span>
                            ${step.order}
                        </span>

                        <div>
                            <strong>
                                ${escapeHTML(step.title)}
                            </strong>

                            <p>
                                ${escapeHTML(step.explanation)}
                            </p>
                        </div>

                    </div>
                `).join("")}

            </div>

        </article>
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
import { renderHistoryUX } from "./historyRenderer.js";
import { renderGeographyUX } from "./geographyRenderer.js";
import {
    renderPoliticalScienceUX
} from "./politicalScienceRenderer.js";

import {
    renderEconomicsUX
} from "./economicsRenderer.js";


export function renderSubjectUX(subjectUX) {

    if (!subjectUX) {
        return null;
    }

    switch (subjectUX.type) {

        case "history":
            return renderHistoryUX(subjectUX);

        case "geography":
            return renderGeographyUX(subjectUX);

        case "political-science":
            return renderPoliticalScienceUX(subjectUX);

        case "economics":
            return renderEconomicsUX(subjectUX);

        case "foundation":
            return renderFoundationUX(subjectUX);

        default:
            console.warn(
                `Unknown subject UX: ${subjectUX.type}`
            );

            return null;
    }
}


function renderFoundationUX() {

    const section = document.createElement("section");

    section.className = "subject-ux foundation-ux";

    section.innerHTML = `
        <div class="subject-note">
            <span>🧭</span>

            <div>
                <strong>
                    Foundation Chapter
                </strong>

                <p>
                    इस chapter में concepts और उनके
                    आपसी connections पर विशेष ध्यान दें।
                </p>
            </div>
        </div>
    `;

    return section;
}
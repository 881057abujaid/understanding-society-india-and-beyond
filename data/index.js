import chapter1 from "./chapters/chapter1.js";

const chapters = {
    ch01: chapter1
};

export function getChapter(id) {
    return chapters[id] || null;
}

export function getAllChapters() {
    return Object.values(chapters);
}
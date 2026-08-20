import chapter1 from "./chapters/chapter1.js";
import chapter2 from "./chapters/chapter2.js";

const chapters = {
    ch01: chapter1,
    ch02: chapter2
};

export function getChapter(id) {
    return chapters[id] || null;
}

export function getAllChapters() {
    return Object.values(chapters);
}
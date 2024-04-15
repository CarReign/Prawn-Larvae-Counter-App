"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashFromString = void 0;
function hashFromString(str) {
    str = Buffer.from(str).toString('base64');
    var hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
exports.hashFromString = hashFromString;

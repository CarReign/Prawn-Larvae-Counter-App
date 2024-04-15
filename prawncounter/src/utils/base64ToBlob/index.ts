import { Buffer } from 'buffer';

export default function b64toBlob(b64Data: string, contentType = 'image/jpeg', sliceSize = 512) {
    const byteCharacters = Buffer.from(b64Data, 'base64');

    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteArray = new Uint8Array(slice);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}
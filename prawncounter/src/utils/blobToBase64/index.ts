export default async function blobToBase64(blob: Blob): Promise<String> {
    return new Promise((resolve, reject) => {
        const reader: any = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            const base64String = reader?.result.split(',')[1]; // Extract base64 portion of the result
            resolve(base64String);
        };
        reader.readAsDataURL(blob);
    });
}
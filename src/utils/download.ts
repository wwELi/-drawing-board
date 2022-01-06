export function downloadFile(filename: string, url: string): Promise<void> {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.append(link);

    link.click();
    document.body.removeChild(link);
    
    return Promise.resolve();
}
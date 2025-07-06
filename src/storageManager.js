export class StorageManager {
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };

    loadData(key) {
        if (key in localStorage) {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    return JSON.parse(data);
                } catch (error) {
                    console.error("Failed to parse project data from localStorage:", error);
                }
            }
        }
    };
}
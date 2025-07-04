export class StorageManager {
    saveData(project) {
        localStorage.setItem(project.id, project.toJSON())
    };

    loadData(project) {
        if (project.id) {
            const data = localStorage.getItem(project.id);
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    return project.fromJSON(parsedData);
                } catch (error) {
                    console.error("Failed to parse project data from localStorage:", error);
                }
            }
        }
    };
}
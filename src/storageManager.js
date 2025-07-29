export class StorageManager {
  saveData (key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save data to localStorage:', error)
    }
  }

  loadData (key) {
    try {
      const data = localStorage.getItem(key)
      return JSON.parse(data)
    } catch (error) {
      console.error('Failed to load data from localStorage:', error)
    }
  }
}

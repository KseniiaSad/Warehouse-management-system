function loadItems() {
    const data = localStorage.getItem("warehouse-items");
    if (!data) {
        return [
            { id: 1, name: "Зеркало", shelf: "A7", weight: 5, storageTime: "2023-11-29" },
            { id: 2, name: "Книги", shelf: "B14", weight: 1, storageTime: "2023-12-29" },
            { id: 3, name: "Посуда", shelf: "B17", weight: 5, storageTime: "2023-11-28" },
            { id: 4, name: "Игрушки", shelf: "S7", weight: 5, storageTime: "2023-12-14" }
        ];
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Ошибка при чтении из localStorage:", error);
        return [];
    }
}

function saveItems(items) {
    localStorage.setItem("warehouse-items", JSON.stringify(items));
}

export { loadItems, saveItems };
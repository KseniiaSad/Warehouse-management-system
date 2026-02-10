import { navigate } from './navigate.js';
import * as storage from './storage.js';
import * as components from './components.js';

export default function createWarehousePage(containerEl) {
    const items = storage.loadItems();

    function handleSort(field) {
        if (field === null) return;
        if (items.length === 0) return;
        const sampleValue = items[0][field];
        const type = typeof sampleValue;
        if (type === "undefined") return;
        if (type === "string") {
            items.sort((a, b) => a[field].localeCompare(b[field]));
        }
        if (type === "number") {
            items.sort((a, b) => a[field] - b[field]);
        }
        rowsMap = {};
        tableBodyEl.innerHTML = "";
        for (let item of items) {
            const row = components.getTableRowEl(item, handleDelete, registerRow);
            tableBodyEl.appendChild(row);
        }

        storage.saveItems(items);
    }

    let rowsMap = {};
    const registerRow = (id, tableRowEl) => {
        rowsMap[id] = tableRowEl;
    };

    const cardEl = components.getCardEl();
    const titleEl = components.getTitleEl("Склад");
    const buttonEl = components.getAddButtonEl("Добавить запись");
    const { tableEl, tableBodyEl } = components.getTableEl(items, handleDelete, registerRow, handleSort);

    buttonEl.addEventListener("click", () => {
        navigate("add-item");
    })

    const headerWrapper = components.getWrapEl();
    headerWrapper.append(titleEl, buttonEl);

    cardEl.append(headerWrapper, tableEl);
    containerEl.appendChild(cardEl);

    function handleDelete(id) {
        const index = items.findIndex(item => item.id === id);

        if (index !== -1) {
            items.splice(index, 1);
            storage.saveItems(items);
        }

        const rowElement = rowsMap[id];
        if (rowElement) {
            rowElement.remove();
            delete rowsMap[id];
        }
    }

    const loader = containerEl.querySelector(".loader");
    if (loader) loader.style.display = "none";
}
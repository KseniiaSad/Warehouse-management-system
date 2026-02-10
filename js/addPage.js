import { navigate } from './navigate.js';
import * as storage from './storage.js';
import * as components from './components.js';

export default function createAddPage(containerEl) {
    const cardEl = components.getCardEl();
    const titleEl = components.getTitleEl("Добавить запись");
    titleEl.classList.add("add-title");
    const formEl = components.getFormEl();

    const inputs = [
        { type: "text", name: "name", placeholder: "Название", required: true },
        { type: "text", name: "shelf", placeholder: "Полка", required: true },
        { type: "number", name: "weight", placeholder: "Вес", required: true },
        { type: "date", name: "storageTime", placeholder: "дд.мм.гг", required: true },

    ]

    for (let inputConfig of inputs) {
        const input = components.getInputEl(inputConfig.type, inputConfig.name, inputConfig.placeholder, inputConfig.required);
        formEl.append(input);
    }

    const buttonEl = components.getAddButtonEl("Добавить");

    formEl.appendChild(buttonEl);
    cardEl.append(titleEl, formEl);
    containerEl.appendChild(cardEl);

    formEl.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(formEl);

        const name = formData.get("name").trim();
        const shelf = formData.get("shelf").trim();
        const weight = parseFloat(formData.get("weight"));
        const storageTime = formData.get("storageTime");

        const newItem = {
            id: Date.now(),
            name,
            shelf,
            weight,
            storageTime
        };

        const items = storage.loadItems();
        items.push(newItem);
        storage.saveItems(items);

        navigate();
    });

    const loader = containerEl.querySelector(".loader");
    if (loader) loader.style.display = "none";
}
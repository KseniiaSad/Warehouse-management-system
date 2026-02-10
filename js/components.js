function getLoaderEl() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    return loader;
}

function getCardEl(text) {
    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    return cardEl;
}

function getWrapEl() {
    const wrapEl = document.createElement("div");
    wrapEl.classList.add("inner-wrapper");
    return wrapEl;
}

function getTitleEl(text) {
    const titleEl = document.createElement("h1");
    titleEl.textContent = text;
    titleEl.classList.add("main-title");
    return titleEl;
}

function getAddButtonEl(text) {
    const addButtonEl = document.createElement("button");
    addButtonEl.textContent = text;
    addButtonEl.classList.add("add-button");
    return addButtonEl;
}

function getTableEl(items, onDelete, registerRow, handleSort) {
    const tableEl = document.createElement("table");
    tableEl.classList.add("table");

    const tableHeadEl = document.createElement("thead");
    const tableRowEl = document.createElement("tr");
    tableHeadEl.appendChild(tableRowEl);
    tableEl.appendChild(tableHeadEl);

    const columnsName = ["Название", "Полка", "Вес", "Время хранения", ""];
    const fields = ["name", "shelf", "weight", "storageTime", null];
    for (let i = 0; i < columnsName.length; i++) {
        const tableCellEl = document.createElement("th");
        const field = fields[i];
        tableCellEl.addEventListener("click", () => {
            handleSort(field);
        })
        tableCellEl.textContent = columnsName[i];
        tableRowEl.append(tableCellEl);
    }

    const tableBodyEl = document.createElement("tbody");

    for (let item of items) {
        const tableRowsEl = getTableRowEl(item, onDelete, registerRow);
        tableBodyEl.appendChild(tableRowsEl);
    }

    tableEl.appendChild(tableBodyEl);

    return { tableEl, tableBodyEl };
}

function getTableRowEl(item, onDelete, registerRow) {
    const tableRowEl = document.createElement("tr");
    registerRow(item.id, tableRowEl);

    const cells = ["name", "shelf", "weight", "storageTime"];
    for (let cell of cells) {
        const tableCellEl = document.createElement("td");
        tableCellEl.textContent = item[cell];
        tableRowEl.appendChild(tableCellEl);
    };

    const tableActionCellEl = document.createElement("td");
    const tableRemoveButtonEl = document.createElement("button");
    tableRemoveButtonEl.textContent = "Удалить";
    tableRemoveButtonEl.classList.add("remove-button");
    tableActionCellEl.appendChild(tableRemoveButtonEl);
    tableRowEl.appendChild(tableActionCellEl);

    tableRemoveButtonEl.addEventListener("click", () => {
        onDelete(item.id);
    });

    return tableRowEl;
}

function getFormEl() {
    const formEl = document.createElement("form");
    formEl.classList.add("form");
    return formEl;
}

function getInputEl(type, name, placeholder, required = false) {
    const inputEl = document.createElement("input");

    inputEl.type = type;
    inputEl.name = name;
    inputEl.placeholder = placeholder;

    if (required) {
        inputEl.required = true;
    }

    inputEl.classList.add("text-field");

    return inputEl;
}

export {
    getLoaderEl,
    getCardEl,
    getWrapEl,
    getTitleEl,
    getAddButtonEl,
    getTableEl,
    getTableRowEl,
    getFormEl,
    getInputEl
};
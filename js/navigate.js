import { getLoaderEl } from './components.js';
import createWarehousePage from './warehousePage.js';

function navigate(pageName) {
    const appEl = document.getElementById("app");

    appEl.innerHTML = "";

    const loader = getLoaderEl();
    appEl.appendChild(loader);
    loader.style.display = "block";

    setTimeout(async () => {
        switch (pageName) {
            case "add-item":
                const addPage = await import('./addPage.js');
                addPage.default(appEl);
                break;
            default:
                createWarehousePage(appEl);
        }
    }, 500);
}

function showInitialLoader() {
    const appEl = document.getElementById("app");

    appEl.innerHTML = "";

    const loader = getLoaderEl();
    appEl.appendChild(loader);
    loader.style.display = "block";

    setTimeout(() => {
        navigate();
    }, 5000);
}

export { navigate, showInitialLoader };
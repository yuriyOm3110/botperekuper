const tg = window.Telegram.WebApp;
tg.expand();

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

const title = document.getElementById("title");
const addBlock = document.getElementById("add-block");
const sellBlock = document.getElementById("sell-block");

if (mode === "sell") {
    title.innerText = "💰 Продажа товара";
    addBlock.style.display = "none";
    sellBlock.style.display = "block";
    loadItems();
} else {
    title.innerText = "➕ Добавление товара";
}

function addItem() {
    const name = document.getElementById("name").value;
    const buyPrice = parseFloat(document.getElementById("buy_price").value);

    if (!name || !buyPrice) {
        alert("Заполни все поля");
        return;
    }

    tg.sendData(JSON.stringify({
        type: "add",
        name: name,
        buy_price: buyPrice
    }));

    tg.close();
}

function sellItem() {
    const itemId = document.getElementById("items").value;
    const sellPrice = parseFloat(document.getElementById("sell_price").value);

    if (!itemId || !sellPrice) {
        alert("Заполни все поля");
        return;
    }

    tg.sendData(JSON.stringify({
        type: "sell",
        item_id: itemId,
        sell_price: sellPrice
    }));

    tg.close();
}

/* ⚠️ ВАЖНО
   Здесь заглушка.
   В следующем шаге я подключу реальный список товаров из БД через API
*/
function loadItems() {
    const select = document.getElementById("items");
    select.innerHTML = `<option value="1">Товар #1</option>`;
}

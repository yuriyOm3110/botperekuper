const tg = window.Telegram.WebApp;
tg.expand();

// user_id из Telegram initData
const userId = tg.initDataUnsafe.user.id;

const select = document.getElementById("item");
const btn = document.getElementById("sellBtn");

// Загружаем товары с FastAPI
async function loadItems() {
    try {
        const res = await fetch(`http://127.0.0.1:8000/items/${userId}`);
        const items = await res.json();
        select.innerHTML = "";

        if(items.length === 0) {
            select.innerHTML = `<option value="">Нет товаров</option>`;
            return;
        }

        items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.text = `${item.name} (Цена покупки: ${item.buy_price})`;
            select.appendChild(opt);
        });
    } catch(err) {
        console.error(err);
        select.innerHTML = `<option value="">Ошибка загрузки товаров</option>`;
    }
}

// Отправка данных при продаже
btn.addEventListener("click", () => {
    const itemId = select.value;
    const sellPrice = parseFloat(document.getElementById("sell_price").value);

    if(!itemId || !sellPrice) {
        alert("Заполни все поля");
        return;
    }

    tg.sendData(JSON.stringify({
        type: "sell",
        item_id: itemId,
        sell_price: sellPrice
    }));

    tg.close();
});

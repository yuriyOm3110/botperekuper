const tg = window.Telegram.WebApp;
tg.expand();

// получаем user_id из Telegram initData (Telegram шлёт его)
const userId = tg.initDataUnsafe.user.id;

async function loadItems() {
    const select = document.getElementById("item");
    try {
        const res = await fetch(`http://127.0.0.1:8000/items/${userId}`);
        const items = await res.json();

        select.innerHTML = "";
        if (items.length === 0) {
            select.innerHTML = `<option value="">Нет товаров</option>`;
            return;
        }

        items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.id;
            opt.text = `${item.name} (Цена покупки: ${item.buy_price})`;
            select.appendChild(opt);
        });
    } catch (err) {
        console.error(err);
        select.innerHTML = `<option value="">Ошибка загрузки товаров</option>`;
    }
}

// загружаем товары сразу при открытии
loadItems();

function sell() {
    const itemId = document.getElementById("item").value;
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


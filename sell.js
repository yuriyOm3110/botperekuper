const tg = window.Telegram.WebApp;
tg.expand();

function sell() {
    const itemId = document.getElementById("item").value;
    const sellPrice = parseFloat(
        document.getElementById("sell_price").value
    );

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

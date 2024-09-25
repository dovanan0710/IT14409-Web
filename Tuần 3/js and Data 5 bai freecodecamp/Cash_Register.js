function checkCashRegister(price, cash, cid) {
    const currencyUnits = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.10],
        ["QUARTER", 0.25],
        ["ONE", 1.00],
        ["FIVE", 5.00],
        ["TEN", 10.00],
        ["TWENTY", 20.00],
        ["ONE HUNDRED", 100.00],
    ];
    // Tính toán số tiền thối
    let changeDue = cash - price;
    let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0);

    // Chuyển đổi cid thành một đối tượng cho việc xử lý dễ hơn
    const cidObj = Object.fromEntries(cid);

    // Kiểm tra các trường hợp
    if (totalCid < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    if (totalCid === changeDue) {
        return { status: "CLOSED", change: cid };
    }

    // Xử lý trả tiền thối
    let changeArray = [];
    for (let i = currencyUnits.length - 1; i >= 0; i--) {
        const currencyName = currencyUnits[i][0];
        const currencyValue = currencyUnits[i][1];
        let currencyAvailable = cidObj[currencyName];
        let amountToReturn = 0;

        // Tính toán số tiền sẽ trả cho từng loại tiền tệ
        while (changeDue >= currencyValue && currencyAvailable > 0) {
            changeDue -= currencyValue;
            currencyAvailable -= currencyValue;
            amountToReturn += currencyValue;
            changeDue = Math.round(changeDue * 100) / 100; // Làm tròn để tránh lỗi số học
        }

        // Nếu có tiền trả cho loại tiền tệ này, thêm vào mảng trả tiền
        if (amountToReturn > 0) {
            changeArray.push([currencyName, amountToReturn]);
        }
    }

    // Kiểm tra xem có trả đủ tiền thối không
    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    // Nếu không còn tiền thối cần trả, trả về trạng thái "OPEN"
    return { status: "OPEN", change: changeArray };
}


checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

let data;
let expenditureArray = [];
let percentageArray = [];
let colorArray = [];

function drawChart() {
    data = document.getElementById("json-data").value;
    percentageArray = createPercentArray();
    colorArray = createRandomColorArray();
    populateArray(data);
    drawPie();
}

function populateArray(jsonData) {
    let expenseArray = JSON.parse(jsonData);
    for (let i = 0; i < expenseArray.expenditure.length; i++) {
        let expense = expenseArray.expenditure[i];
        console.log("Expense ->", expense);
        expenditureArray[i] = expense;
    }
}

function createPercentArray() {
    let perArr = [];
    for (let i = 0; i < expenditureArray.length; i++) {
        perArr[i] = expenditureArray[i].percent * .02;
    }
    return perArr;
}

function createRandomColorArray() {
    let randColorArr = [];
    for (let i = 0; i < expenditureArray.length; i++) {
        randColorArr[i] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    return randColorArr;
}

function drawPie() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let startAngle = 0;
    let endAngle = 0;

    for (let i = 0; i < percentageArray.length; i++) {
        startAngle = endAngle;
        endAngle = endAngle + (percentageArray[i] * Math.PI);

        drawSlice(context, 300, 200, 150, startAngle, endAngle, colorArray[i]);

        drawSliceText(context, 300, 200, 150, startAngle, endAngle, percentageArray[i] * 50);
    }
}

function drawSlice(ctx, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();

    let medianAngle = (startAngle + endAngle)/2;
    let xOffSet = Math.cos(medianAngle) * 30;
    let yOffSet = Math.sin(medianAngle) * 30;

    ctx.moveTo(sliceCenterX + xOffSet, sliceCenterY + yOffSet);
    ctx.arc(sliceCenterX + xOffSet, sliceCenterY + yOffSet, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

function drawSliceText(ctx, sliceCenterX, sliceCenterY, radius, startAngle, endAngle, percentText) {
    let textX = sliceCenterX + Math.cos((startAngle + endAngle)/2) * radius;
    let textY = sliceCenterY + Math.sin((startAngle + endAngle)/2) * radius;

    ctx.fillStyle = "black";
    ctx.font = "24px Calibri";
    ctx.fillText(percentText, textX, textY);
}
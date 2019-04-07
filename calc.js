"use strict";

//Decimal.set({ precision: 50});

const voltField = document.getElementById("volt");
const ampereField = document.getElementById("ampere");
const ohmField = document.getElementById("ohm");
const wattField = document.getElementById("watt");

let voltString;
let ampereString;
let ohmString;
let wattString;

const GDecimal   = new Decimal("1000000000");
const MDecimal   = new Decimal("1000000");
const kDecimal   = new Decimal("1000");
const oneDecimal = new Decimal("1");
const mDecimal   = new Decimal("0.001");
const uDecimal   = new Decimal("0.000001");
const pDecimal   = new Decimal("0.000000000001");
const fDecimal   = new Decimal("0.000000000000001");

const isNumberReg = /^[0-9]\d*(\.\d+)?$/;

function calculateDecimals(string) {
    let numString = string;

    if (isNumberReg.test(numString) === false)
        numString = numString.substring(0, numString.length - 1);
    if (isNumberReg.test(numString) === false && numString.includes(".") === false)
        return calculateDecimalsOhm(string);
    if (isNumberReg.test(numString) === false) {
        numString = numString.substring(0, numString.length - 1);
        string = string.replace("Ω", "");
    }

    let decimal = new Decimal(numString);
    if (string.endsWith("G"))
        return decimal.times(GDecimal);

    if (string.endsWith("M"))
        return decimal.times(MDecimal);

    if (string.endsWith("k"))
        return decimal.times(kDecimal);

    if (string.endsWith("m"))
        return decimal.times(mDecimal);

    if (string.endsWith("u") || string.endsWith("µ"))
        return decimal.times(uDecimal);

    if (string.endsWith("p"))
        return decimal.times(pDecimal);

    if (string.endsWith("f"))
        return decimal.times(fDecimal);

    else
        return decimal;
}

function calculateDecimalsOhm(string) {
    if (string.includes("G")) {
        let numString = string.replace("G", ".").replace("Ω", "");
        return new Decimal(numString).times(GDecimal);
    }
    if (string.includes("M")) {
        let numString = string.replace("M", ".").replace("Ω", "");
        return new Decimal(numString).times(MDecimal);
    }
    if (string.includes("k")) {
        let numString = string.replace("k", ".").replace("Ω", "");
        return new Decimal(numString).times(kDecimal);
    }
    if (string.includes("m")) {
        let numString = string.replace("m", ".").replace("Ω", "");
        return new Decimal(numString).times(mDecimal);
    }
    if (string.includes("u")) {
        let numString = string.replace("u", ".").replace("Ω", "");
        return new Decimal(numString).times(uDecimal);
    }
    if (string.includes("p")) {
        let numString = string.replace("p", ".").replace("Ω", "");
        return new Decimal(numString).times(pDecimal);
    }
    if (string.includes("f")) {
        let numString = string.replace("f", ".").replace("Ω", "");
        return new Decimal(numString).times(fDecimal);
    }
    else if (string.includes("Ω")) {
        let numString = string.replace("Ω", ".");
        return new Decimal(numString);
    }
}

function calculateVoltage() {
    if (ampereString !== "") {
        let ampereDecimal = calculateDecimals(ampereString);

        if (ohmString !== "") {
            let ohmDecimal = calculateDecimals(ohmString);

            return ohmDecimal.times(ampereDecimal);
        }

        else if (wattString !== "") {
            let wattDecimal = calculateDecimals(wattString);
            return wattDecimal.dividedBy(ampereDecimal);
        }
    }
    else if (ohmString !== "") {
        let ohmDecimal = calculateDecimals(ohmString);
        if (wattString !== "") {
            let wattDecimal = calculateDecimals(wattString);
            let tempDecimal = ohmDecimal.times(wattDecimal);

            return tempDecimal.squareRoot();
        }
    }
    else {
        alert("At least 2 fields needs to be filled!");
    }
}

function calculateAmpere() {
    if (voltString !== "") {
        let voltDecimal = calculateDecimals(voltString);
        if (ohmString !== "") {
            let ohmDecimal = calculateDecimals(ohmString);

            return voltDecimal.dividedBy(ohmDecimal);
        }
        else if (wattString !== "") {
            let wattDecimal = calculateDecimals(wattString);

            return wattDecimal.dividedBy(voltDecimal);
        }
    }
    else if (ohmString !== "") {
        let ohmDecimal = calculateDecimals(ohmString);

        if (wattString !== "") {
            let wattDecimal = calculateDecimals(wattString);
            let tempDecimal = wattDecimal.dividedBy(ohmDecimal);

            return tempDecimal.squareRoot();
        }
    }
}


function calculateOhm() {
    if (voltString !== "") {
        let voltDecimal = calculateDecimals(voltString);
        if (ampereString !== "") {
            let ampereDecimal = calculateDecimals(ampereString);

            return voltDecimal.dividedBy(ampereDecimal);
        }
        else if (wattString !== "") {
            let wattDecimal = calculateDecimals(wattString);

            let tempDecimal = voltDecimal.toPower(2);

            return tempDecimal.dividedBy(wattDecimal);
        }
    }
    else if (ampereString !== "") {
        let ampereDecimal = calculateDecimals(ampereString);
        if (wattString !== "") {
            let wattDecimal = calculateDecimals(wattString);
            let tempDecimal = ampereDecimal.toPower(2);

            return wattDecimal.dividedBy(tempDecimal);
        }
    }
}

function calculateWatt() {
    if (voltString !== "") {
        let voltDecimal = calculateDecimals(voltString);

        if (ampereString !== "") {
            let ampereDecimal = calculateDecimals(ampereString);

            return voltDecimal.times(ampereDecimal);
        }
        else if (ohmString !== "") {
            let ohmDecimal = calculateDecimals(ohmString);

            let tempDecimal = voltDecimal.toPower(2);

            return tempDecimal.dividedBy(ohmDecimal);
        }
    }

    else if (ampereString !== "") {
        let ampereDecimal = calculateDecimals(ampereString);
        if (ohmString !== "") {
            let ohmDecimal = calculateDecimals(ohmString);

            let tempDecimal = ampereDecimal.toPower(2);

            return ohmDecimal.times(tempDecimal);
        }
    }
}

function toString(decimal, unit) {
    if (decimal.greaterThanOrEqualTo(GDecimal))
        return decimal.dividedBy(GDecimal).toString() + "G" + unit;

    if (decimal.greaterThanOrEqualTo(MDecimal))
        return decimal.dividedBy(MDecimal).toString() + "M" + unit;

    if (decimal.greaterThanOrEqualTo(kDecimal))
        return decimal.dividedBy(kDecimal).toString() + "k" + unit;

    if (decimal.greaterThanOrEqualTo(oneDecimal))
        return decimal.toString() + unit;

    if (decimal.greaterThanOrEqualTo(mDecimal))
        return decimal.dividedBy(mDecimal).toString() + "m" + unit;

    if (decimal.greaterThanOrEqualTo(uDecimal))
        return decimal.dividedBy(uDecimal).toString() + "u" + unit;

    if (decimal.greaterThanOrEqualTo(pDecimal))
        return decimal.dividedBy(pDecimal).toString() + "p" + unit;

    if (decimal.greaterThanOrEqualTo(fDecimal))
        return decimal.dividedBy(fDecimal).toString() + "f" + unit;

    else
        return decimal.toString() + unit;

}

function toStringOhm(decimal, unit) {
    if (decimal.greaterThanOrEqualTo(GDecimal)) {
        let str = decimal.dividedBy(GDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "G") + unit;
        else
            return str + "G" + unit;
    }
    if (decimal.greaterThanOrEqualTo(MDecimal)) {
        let str = decimal.dividedBy(MDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "M") + unit;
        else
            return str + "M" + unit;
    }
    if (decimal.greaterThanOrEqualTo(kDecimal)) {
        let str = decimal.dividedBy(kDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "k") + unit;
        else
            return str + "k" + unit;
    }
    if (decimal.greaterThanOrEqualTo(oneDecimal)) {
        let str = decimal.dividedBy(oneDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "Ω");
        else
            return str + unit;
    }
    if (decimal.greaterThanOrEqualTo(mDecimal)) {
        let str = decimal.dividedBy(mDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "m") + unit;
        else
            return str + "m" + unit;
    }
    if (decimal.greaterThanOrEqualTo(uDecimal)) {
        let str = decimal.dividedBy(uDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "u") + unit;
        else
            return str + "u" + unit;
    }
    if (decimal.greaterThanOrEqualTo(pDecimal)) {
        let str = decimal.dividedBy(pDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "p") + unit;
        else
            return str + "p" + unit;
    }
    if (decimal.greaterThanOrEqualTo(fDecimal)) {
        let str = decimal.dividedBy(fDecimal).toString();
        if (str.includes("."))
            return str.replace(".", "f") + unit;
        else
            return str + "f" + unit;
    }
    else
        return decimal.toString() + unit;

}


function calculate() {
    voltString = voltField.value.trim().replace("v", "").replace("V", "").replace(",", ".");
    ampereString = ampereField.value.trim().replace("a", "").replace("A", "").replace(",", ".");
    ohmString = ohmField.value.trim().replace(",", ".");
    wattString = wattField.value.trim().replace("w", "").replace("W", "").replace(",", ".");

    let fieldsFilled = 0;

    if (voltString.length > 0)
        fieldsFilled++;
    if (ampereString.length > 0)
        fieldsFilled++;
    if (ohmString.length > 0)
        fieldsFilled++;
    if (wattString.length > 0)
        fieldsFilled++;

    if (fieldsFilled > 2) {
        alert("More than two fields are filled!");
        return;
    }

    if (fieldsFilled < 2) {
        alert("Less than two fields are filled!");
        return;
    }

    if (voltString.length === 0) {
        voltField.value = toString(calculateVoltage(), "V");
    }
    if (ampereString.length === 0) {
        ampereField.value = toString(calculateAmpere(), "A");
    }
    if (ohmString.length === 0) {
        ohmField.value = toStringOhm(calculateOhm(), "Ω");
    }
    if (wattString.length === 0) {
        wattField.value = toString(calculateWatt(), "W");
    }

}


function clearWork() {
    voltField.value = "";
    ampereField.value = "";
    ohmField.value = "";
    wattField.value = "";

    voltString = "";
    ampereString = "";
    ohmString = "";
    wattString = "";

    voltField.focus();
}

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.key === "Enter") {
        calculate();
        evt.preventDefault();
    }

    if (evt.key === "Escape") {
        clearWork();
        evt.preventDefault();
    }

    if (evt.key === "q") {
        voltField.focus();
        evt.preventDefault();
    }

    if (evt.key === "i") {
        ampereField.focus();
        evt.preventDefault();
    }

    if (evt.key === "r") {
        ohmField.focus();
        evt.preventDefault();
    }

    if (evt.key === "z") {
        wattField.focus();
        evt.preventDefault();
    }


    if (evt.key === "Q") {
        voltField.value = "";
        evt.preventDefault();
    }

    if (evt.key === "I") {
        ampereField.value = "";
        evt.preventDefault();
    }

    if (evt.key === "R") {
        ohmField.value = "";
        evt.preventDefault();
    }

    if (evt.key === "Z") {
        wattField.value = "";
        evt.preventDefault();
    }
};

voltField.focus();
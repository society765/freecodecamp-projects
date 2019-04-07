/** @param {string} str */
function telephoneCheck(str) {
    var regex = /^(1 |1)?(\d{3}|\(\d{3}\))[ -]?\d{3}[ -]?\d{4}$/;
    return regex.test(str);
}

var res = telephoneCheck("1 (555)-555-5555");
console.log(res);
/** @param {string} str */
function rot13(str) { // LBH QVQ VG!
    var res = '';
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        var ct = c;
        if (c >= 65 && c <= 90) {
            if (c - 13 >= 65) ct = c - 13;
            else ct = 90 - 65 + c - 13 + 1;
        }
        res += String.fromCharCode(ct);
    }
    return res;
}

// Change the inputs below to test
// res = rot13("SERR PBQR PNZC");
res = rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.');
console.log(res);
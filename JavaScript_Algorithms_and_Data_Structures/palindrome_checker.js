/** @param {string} str */
function palindrome(str) {
    var str1 = str.match(/[A-Za-z0-9]/g).join('').toLowerCase();
    return str1.split('').reverse().join('') == str1;
}

// var res = palindrome("_eye");
var res = palindrome('Not a palindrome');
console.log(res);
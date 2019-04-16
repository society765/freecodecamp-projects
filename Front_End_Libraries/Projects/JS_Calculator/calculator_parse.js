const WRONG_SYNTAX = 'wrong syntax';
const DIVIDED_BY_0 = 'divided by 0';
const UNDEFINED = 'undefined';

/**@param {JSON} display */
const myParse = function (display, eventStr) {
    var fullDisplay = display.fullDisplay;
    var curNumber = display.curNumber;
    var newCalc = display.newCalc;

    if (newCalc) {
        if (curNumber == WRONG_SYNTAX || curNumber == DIVIDED_BY_0) {
            curNumber = '0';
            fullDisplay = '0';
        }
        else if ('+-*/'.includes(eventStr)) {
            fullDisplay = curNumber;
        } else {
            fullDisplay = '0';
            curNumber = '0';
        }
        newCalc = false;
    }

    var newDisplay = { 'fullDisplay': fullDisplay, 'curNumber': curNumber, 'newCalc': newCalc };

    switch (eventStr) {
        case 'C': newDisplay.fullDisplay = '0'; newDisplay.curNumber = '0'; newDisplay.newCalc = false; break;
        case '=': newDisplay = calc(newDisplay); break;

        case '.':
            if (newDisplay.curNumber.indexOf('.') == -1) {
                newDisplay['fullDisplay'] += eventStr; newDisplay['curNumber'] += eventStr;
            }
            break;
        case '+': case '-': case '*': case '/':
            newDisplay['curNumber'] = '0';
            var lastc = newDisplay.fullDisplay.slice(-1);
            if (['+', '-', '*', '/'].indexOf(lastc) != -1) {
                newDisplay['fullDisplay'] = newDisplay.fullDisplay.slice(0, -1);
            }
            newDisplay['fullDisplay'] += eventStr;
            break;

        // pure number
        default:
            if (newDisplay.curNumber == '0') {
                newDisplay['curNumber'] = '';
                if (newDisplay.fullDisplay.slice(-1) == '0') newDisplay['fullDisplay'] = newDisplay.fullDisplay.slice(0, -1);
            }
            newDisplay['fullDisplay'] += eventStr; newDisplay['curNumber'] += eventStr;
    }

    return newDisplay;
}

const calc = function (display) {
    if ('+-*/'.includes(display.fullDisplay.slice(-1))) {
        return { fullDisplay: display.fullDisplay, curNumber: WRONG_SYNTAX, newCalc: true };
    }

    var fullDisplay = display.fullDisplay;
    var sum = calcParsed(fullDisplay);
    if (sum == UNDEFINED) return { fullDisplay: display.fullDisplay, curNumber: DIVIDED_BY_0, newCalc: true };

    display.fullDisplay += '=' + sum.toString();
    display.curNumber = sum.toString();
    display.newCalc = true;

    return display;
}


/**@param {string} fullDisplay */
const calcParsed = function (fullDisplay) {
    var stack = [];

    var ret0 = getNext(fullDisplay);
    fullDisplay = ret0.next;
    if (ret0.parsed != '-') {
        stack.push(ret0.parsed);
    } else {
        ret0 = getNext(fullDisplay);
        stack.push(ret0.parsed * -1);
        fullDisplay = ret0.next;
    }

    while (fullDisplay.length != 0) {
        var ret;

        ret = getNext(fullDisplay);
        var sym_parsed = ret.parsed;
        fullDisplay = ret.next;

        ret = getNext(fullDisplay);
        var num_parsed = ret.parsed;
        fullDisplay = ret.next;

        switch (sym_parsed) {
            case '+': stack.push(num_parsed); break;
            case '-': stack.push(num_parsed * -1); break;
            case '*':
                var top = stack.slice(-1);
                stack.pop();
                top *= num_parsed;
                stack.push(top);
                break;
            case '/':
                if (num_parsed == 0) {
                    return UNDEFINED;
                } else {
                    var top = stack.slice(-1);
                    stack.pop();
                    top /= num_parsed;
                    stack.push(top);
                }
                break;
        }

        // console.log(num_parsed, sym_parsed, stack);
    }

    var sum = 0;
    for (var num of stack) sum += num;

    return sum;
}

/**@param {string} str */
const getNext = function (str) {
    var parsed, next;

    if (str.length == 0) return { parsed: '', next: '' };

    if ('+-/*'.includes(str[0])) {
        parsed = str[0];
        next = str.slice(1);
    }
    else {
        var num = parseFloat(str);
        var i = 0;
        while (i < str.length && '1234567890.'.includes(str[i])) i++;
        parsed = num;
        next = str.slice(i);
    }
    // console.log(parsed, next); 
    return { parsed: parsed, next: next };
}

export { myParse }; 
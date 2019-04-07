/** 
 * @param {number} price
 * @param {number} cash
 * @param {JSON} cid
 * @returns {JSON}
*/
function checkCashRegister(price, cash, cid) {
    var c_cid = new drawer(cid);
    // Here is your change, ma'am.
    return c_cid.req(cash - price);
}

class drawer {
    constructor(cid) {
        this.cid = cid;
        this.d = {
            'PENNY': 0.01, 'NICKEL': 0.05, 'DIME': 0.1, 'QUARTER': 0.25, 'ONE': 1, 'FIVE': 5, 'TEN': 10,
            'TWENTY': 20, 'ONE HUNDRED': 100
        };

        var j = 0;
        for (var i in this.d) {
            this[i] = cid[j][1] / this.d[i];
            j++;
        }

        this.total = cid.reduce((a, b) => a + b[1], 0);
    };

    req(change) {
        if (this.total == change) return { status: 'CLOSED', change: this.cid };
        else if (this.total < change) return { status: 'INSUFFICIENT_FUNDS', change: [] };
        else {
            var res = {};
            res['status'] = 'OPEN';
            res['change'] = {};
            var resa = [];

            var val;
            var des;

            var vala = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
            var desa = this.cid.map(x => x[0]).reverse();

            for (var i = 0; i < 9; i++) {
                // val = 100; des = 'ONE HUNDRED'; 
                val = vala[i]; des = desa[i];
                while (change >= val && this[des] > 0) {
                    change -= val;
                    this[des]--;
                    if (des in res['change']) res['change'][des]++;
                    else res['change'][des] = 1;
                }

                if (change < 0.01 && change > 0 && res['change']['PENNY'] > 0) {
                    change = 0;
                    this['PENNY']--;
                    res['change']['PENNY']++;
                }

                if (res['change'][des] > 0) resa.push([des, res['change'][des] * this.d[des]]);
            }


            if (change == 0) {
                return { status: 'OPEN', change: resa };
            } else {
                return { status: 'INSUFFICIENT_FUNDS', change: [] };
            }

        }
    };
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

// var res = checkCashRegister(19.5, 200, [["PENNY", 101], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 80], ["ONE HUNDRED", 100]]);
// var res = checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]); 
var res = checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
console.log(res);
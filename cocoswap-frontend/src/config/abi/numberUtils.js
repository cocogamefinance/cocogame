import {Decimal} from 'decimal.js';
// http://mikemcl.github.io/decimal.js/#
// https://github.com/MikeMcl/decimal.js
// npm install --save decimal.js
// ROUND_UP: 0;
// ROUND_DOWN: 1;
// ROUND_CEIL: 2;
// ROUND_FLOOR: 3;
// ROUND_HALF_UP: 4;
// ROUND_HALF_DOWN: 5;
// ROUND_HALF_EVEN: 6;
// ROUND_HALF_CEIL: 7;
// ROUND_HALF_FLOOR: 8;
// EUCLID: 9;

Decimal.set({
    toExpNeg: -9000000000000000,
    toExpPos: 9000000000000000,
    precision: 99,
    rounding: 4,
    modulo: 1,
    minE: -9e15,
    maxE: 9e15,
    crypto: false
})

// const _seed = null;

/**
 * 坑：数值型会只保留18位的长度，包括小数点，导致数据不准确
 * 避坑指南：
 * console.log("new Decimal(0.938044659618614761):" + new Decimal(0.938044659618614761))
 * console.log("new Decimal('0.938044659618614761'):" + new Decimal('0.938044659618614761'))
 *
 * new Decimal(0.938044659618614761):0.9380446596186147
 * new Decimal('0.938044659618614761'):0.938044659618614761
 *
 * console.log("new Decimal(0.938044659618614773):" + new Decimal(0.938044659618614773))
 * console.log("new Decimal(0.938044659618614774):" + new Decimal(0.938044659618614774))
 *
 * new Decimal(0.938044659618614773):0.9380446596186147
 * new Decimal(0.938044659618614773):0.9380446596186148
 *
 * 参数是字符串，结果不变；
 * 参数是数字型，结果会取舍为18位，包括小数点；大于等于74，会进，小于等于73会舍
 * 保证数据的准确性，参数应该传字符串类型
 * 非传数值型的，保证整体不超过18位，包括小数点
 */
class numberUtils {

    /**
     * 自动Id
     */
    // static uid() {
    //     _seed = _seed || (new Date()).valueOf();
    //     _seed++;
    //     return _seed;
    // }

    /**
     * 格式化
     * 参数：a
     */
    static toNumber(a, n, rounding) {
        if (!a) return 0;
        return new Decimal(new Decimal(a).toFixed(n, rounding)).toNumber();
    }

    /**
     * 小数位数
     * 参数：a
     */
    static decimalPlaces(a, n, rounding) {
        if (!a) return 0;
        return new Decimal(this.format(a, n, rounding)).decimalPlaces();
    }

    static dp(a, n, rounding) {
        if (!a) return 0;
        return new Decimal(this.format(a, n, rounding)).dp();
    }

    /**
     * 格式化
     * 参数：a
     */
    static format(a, n, rounding) {
        if (!a) return "0";
        return new Decimal(new Decimal(a).toFixed(n, rounding)).toString();
    }

    /**
     * 功能：加
     * 参数：a，b
     */
    static add(a, b, n, rounding) {
        if (!a && !b) return "0";
        const addAmount = new Decimal(a || 0).add(b || 0);
        return this.format(addAmount, n, rounding);
    }

    /**
     * 功能：减
     * 参数：a，b，
     */
    static sub(a, b, n, rounding) {
        if (!a && !b) return "0";
        const subAmount = new Decimal(a || 0).sub(b || 0);
        return this.format(subAmount, n, rounding);
    }

    /**
     * 功能：乘
     * 参数：a；因数
     */
    static mul(a, factor, n, rounding) {
        if (!a || (!factor && typeof factor !== 'number')) {
            return "0";
        }
        const mulAmount = new Decimal(a || 0).mul(factor || 0);
        return this.format(mulAmount, n, rounding);
    }

    /**
     * 功能：除
     * 参数：a除数；b被除数
     */
    static div(a, b, n, rounding) {
        if (!b || b === "0") return null;
        const divAmount = new Decimal(a || 0).div(b);
        return this.format(divAmount, n, rounding);
    }

    /**
     * 功能：左移
     */
    static movePointLeft(a, n) {
        if (!a || a === "0") return 0;
        return this.div(a, new Decimal("10").toPower(n));
    }

    /**
     * 功能：右移
     */
    static movePointRight(a, n) {
        if (!a || a === "0") return 0;
        return this.mul(a, new Decimal("10").toPower(n));
    }

    /**
     * 功能：比较大小
     */
    static comparedTo(a, b) {
        try {
            return new Decimal(a).comparedTo(new Decimal(b));
        } catch (error) {
            return null;
        }
    }

    static min(...values) {
        try {
            return Decimal.min(...values);
        } catch (error) {
            return null;
        }
    }

    static max(...values) {
        try {
            return Decimal.max(...values);
        } catch (error) {
            return null;
        }
    }

    static isPositiveInteger(number) {
        const numReg = /^[0-9]*$/
        const numRe = new RegExp(numReg)
        if (!numRe.test(number)) {
            return false
        }
        return true;
    }
}

export default numberUtils;
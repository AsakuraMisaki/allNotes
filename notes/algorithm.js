"use strict";
//[Warn] Aware of your poor knowleage
//declaration: [Warn]-the most unigorable resolution; [A]{name}-algorithm 
//[A]{dynamic programming(dp)}
var DP = /** @class */ (function () {
    function DP(q) {
        switch (q) {
            case "egg": {
                console.warn(this.eggs());
                break;
            }
            default: {
                throw new TypeError("dp: no [" + q + "] questions");
            }
        }
    }
    //鸡蛋楼层问题
    DP.prototype.eggs = function (e, h) {
        if (e === void 0) { e = 3; }
        if (h === void 0) { h = 1000; }
        var f = [];
        for (var i = 0; i < e; i++) {
            f[i] = [];
            for (var j = 0; j < h; j++) {
                f[i][j] = j; //各个e/h组合最坏解
            }
        }
        for (var i = 1; i < e; i++) {
            for (var j = 1; j < h; j++) {
                for (var x = 1; x < j; x++) {
                    //x -- 假设从x层开始扔，不同x值划分出对应的子问题/子状态不同，从多个子状态中添加条件拿出合适解
                    //eg. 2/4(j=4) ->(x=1)->碎(1/x-1=0);不碎(2/j-x=3)取最大值+1;  
                    //(x=2)->碎(1/x-1=0);不碎(2/j-x=2)取最大值+1; (x=3)...(x=j)
                    f[i][j] = Math.min(f[i][j], 1 + Math.max(f[i - 1][x - 1], f[i][j - x]));
                }
            }
        }
        return f[e - 1][h - 1];
    };
    return DP;
}());
//[A]{common math question}
var Common = /** @class */ (function () {
    function Common(q) {
        switch (q) {
            case 'complexPow': {
                console.warn(this.complexPow(12345, 2, 3));
                break;
            }
            default: {
                throw new TypeError("common: no [" + q + "] questions");
            }
        }
    }
    Common.prototype.complexPow = function (time, a, b) {
        var oa = a;
        var ob = b;
        for (var i = 0; i < time; i++) {
            var t = oa * a - ob * b;
            b = oa * b + ob * a;
            a = t;
        }
        return a + " + " + b + "i";
    };
    return Common;
}());
//[A]{group}
var Group = /** @class */ (function () {
    function Group(q) {
        switch (q) {
            case 'tuple': {
                console.warn(this.tuple(3));
                break;
            }
            default: {
                throw new TypeError("group: no [" + q + "] questions");
            }
        }
    }
    Group.prototype.tuple = function (tuple, a, b, c) {
        if (tuple === void 0) { tuple = 3; }
        if (a === void 0) { a = [1, 1, 1]; }
        if (b === void 0) { b = [2, 2, 2]; }
        if (c === void 0) { c = [3, 3, 3]; }
        var count = 0;
        for (var i = 0; i < tuple; i++) {
            for (var j = 0; j < tuple; j++) {
                for (var k = 0; k < tuple; k++) {
                    if (a[i] < b[j] && b[j] < c[k]) {
                        count++;
                    }
                }
            }
        }
        return count + 9;
    };
    return Group;
}());
//test-main
{
    //new DP("egg");
    //new Common("complexPow");
    new Group("tuple");
}

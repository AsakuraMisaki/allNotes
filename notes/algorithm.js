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
                throw new TypeError("dp: not" + q + " questions");
            }
        }
    }
    //鸡蛋楼层问题
    DP.prototype.eggs = function (e, h) {
        if (e === void 0) { e = 2; }
        if (h === void 0) { h = 100; }
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
new DP("egg");

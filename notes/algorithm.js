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
        return 11;
    };
    return Group;
}());
//BFS
//node struct
//[p]<amv> - the value (number[]) of the node in the adjacency matrix
var MyNode = /** @class */ (function () {
    function MyNode(amv, order) {
        this.parent = Object();
        this.amv = amv;
        this.order = order;
    }
    MyNode.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    return MyNode;
}());
var BFS = /** @class */ (function () {
    function BFS(width, height, start, end) {
        var gi = this.graphInit(width, height);
        var visited = new Array(gi.nc);
        var searhQueue;
        var nodeList = [];
        // gi.am[1][3] = 0;
        // gi.am[3][1] = 0;
        // gi.am[2][3] = 0;
        // gi.am[3][2] = 0;
        for (var i = 0; i < gi.nc; i++) {
            nodeList.push(new MyNode(gi.am[i], i));
        }
        for (var v = 0; v < visited.length; v++) {
            visited[v] = false;
        }
        var found = false;
        visited[start] = true;
        searhQueue = [nodeList[start]];
        var path = 'path: ';
        while (!found) {
            //queue head pop
            var temp = searhQueue[0];
            start = temp.order;
            searhQueue.shift();
            //select the next search queue nodes (the direct clid nodes of the current one)
            //set their parent to the current one
            for (var j = 0; j < temp.amv.length; j++) {
                //ignore visited
                if (temp.amv[j] === 1 && visited[j] === false) {
                    //console.warn(j);
                    visited[j] = true;
                    searhQueue.push(nodeList[j]);
                    nodeList[j].setParent(nodeList[start]);
                    if (j === end) {
                        found = true;
                        break;
                    }
                }
            }
        }
        for (var i = 0; i < nodeList.length; i++) {
            console.warn("o-p " + nodeList[i].order + "-" + nodeList[i].parent.order);
        }
    }
    //adjacency matrix邻接矩阵
    BFS.prototype.graphInit = function (width, height) {
        //node array
        var nodeCount = (width * height);
        var node = new Array(nodeCount);
        var xMax = width;
        //[adjacency matrix邻接矩阵] 
        var am = new Array(nodeCount);
        //the simple grid graph generated through loop
        //when not match directly, 0, otherwise 1 (Undirected graph)
        for (var i = 0; i < nodeCount; i++) {
            am[i] = new Array(nodeCount);
            for (var j = 0; j < nodeCount; j++) {
                am[i][j] = 0;
            }
        }
        for (var i = 0; i < nodeCount - xMax; i++) {
            //console.warn(i);
            am[i][i + 1] = 1;
            am[i + 1][i] = 1;
            am[i][i + xMax] = 1;
            am[i + xMax][i] = 1;
            if ((i + 1) % xMax === 0) {
                am[i][i + 1] = 0;
                am[i + 1][i] = 0;
            }
        }
        for (var i = nodeCount - xMax; i < nodeCount - 1; i++) {
            am[i][i + 1] = 1;
            am[i + 1][i] = 1;
        }
        console.warn(JSON.stringify(am));
        return {
            nc: nodeCount,
            am: am
        };
    };
    return BFS;
}());
//test-main
{
    //new DP("egg");
    //new Common("complexPow");
    // Group("tuple");
    new BFS(2, 3, 0, 5);
}

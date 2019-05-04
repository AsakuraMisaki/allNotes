//[Warn] Aware of your poor knowleage


//declaration: [Warn]-the most unigorable resolution; [A]{name}-algorithm 
//[A]{dynamic programming(dp)}

class DP {

    constructor(q:string){
        switch(q){
            case "egg":{
                console.warn(this.eggs());
                break;
            }
            default: {
                throw new TypeError("dp: no [" + q + "] questions");
            }
        }
    }

    //鸡蛋楼层问题
    eggs(e=3, h=1000): number{
        let f: number[][] = [];
    
        for(let i=0; i<e; i++){
            f[i] = [];
            for(let j=0; j<h; j++){
                f[i][j] = j; //各个e/h组合最坏解
            }
        }
    
        for(let i=1; i<e; i++){
            for(let j=1; j<h; j++){
                for(let x=1; x<j; x++){
                    //x -- 假设从x层开始扔，不同x值划分出对应的子问题/子状态不同，从多个子状态中添加条件拿出合适解
                    //eg. 2/4(j=4) ->(x=1)->碎(1/x-1=0);不碎(2/j-x=3)取最大值+1;  
                    //(x=2)->碎(1/x-1=0);不碎(2/j-x=2)取最大值+1; (x=3)...(x=j)
                    f[i][j] = Math.min(f[i][j], 1+Math.max(f[i-1][x-1], f[i][j-x]));     
                }
            }
        }
    
        return f[e-1][h-1];
    }
    
}

//[A]{common math question}
class Common{
    constructor(q: string){
        switch(q){
            case 'complexPow':{
                console.warn(this.complexPow(12345, 2, 3));
                break;
            }
            default: {
                throw new TypeError("common: no [" + q + "] questions");
            }
        }
    }

    complexPow(time: number, a: number, b: number): string{
        let oa = a;
        let ob = b;
        for(let i=0; i<time; i++){
            let t = oa*a - ob*b;
            b = oa*b + ob*a;
            a = t;
        }
        return a + " + " + b + "i";
    }
}

//[A]{group}
class Group{
    constructor(q: string){
        switch(q){
            case 'tuple':{
                console.warn(this.tuple(3));
                break;
            }
            default: {
                throw new TypeError("group: no [" + q + "] questions");
            }
        }
    }

    tuple(tuple: number=3, a:number[] = [1,1,1], b:number[] = [2,2,2], c:number[] = [3,3,3]):number{
        let count: number = 0;
        for(let i=0; i<tuple; i++){
            for(let j=0; j<tuple; j++){
                for(let k=0; k<tuple; k++){
                    if(a[i]<b[j] && b[j]<c[k]){
                        count++;
                    }
                }            
            }
        }
        return 11;
    }

}

//BFS
//node struct
//[p]<amv> - the value (number[]) of the node in the adjacency matrix
class MyNode{
    parent: MyNode = Object();
    amv: number[];
    order: number;
    constructor(amv: number[], order: number){
        this.amv = amv;
        this.order = order;
    }
    setParent(parent: MyNode){
        this.parent = parent;
    }
}
class BFS{

    constructor(width: number, height:number, start:number, end:number){
        let gi = this.graphInit(width, height);
        let visited = new Array(gi.nc);
        let searhQueue;
        let nodeList = [];
        // gi.am[1][3] = 0;
        // gi.am[3][1] = 0;
        // gi.am[2][3] = 0;
        // gi.am[3][2] = 0;
        for(let i=0; i<gi.nc; i++){
            nodeList.push(new MyNode(gi.am[i], i));
        }
        for(let v=0; v<visited.length; v++){
            visited[v] = false;
        }
        let found = false;
        visited[start] = true;
        searhQueue = [nodeList[start]];
        let path = 'path: ';
        while(!found){
            //queue head pop
            let temp = searhQueue[0];
            start = temp.order;
            searhQueue.shift();
            //select the next search queue nodes (the direct clid nodes of the current one)
            //set their parent to the current one
            for(let j=0; j<temp.amv.length; j++){
                //ignore visited
                if(temp.amv[j] === 1 && visited[j]=== false){
                    //console.warn(j);
                    visited[j] = true;
                    searhQueue.push(nodeList[j]);
                    nodeList[j].setParent(nodeList[start]);
                    if(j === end){
                        found = true; 
                        break;
                    }
                }
            }  
        }  
        for(let i=0; i<nodeList.length; i++){
            console.warn("o-p " + nodeList[i].order + "-" + nodeList[i].parent.order)
        }
    }

    //adjacency matrix邻接矩阵
    graphInit(width: number, height: number){
        //node array
        let nodeCount = (width*height);
        let node = new Array(nodeCount);
        let xMax = width;
        //[adjacency matrix邻接矩阵] 
        let am = new Array(nodeCount);
        //the simple grid graph generated through loop
        //when not match directly, 0, otherwise 1 (Undirected graph)
        for(let i=0; i<nodeCount; i++){
            am[i] = new Array(nodeCount);
            for(let j=0; j<nodeCount; j++){
                am[i][j] = 0;
            }
        }
        for(let i=0; i<nodeCount-xMax; i++){
            //console.warn(i);
            am[i][i+1] = 1;
            am[i+1][i] = 1;
            am[i][i+xMax] = 1;
            am[i+xMax][i] = 1;
            if((i+1)%xMax === 0){
                am[i][i+1] = 0;
                am[i+1][i] = 0;
            }
        }
        for(let i=nodeCount-xMax; i<nodeCount-1; i++){
            am[i][i+1] = 1;
            am[i+1][i] = 1;
        }
        console.warn(JSON.stringify(am));
        return {
            nc: nodeCount,
            am: am
        }
    }
}

//test-main
{
    //new DP("egg");
    //new Common("complexPow");
    // Group("tuple");
    new BFS(2,3,0,5);
}




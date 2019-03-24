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
        return count + 9;
    }

}

//test-main
{
    //new DP("egg");
    //new Common("complexPow");
    new Group("tuple");

}




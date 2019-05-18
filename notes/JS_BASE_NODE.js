//MISAKI
//EXPRESS & NODEJS & JS_SELF & DOM
//debug and find the differences among log/debug orders

//notes:
//1.  req.params[n]: (route)/temp/*/*/*
//->/temp/x/y/z->req.params[0]= x; [1]= y; [2]= z;
//2.  req.query: (url)/temp?x=2&y=3->req.query.x=2;
//3.  we do not know which callback(回调函数) faster!
//4.  pathExp: ./==>root; ../==>baseUrl of root 
//5.  express-static: express.static('staticFilePath', op)==> need not to add relative routes, instead use root
//==> (right)host/static.file==> (false)host/staicFilePath/static.file==> because the staicFilePath route will be 
//appended to global staticFile list, when staticFile is visited, server will find and send the file from the list
/*6.  useful sql prepare/execute syntax:
mysql> PREPARE stmt1 FROM 'SELECT SQRT(POW(?,2) + POW(?,2)) AS hypotenuse';
mysql> SET @a = 3;
mysql> SET @b = 4;
mysql> EXECUTE stmt1 USING @a, @b;*/

const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

//function return
let t0 = function() {
    let b = function() { return 1; };
    console.log(b);
    console.log(b());
};
//t0();


//this specificities
let t1 = function() {
    let G = {
        t0: { Object: '/' },
        this0: function() { console.log(this); }, //function/inside type: this==> the object
        this1: this, //key-value/outside type: this==> global this
    };
    G.this0(); // this1 have many options
    exports.Gx = G; //= module.exports.[customName]= definedName
};
//t1();

//let specificities
let t3 = function() {
    let ob = {
        ob: function() { return this },
        x: 1
    };
    let obv = ob;
    let obn = ob.ob();
    console.log(ob.x + '/' + obv.x + '/' + obn);
    obv.x = 2;
    console.log(ob.x + '/' + obv.x + '/' + obn.x);
};
//t3();

//try-catch in error handle(js included)

let t4 = function(s) {
    try {
        s = Buffer.from(s, 'base64');
        //!here will be stopped by throw(from s above) and turn to catch
        console.log('!here will be stopped by throw(from s above) and turn to catch');
    } catch (err) {
        console.log('err0: ' + err);
        try {
            console.log('!here will not be stopped by throw');
            throw new ReferenceError('err1: first argument is illegal');
            //console.log('!here will be stopped by throw and turn to catch');
        } catch (err) {
            console.log(err);
        }
    } //once an error is thrown and not be caught, program finish
    let e = 'catch all err thrown';
    console.log(e); //if not using try-catch, these will not be executed执行
};
//t4()

//implicit arguments in js function: arguments, this
let t5 = function() {
    console.log(arguments);
    console.log(arguments.length);
};
//t5('x', 'y');

//datatype with let
let t6 = function() {
    let ob = { num: 123, s: 's', ob: { n: '?' }, arr: ['1', '2'] };
    let obn = ob.num;
    obn++;
    console.log('n->' + obn + '/' + ob.num);
    let obs = ob.s;
    obs = obs + '?';
    console.log('s->' + obs + '/' + ob.s);
    let obob = ob.ob;
    obob.n = 'x';
    console.log('ob->' + obob.n + '/' + ob.ob.n);
    let oba = ob.arr;
    oba[0] = '3';
    console.log('arr->' + oba[0] + '/' + ob.arr[0]);
    let ob1 = { ob: { n: '??' } };
    ob1 = ob;
    ob1.ob = 'null';
    console.log('new ob->' + ob1.ob + '/' + ob.ob);
};
//t6()


//js test module(assert)
let assert = require('assert');
let t7 = function() {
    assert(true, 'assert true here');
    //assert(false, 'assert fail here')
};
//t7()

//speed compare: global letiable and local letiable
let g = 0;
let t8 = function() {
    let start = new Date();
    for (let i = 0; i < 10000; i++) {
        g = i;
        console.log(g);
    }
    let elapsed = new Date() - start;
    console.log('elapsed time: ' + elapsed);
};
//t8()

//prototype
let t9 = function() {
    let Proto = function() {
        this.diff = ["d"];
    };
    Proto.prototype.only = ["o"];
    let p = new Proto();
    let p1 = new Proto();
    p.diff.push(5); //reflect in special object
    p.only.push(8); //operate Proto.prototype.only, reflect in all new Proto()
    console.log(p.only === p1.only); //true
    console.log(p.diff + "/" + p1.diff); //special each
    console.log(Proto.prototype.only); //the same reference to Proto.prototype.only
};
//t9();

//closure闭包
let closure = function() {
    let Outer = function(argOuter = "/ao") {
        let letiableOuter = "/o";
        Outer = null; //outer which points to an anonymous function
        return function middle(argMiddle = "/am") {
            let letiableMiddle = "/m";
            let inner = function(argInner = "/ai") {
                let letiableInner = "/i";
                inner = null; //inner which points to an anonymous function, not global
                return function(deeper = "/deeper") {
                    let letiableDeeper = "/d";
                    console.log("saved letiables in closure: outer");
                    console.log(Outer + argOuter + letiableOuter);
                    console.log("saved letiables in closure: middle");
                    console.log(middle.name + argMiddle + letiableMiddle);
                    console.log("saved letiables in closure: inner");
                    console.log(inner + argInner + letiableInner);
                    console.log("letiables in self scope:");
                    console.log(deeper + letiableDeeper);
                };
            };
            return inner;
        };
    };
    let MiddleR = new Outer(); //middle(){...}
    let InnerR = new MiddleR(); //inner(){...}
    let deeper = new InnerR(); //anonymous匿名 function{let letiableDeeper...}
    //outer(); middleR(); innerR(); //err
    //deeper(); //output all closure letiables/inline objects
};

//funciton expression, local scope

function Fnexp() {

    const that = this;
    this.fnexpTestName = "I am global context";
    let value = (function ex() {
        let closureletiable = " IN CLOSURE";
        return function() {
            console.log("function expression assignment is ok");
            return "function expression " + closureletiable;
        };
    })() /*ex()*/ (); /*the return anonymous function*/
    console.log(value);
    //in fnexp, this = its container(function, object).this
    //new fnexp is ok
    (function checkContext() {
        this.fnexpTestName = "I am closure context";
        console.log(that.fnexpTestName);
        console.log(this.fnexpTestName);
    })();
}
//new Fnexp();

//combination inheritance
let t11 = function() {
    let superTypeCall = 0;
    let SuperType = function(argSuper = "superTypeCall: ") {
        this.superName = "superType";
        this.override = true;
        this.array = [6];
        superTypeCall++;
        console.log(argSuper + superTypeCall);
    };
    SuperType.prototype.getProperty = function(name) {
        console.log(this[name]);
    };
    let SubType = function() {
        //promise each subType object has own copy of superType.prototype,
        //avoid extends 1-1{}
        //property inherit 1-1
        SuperType.call(this);
        this.subName = "subType";
    };

    //prototype inherit 1-1{
    // subType.prototype = {
    //     array: [6],
    //     getProperty: superType.prototype.getProperty,
    //     otherProperties: "/"
    // }
    //this method like above(of cause rewrite)
    //using single is Deprecated反对的,if has extends of reference type(array, object+) 
    SubType.prototype = new SuperType();
    //}
    let subR = new SubType();
    //reflect in both prototype and object if no property inherit 1-1
    subR.array.push(7);
    new SubType().getProperty("array");
    subR.getProperty("array");
};
//t11()

//[parasitic combination inheritance寄生(构造函数)组合(原型链)式继承]
//avoid unnecessary superType() call with above combination inherit
let parasitic = function() {
    function extend(object) {
        function F() {}
        F.prototype = object;
        return new F();
    }

    function inheritPrototype(subType, superType) {
        let prototype = extend(superType.prototype);
        //prototype.ref.push(true);
        console.log("is prototype === superType.prototype? " + (prototype === superType.prototype));
        prototype.constructor = subType;
        subType.prototype = prototype;
    }

    function SuperType(argSuper) {
        this.name = argSuper || "super";
        this.refN = ["refNotChanges?true"];
    }

    SuperType.prototype.getProperty = function(pName) {
        console.log(this.name + ": " + this[pName]);
    };
    SuperType.prototype.ref = ["refChanges?"];

    function SubType(argSub) {
        //parasitic, using arguments is ok
        //properties extends
        /*promise each subType object has own copy of superType.prototype istead of pointer to 
        true prototype object*/
        SuperType.call(this, "super");
        this.name = argSub || "sub";
    }
    //prototype extends
    inheritPrototype(SubType, SuperType);

    let sub = new SubType();
    sub.refN.push(false);
    sub.ref.push(true);
    sub.getProperty("refN");
    new SubType("new sub").getProperty("refN");
    new SuperType("new super").getProperty("refN");
    new SubType("new sub").getProperty("ref");
    new SuperType("new super").getProperty("ref");
};
//parasitic();
//(!) generally inheritance, adopt constructor mix prototype

//error
let errorTest = function(err) {
    try {
        throw new ReferenceError(err);
    } catch (err) {
        // \u0029 = )
        console.log(err.stack.match(/[ -z]+\n[ -z]+\u0029/)[0]);
    }
};
//errorTest("new refError");
//console.log("continue");

//prototype function and command function(anonymous or named) in closure
let protoFnAndCommandFn = function() {
    let commandFn = function(time) {
        console.log(time);
        if (time === 1) {
            return;
        }
        time++;
        (function() {
            commandFn(time);
        })();
    };
    console.log("command");
    commandFn(0);

    let Proto = function(name) { this.protoFn(0); };
    let AnotherProto = function() {};
    AnotherProto.prototype.protoFn = function(op, fn) {
        fn();
    };
    Proto.prototype.protoFn = function() {
        //this is new Proto();
        let that = this;
        //each function has its own scope and closure since defination
        //defination has no limit in its position, as argument is ok
        new AnotherProto().protoFn("op", function() {
            console.log(that.protoFn);
        });
    };
    console.log("proto");
    new Proto("proto");
};
//protoFnAndCommandFn();

//regexp
let regexp = function() {
    console.log("example: values in object[index] stringify");
    console.log(
        //for mysql storage json data
        (function objectToString(o) {
            let str = "";
            for (let propertyName in o) {
                if (typeof o[propertyName] === "object") {
                    o[propertyName] = JSON.stringify(o[propertyName]);
                }
                str += ("\"" + o[propertyName] + "\",");
            }
            return str.match(/".+"/)[0];
        })({
            t: "sss",
            t1: 5,
            t2: { array: ["www"] }
        }));
};
//regexp();

//arrow function
function SuperParent() {
    let superThat = this;
    this.name = "super";
    (function(parentArg = "parent") {
        let directThat = this;
        console.log(superThat.name);
        this.name = "directParent";
        let child = {
            name: "child",
            //in arrow fns, this = Directparent.this;
            //function exp is ok;
            created: ((childArg = "child") => {
                //true;
                console.log(directThat === this);
                console.log(childArg + "/" + parentArg);
                //new directParent().name, not child.name;
                console.log(this.name);
            })()
        };
    })();
    //new DirectParent();
}
//new SuperParent();

//Construtor() and new Construtor(), this as implicit argument(impArg)
let Constructor = function(){
    let that = this;
    (function(){
        //true when Constructor call as command Fn;
        //=> the outerFn.impArg.this and its embedded内嵌 fns.igrg.this point to the equal address.
        //false when Constructor call as a construtor;
        //=> js will let fn.impArg.this point to the object when new fn() to create an object
        console.log(this===that); 
    })();

    function notexp(){
        //same with function above
        console.log(this===that); 
    }
    notexp();
};
//Constructor(); 
//new Constructor();

//callBack fn diff: => or not =>
//assume you are adding listener to an DOM Instance, like FileReader();
(function ArrowTestContainer(){
    function FileReaderEmpty(){
        if(this.process){
            //this - Object[Global]
            console.warn('node ' + this.process.versions.node); 
        }  
    };
    FileReaderEmpty();
    FileReaderEmpty.prototype.anListener = function(eventType, fn){
        //key point, make sure that 'this' is not global object / 
        //'this' is an actual instance of new Parent()
        //if has not 'this' as arg, fn.caller === global object
        fn.call(this); 
    }
    FileReaderEmpty.prototype.progress = function(){
        console.warn('--frt progress\n');
    }
    function ArrowTest(){
        this.name = 'arrowTest';
        this.fr = new FileReaderEmpty();
        this.fr.anListener('progress', ()=>{
            //this - ArrowTest Instance: a : fr.parent
            //[guess]: arrow fn must automatically make 'this' point to the actual instance of new Parent()
            //arrow fn is not a syntax candy
            console.warn('=>');
            console.warn(this); 
        });
        this.fr.anListener('progress', function(){
            //this - FileReaderEmpty Instance: fr
            console.warn('no =>'); 
            console.warn(this); 
        });
    }
    let a = new ArrowTest();
})


//[this] in => fn will point to the parent object of the fn, while no => will not

//new Function(arg:string, ...:string, codeBlock:string)
// let newFunctionExample = {
//     fnA: new Function('withArg', 'console.warn("withArg \\n (!withArg)")'),
//     fnNoA: new Function('console.warn("no Arg")')
// }
//arg and codeBlock will be explained to standard string, if you want to console.warn(str1) an newline, you must let the str1 containing the '\n', so you need to use '\\n' to output '\n' rather than use '\n' to output an newline
//fnNoA is similar to eval(), but might more safer with new Function syntax, besides, new Function syntax allow us using arguments to limit the codeBlock 



//NODE API (V8)
//Buffer
let NodeApiTest = {
    bufferTest(){
        let str0 = 'undefined';
        let str1 = '';
        let extra = '{body}';
        let buffer0 = Buffer.from(str0); //buffer -- string:'undefined'
        let buffer1 = Buffer.from(str1); //buffer -- string:''
        let bufferE = Buffer.from(extra);
        let r0 = decoder.end((buffer0 + bufferE));
        let r1 = decoder.end((buffer1 + bufferE));
        console.warn(r0); //undefined{body}
        console.warn(r1); //{body}
    }
}

NodeApiTest.bufferTest();

//STANDARD BUILT-IN
let StandardBuiltIn = {
    //TypedArray - 2015 - ex Function
    //MDN/JavaScript/Reference/Global_Objects/TypedArray#Description
    ta(){
        let oData = 'multipart/form-data; boundary=' + '----------' + Date.now().toString(16);
        let u8 = new Uint8Array(oData.length);
        Array.prototype.forEach.call(u8, function (el, idx, arr) { arr[idx] = oData.charCodeAt(idx); });
        let u8ArrayBuffer = u8.buffer;
        console.warn(u8);
        console.warn(u8.buffer);
    }
}

StandardBuiltIn.ta();
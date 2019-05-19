## NODE

* [RAW](#RAW)
* [API](#API)
* [Express](#Express)

## Server Interacts with Client

### Raw Binary
> the actual [essence本质] of all data processings

### Buffer
> we can use the Buffer(NODE) or ArrayBuffer(JS-Built-IN-object) to get the raw binary data, which is presented as arrays with specifical encoding

### Interaction
> eg. 
```ts
    //Ajax
    xhr.send(arrayBuffer: ArrayBuffer);

    //NODEJS
    req.on('data', (chunk)=>{
        console.warn(chunk); //chunk: Buffer
    });
```


## API [Type] {Implement}

### http.InComingMessage [Class] {stream.Readable}

* http://nodejs.cn/api/http.html#http_class_http_incomingmessage

> when node runs as ***server***, the ***request*** object will be complied to be an instance of the class; 
> when node runs as ***client***, the ***response*** object will be complied to be an instance of the class;

## Express

### middlewares register way: Stack

> command use `express().use([routes...], cb)`<br>
> eg. ("/"=> all routes)
`express().use("/", function(req, res, next){
//some code; 
next();
})` middlewares declaration order is their register order


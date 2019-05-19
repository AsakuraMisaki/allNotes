# NODE

* [Interact](#Server-Interacts-with-Client)
* [API](#API-[Type]-{Implement})
* [Express](#Express)

## Server Interacts with Client

### Raw Binary

> the actual [essence本质] of all data processings

### Buffer

> we can use the Buffer(NODE) or ArrayBuffer(JS-Built-IN-object) to get the raw binary data, which is presented as arrays with specifical encoding

### Interaction

* [flowsheet流程图] <https://github.com/AsakuraMisaki/allNotes/blob/master/server/Interaction.png>

> eg.

```ts
    //Ajax
    xhr.send(arrayBuffer: ArrayBuffer);

    //NODEJS
    req.on('data', (chunk)=>{
        console.warn(chunk); //chunk: Buffer
    });
```

***(!)make sure that http message is legal, such as its properties, format(new line, buffer/string for dividing message parts and so on)***

## API [Type] {Implement}

### http.InComingMessage [Class] {stream.Readable}

* <http://nodejs.cn/api/http.html#http_class_http_incomingmessage>

> when node runs as ***server***, the ***request*** object will be complied to be an instance of the class;
> when node runs as ***client***, the ***response*** object will be complied to be an instance of the class;

## Express

### middlewares register way: Stack

> command use `express().use([routes...], cb)`
> eg. ("/"=> all routes)

```js
//middlewares declaration order is their register order

express().use("/", function(req, res, next){
//some code;
next();
});

```
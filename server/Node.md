# NODE

* [Interact](#Server-Interacts-with-Client)
* [API](#API-[Type]-{Implement})
* [Express](#Express)
* [Demo](#Demo)

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

### middlewares register way: Queue

* <http://www.expressjs.com.cn/4x/api.html#app.use>

> eg.

```js
let express = required('express');
let server = express();

server.use("/", function(req, res, next){
    console.warn('first');
    //next middleware
    next();
});
server.use("/", function(req, res, next){
    console.warn('second');
    //next middleware
    next();
});
server.get("/", function(req, res, next){
    console.warn(req.originalUrl);
    res.send('done');
    //no next middleware
})

```

## Demo

### WebSocket

* flowsheet <https://github.com/AsakuraMisaki/allNotes/blob/master/server/WebSocket.png>
* thanks <https://blog.csdn.net/chencl1986/article/details/88411056>

> headers strutrue and data processing:

* first shaking

```js
    //Pseudo code

    GET / HTTP/1.1
    socket.js:88
    Host: 127.0.0.1:8080
    Connection: Upgrade
    Pragma: no-cache
    Cache-Control: no-cache
    Upgrade: websocket
    Origin: http://127.0.0.1:3000
    Sec-WebSocket-Version: 13
    User-Agent: Mozilla/xxx (Windows NT x.0; Win64; x64) AppleWebKit/xxx (KHTML, like Gecko) Chrome/xxx Safari/xxx
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
    Sec-WebSocket-Key: ZV0UIqymefOR8PeqDeEJRg==
    Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits

    //in string
    "GET / HTTP/1.1\r\nHost: 127.0.0.1:8080\r\nConnection: Upgrade\r\nPragma: no-cache\r\nCache-Control: no-cache\r\nUpgrade: websocket\r\nOrigin: http://10.201.66.104:3000\r\nSec-WebSocket-Version: 13\r\nUser-Agent: Mozilla/xxx (Windows NT x.0; Win64; x64) AppleWebKit/xxx (KHTML, like Gecko) Chrome/xxx Safari/xxx\r\nAccept-Encoding: gzip, deflate, br\r\nAccept-Language: zh-CN,zh;q=0.9,en;q=0.8\r\nSec-WebSocket-Key: ZV0UIqymefOR8PeqDeEJRg==\r\nSec-WebSocket-Extensions: permessage-deflate; client_max_window_bits\r\n\r\n"
```

* return correct headers to make shaking success

```js
    //Pseudo code

    HTTP/1.1 101 Switching Protocols
    socket.js:93
    Upgrade: websocket
    Connection: Upgrade
    Sec-Websocket-Accept: zoN06mhkUfv6QXh2sdIpnI47fY4=

    //crypto
    let hash = crypto.createHash('sha1');
    const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
    hash.update(Sec-WebSocket-Key in first shake headers + GUID);
    let result = hash.digest('base64');

    //headers string
    `HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-Websocket-Accept: ${result}\r\n\r\n`
```

* make sure that constant connection listening was registered after shaking ***[notice]***

```js
    http.createServer(function(sock){
        //first/single 'data' event to handle shaking
        sock.once('data', (buffer)=>{
            //shaking
            //if shaking success,  register constant 'data' event
            sock.on('data', (buffer)=>{
                //constant connection
            })
        })
    })
```

* data frame processing ***[Important]***

```js

    //we must decode the data frame to receice correct data, algorithm is depend on offical data frame strutrue

    //decode to receive data
    //encode to send data
function decodeWsFrame(data) {
    let start = 0;
    let frame = {
      isFinal: (data[start] & 0x80) === 0x80,
      opcode: data[start++] & 0xF,
      masked: (data[start] & 0x80) === 0x80,
      payloadLen: data[start++] & 0x7F,
      maskingKey: '',
      payloadData: null
    };
  
    if (frame.payloadLen === 126) {
      frame.payloadLen = (data[start++] << 8) + data[start++];
    } else if (frame.payloadLen === 127) {
      frame.payloadLen = 0;
      for (let i = 7; i >= 0; --i) {
        frame.payloadLen += (data[start++] << (i * 8));
      }
    }
  
    if (frame.payloadLen) {
      if (frame.masked) {
        const maskingKey = [
          data[start++],
          data[start++],
          data[start++],
          data[start++]
        ];
  
        frame.maskingKey = maskingKey;
  
        frame.payloadData = data
          .slice(start, start + frame.payloadLen)
          .map((byte, idx) => byte ^ maskingKey[idx % 4]);
      } else {
        frame.payloadData = data.slice(start, start + frame.payloadLen);
      }
    }
  
    console.dir(frame)
    return frame;
}


function encodeWsFrame(data) {
    const isFinal = data.isFinal !== undefined ? data.isFinal : true,
      opcode = data.opcode !== undefined ? data.opcode : 1,
      payloadData = data.payloadData ? Buffer.from(data.payloadData) : null,
      payloadLen = payloadData ? payloadData.length : 0;
  
    let frame = [];
  
    if (isFinal) frame.push((1 << 7) + opcode);
    else frame.push(opcode);
  
    if (payloadLen < 126) {
      frame.push(payloadLen);
    } else if (payloadLen < 65536) {
      frame.push(126, payloadLen >> 8, payloadLen & 0xFF);
    } else {
      frame.push(127);
      for (let i = 7; i >= 0; --i) {
        frame.push((payloadLen & (0xFF << (i * 8))) >> (i * 8));
      }
    }
  
    frame = payloadData ? Buffer.concat([Buffer.from(frame), payloadData]) : Buffer.from(frame);
  
    console.dir(decodeWsFrame(frame));
    return frame;

}
```
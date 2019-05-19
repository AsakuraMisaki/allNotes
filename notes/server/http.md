##HTTP
* [intro](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

* [multipart/form-data](#multipart/form-data)
* []

###multipart/form-data
> it is an specifical http request, which only support POST
* message structure
```js
    Content-Type: multipart/form-data; boundary=---------------------------314911788813839(\r\n)
    (\r\n)
    -----------------------------314911788813839(\r\n)
    Content-Disposition: form-data; name="foo"(\r\n)
    Content-Type: audio/mp3(\r\n)
    (\r\n)
    ArrayBuffer/Buffer/String/BinaryString(\r\n)
    -----------------------------314911788813839--(\r\n)
``` 
<br>
***(!)the '\r\n'(windows) or '\n'(unix) can not be ommitted in buffer; but them will be processed as new Line instead of string in http message***
<br>
***(!)boundary=... can not be [ommitted省略], it is required to be uniqued, each browser has its own unique boundary***
<br>
***(!)name can be handled as fieldID, like (nodejs-middleware) multer().single(name)***
<br>
***(!)after headers, content start with '--${boundary}\r\n', parts are devided by '--${boundary}\r\n',end with ''--${boundary}--\r\n', '--' and '\r\n' can not be ommitted***
<br>
<br>
* sample: upload file without '<form>' (chrome)
```js
    //file = new File();
    let fr = new FileReader();
    fr.readAsArrayBuffer(file);
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function(){
        console.warn(this.responseText);
    },(e)=>{
        console.error(e);
    });
    
    oReq.open("POST", "http://example/upload", true);

    //WebKit boundary (unique)
    let sBoundary = '----WebKitFormBoundarykWw3t8IFXIw6UNeY';
    //header
    oReq.setRequestHeader("Content-Type", 'multipart/form-data; boundary=' + sBoundary);

    //TypedArray - Standard Built-In, Uint8Array(), Uint16Array(), etc
    //step0: preparing TypedArrays representing content-des parts and end part of http message, do not forget the '\r\n' or '\n' 
    let segment = 'Content-Disposition: form-data; name="file"; filename="x.mp3"\r\nContent-Type: audio/mp3\r\n';
    let preStr = '--' + sBoundary + '\r\n' + segment + '\r\n';
    let preBuffer = new Uint8Array(preStr.length);
    Array.prototype.forEach.call(preBuffer, function (el, idx, arr) { arr[idx] = preStr.charCodeAt(idx); });
    //console.warn(preBuffer);
    let lastStr = '\r\n' + '--' + sBoundary + '--\r\n';
    let lastBuffer = new Uint8Array(lastStr.length);
    Array.prototype.forEach.call(lastBuffer, function (el, idx, arr) { arr[idx] = lastStr.charCodeAt(idx); });
    //console.warn(lastBuffer);
    ////

    //step1: read file as arraybuffer, make it become TypedArray, write all TypedArrays in a new TypedArray [in sequence按顺序] BODY, then you check and send BODY.buffer, which is an ArrayBuffer, the raw binary data buffer, Standard Built-In
    fr.addEventListener('loadend', function(e){
        console.warn(this.result);
        let r = new Uint8Array(this.result);
        let body = new Uint8Array(preBuffer.length + r.length + lastBuffer.length);
        console.warn(preBuffer.length + r.length + lastBuffer.length);
        for(let i=0; i<preBuffer.length; i++){
            body[i] = preBuffer[i];
        }
        for(let i=preBuffer.length; i<preBuffer.length + r.length; i++){
            body[i] = r[i-preBuffer.length];
        }
        for(let i=preBuffer.length + r.length; i<body.length; i++){
            body[i] = lastBuffer[i-preBuffer.length - r.length];
        }
        console.warn('--body');
        console.warn(body);
        oReq.send(body);
    })
    ////

```
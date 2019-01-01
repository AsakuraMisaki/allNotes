# DOM JS CSS

## DOM

### Write the width of canvas in js instead of css

> if you are required to change the size of an canvas, this suggestion will be helpful;

### <script type="module" src="./some.js"></script>

* to use es6-export, import and other module spcifications or features

> some.js `export function FnName(){...};`<br>`function FnName(){...} export{FnName};`
> another.js `<script type="module" src="./another.js"></script>`<br>`import {FnName} from "./some.js"`
> or `import FnName from "./some.js"`(use export default(only one))

* always use CORS(http access control)

> it means that server must realize `Access-Control-Allow-Origin: *` or similar response header;
> in node.js, default realize it;
> in another words, this <script> tab will not be passed in no server-side website;

### All expression should be end with semicolon(;)

> Although js expressions are not required to end with ";", some errors would happen since that;
> eg.`var o = {}
(function(){
	console.log(typeof o);
})();`
> the two exps would be explained to one exp, cause function exp fail;

## HTTP/HTTPS C/S

### JS(Front)

* data-format must be [corresponding 对应的] with Content-Type(req)

>  see the code<br>
> `	var xhr = new XMLHttpRequest()
	xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            let arr = ['response:', xhr.response, 'status: ', xhr.status]
            infoPrint(arr)
        }
    } 
    xhr.open('post', 'http://com/route', true)
    //attention
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.send('{"username":"HelloWorld", "password":"123456"}')`<br>
> attention: <br> 
> 'application/json' => '{"key":"value"}'; 'application/x-www-form-urlencoded' => 'key=value' ; ...
*(!) if the two contents is not corresponding, server can not process any data in req-main-body, in some case, chrome throws a CORS POLICY error*


### String Stream and Byte Stream

* The former need the Buffer缓冲区, the latter do not

> for String Stream, if you use ```java new OutputStreamWriter().write(string str)``` to send data to server, you must close its buffer ```java theWriter.close()``` after writing, since the data will not release to be sent before you close the buffer, which is a temporary memory to store the data;

> for Byte Stream, which does not need buffer, all you need is write data(byte[]) into it; 

### PHP

* compatibility with web server softwares (apache/iis/nginx)

> IIS [win10(home)x64 $ php5.8/php7.2]: in cors-relative setting<br>
> php `header("Access-Control-Allow-Origin: http://127.0.0.1")` like left usage of header: ***SOMETIME SUCCESS*** but usually fail, after setting header in iis website,  you must set (php.ini)`always_populate_raw_post_data = -1` to avoid err like `err: it is not recommend to set header in environment outside php`<br> 
*(!)The SOMETIME SUCCESS is confusing, you might success in [cilent (connect to) server] but fail in [server (respond to) client], and cause a CORS ERR (0x000)*<br>
> Apache24 [win10(home)x64 $ php5.8/php7.2]: in cors-relative setting<br>
> apache`<Directory />
    AllowOverride none
    Header set Access-Control-Allow-Origin "http://127.0.0.1" #(add this)
    Require all denied
</Directory>` use the same format to set header of your server, set `always_populate_raw_post_data = -1` as well

* php self header setting

> [win10(home)x64 $ php5.8/php7.2], (php.ini)`always_populate_raw_post_data = -1` at first, otherwise the php safe setting will abort your operation and throw error <br>*(!) with iis, sometime do not need the operation, but will cause the above compatibility err (0x000), apache has no this err*

## Express NODE

### middlewares register way: Stack

> command use `express().use([routes...], cb)`<br>
> eg. ("/"=> all routes)
`express().use("/", function(req, res, next){
//some code; 
next();
})` middlewares declaration order is their register order


## ES6

### object: { template: \`str\`}

> \` is added in es6, you can use it in [String Template字符串模板] situation.<br>
> eg.<strong>\`user ${user.name} is denied to do ${action} operation. \`</strong> <br>
> or <strong>\`\<p\>{{todo.text}} IN <br>
  	\<span\>{{todo}}\</span\> <br>
  \</p\>\` </strong>(newlines)

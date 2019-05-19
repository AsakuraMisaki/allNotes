# DOM

## Issues

### Write the width of canvas in js instead of css

> canvas will be [stretched拉伸] from (200,200) to your (width,height) in css, which causes that all pixels will be enlarged and become [dim模糊]
***(!) using canvas.width = WIDTH is recommended***

### &lt;script type="module" src="./some.js"/>

* to use es6-export, import and other module spcifications or features

> some.js

```js
export function FnName(){...};
//or
function FnName(){...} export{FnName};
```

> another.js

```html
<script type="module" src="./another.js">
    import {FnName} from "./some.js";
    //use export default(only one)
    //import FnName from "./some.js";
</script>
```

* always use CORS(http access control)

> it means that server must realize `Access-Control-Allow-Origin: *` or similar response header;
> in node.js, default realize it;
> in another words, this ***&lt;script>*** tab will not be passed in no server-side website;

### All expression should be end with semicolon(;)

> Although js expressions are not required to end with ";", some errors would happen since that;
> eg.

```js
//the two exps would be explained to one exp, which causes function exp fail;
var o = {}   //need semicolon here
(function(){
    console.log(typeof o);
})();
```

## ES6

### String Template

* [MDN]<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals>

```js
    let user = 'World';
    let strT = `Hello ${user}
    New Line`;
    console.warn(strT);
```

> it allows you write string in multi lines and use ${arg} to refer variables
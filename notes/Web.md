# WEB JS Note (Vue, QUnit, DOM, Require, JQuery)

## JS *async异步* *defer延迟*

>async: run js code **while** rendering dom; defer: run js code **after** rendering dom

## JS RegExp

>var r = /at[ -z]+/g = new RegExp("at[ -z]", "g")
>/at[ -z]+/ = "at[ -z]"; g = "g"

## RequireJS

>http://www.requirejs.cn/docs/start.html

* *non-blocking非阻塞* explaining script code

`<head>...
	<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="qunitTest" src="./js/./qunitTest.js"></script>...
</head>`

## Vue

>https://cn.vuejs.org/v2/api/

* 

## Qunit

>https://qunitjs.com/

## TDD

>Test-Driven Development

## index.html

>this file is the default file(of cause you can use another file) to be rendered when browser connect to a website, as a result of that, <strong>in server side</strong>, you can just use *static file hosting静态文件托管* middlewares to send index.html to clients instead of write a get method

## localhost

>localhot：是不经网卡传输的，它不受网络防火墙和网卡相关的的限制
127.0.0.1：是通过网卡传输的，它依赖网卡，并受到网络防火墙和网卡相关的限制
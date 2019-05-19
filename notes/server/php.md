### PHP

* compatibility with web server softwares (apache/iis/nginx)

> IIS [win10(home)x64 $ php5.8/php7.2]: in cors-relative setting
<br>
> php `header("Access-Control-Allow-Origin: http://127.0.0.1")` like left usage of header: ***SOMETIME SUCCESS*** but usually fail, after setting header in iis website,  you must set (php.ini)`always_populate_raw_post_data = -1` to avoid err like `err: it is not recommend to set header in environment outside php`
<br> 
***(!)The SOMETIME SUCCESS is confusing, you might success in [cilent (connect to) server] but fail in [server (respond to) client], and cause a CORS ERR (0x000)****
<br>
> Apache24 [win10(home)x64 $ php5.8/php7.2]: in cors-relative setting
<br>
> apache`<Directory />
    AllowOverride none
    Header set Access-Control-Allow-Origin "http://127.0.0.1" #(add this)
    Require all denied
</Directory>` use the same format to set header of your server, set `always_populate_raw_post_data = -1` as well

* php self header setting

> [win10(home)x64 $ php5.8/php7.2], (php.ini)`always_populate_raw_post_data = -1` at first, otherwise the php safe setting will abort your operation and throw error 
<br>
***(!) with iis, sometime do not need the operation, but will cause the above compatibility err (0x000), apache has no this err***
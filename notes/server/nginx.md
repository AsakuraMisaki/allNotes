# Nginx
> the reverse proxy server

## Config(1.14.2)(with nodejs)
> official: http://nginx.org/en/docs/

### ./conf/nginx.conf
 

```bat

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


# http {
#     include       mime.types;
#     default_type  application/octet-stream;

#     #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
#     #                  '$status $body_bytes_sent "$http_referer" '
#     #                  '"$http_user_agent" "$http_x_forwarded_for"';

#     #access_log  logs/access.log  main;

#     sendfile        on;
#     #tcp_nopush     on;

#     #keepalive_timeout  0;
#     keepalive_timeout  65;

#     #gzip  on;

#     server {
#         listen       80;
#         server_name  localhost;

#         #charset koi8-r;

#         #access_log  logs/host.access.log  main;

#         location / {
#             root   html;
#             index  index.html index.htm;
#         }

#         #error_page  404              /404.html;

#         # redirect server error pages to the static page /50x.html
#         #
#         error_page   500 502 503 504  /50x.html;
#         location = /50x.html {
#             root   html;
#         }

#         # proxy the PHP scripts to Apache listening on 127.0.0.1:80
#         #
#         #location ~ \.php$ {
#         #    proxy_pass   http://127.0.0.1;
#         #}

#         # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#         #
#         #location ~ \.php$ {
#         #    root           html;
#         #    fastcgi_pass   127.0.0.1:9000;
#         #    fastcgi_index  index.php;
#         #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#         #    include        fastcgi_params;
#         #}

#         # deny access to .htaccess files, if Apache's document root
#         # concurs with nginx's one
#         #
#         #location ~ /\.ht {
#         #    deny  all;
#         #}
#     }


#     # another virtual host using mix of IP-, name-, and port-based configuration
#     #
#     #server {
#     #    listen       8000;
#     #    listen       somename:8080;
#     #    server_name  somename  alias  another.alias;

#     #    location / {
#     #        root   html;
#     #        index  index.html index.htm;
#     #    }
#     #}


#     # HTTPS server
#     #
#     #server {
#     #    listen       443 ssl;
#     #    server_name  localhost;

#     #    ssl_certificate      cert.pem;
#     #    ssl_certificate_key  cert.key;

#     #    ssl_session_cache    shared:SSL:1m;
#     #    ssl_session_timeout  5m;

#     #    ssl_ciphers  HIGH:!aNULL:!MD5;
#     #    ssl_prefer_server_ciphers  on;

#     #    location / {
#     #        root   html;
#     #        index  index.html index.htm;
#     #    }
#     #}

# }

http{
    
    include       mime.types;
    default_type  application/octet-stream;
    sendfile on;
    charset utf-8;  

    keepalive_timeout 65;  #超时
    
    gzip on; #是否开启压缩模块
    gzip_comp_level 6;  #压缩比例 1-9
    gzip_vary on;  #根据http头判断是否进行压缩
    gzip_min_length 1000; #允许压缩的最小字节数
    gzip_proxied any; #无论后端服务器返回的header是什么，都压缩
    gzip_types text/plain text/html text/css application/json application/x-javascript text/xml application/xhtml application/xml+rss text/javascript image/jpeg image/jpg image/png image/gif; #压缩文件类型 基本全了
    gzip_buffers 16 8k; #向系统申请 以8k为基础的16倍 缓存单元
    upstream my_node_app{  
        server 10.201.66.104;
        keepalive 64; #超时
    }
    server{
        
        listen 3000;  #监听80端口
        server_name m.com;  #设置服务名称
        charset utf-8;

        //location ~= router
        //format location [router(real path or virtual path, support regex)]{key value}

        // eg. / is not a static router, which need the explanation of node.js
        location / { 
            proxy_pass http://my_node_app;  //transfer control rights to my_node_app(upstream object)
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Connection "";  
        }

        // eg. {reg} is not a static router, which need only the static processing module of nginx
        # location ~ ^/(img/|js/|css/|images/|flash/|media/)$ { #如果是静态文件 则劫持处理
        #     root /home/app/myapp/public;  #your project url 
        #     access_log off;
        #     expires max;
        # }

        // eg. / is a static router, which need only the static processing module and the autoindex module of nginx
        location /static{
            alias D:/; //the path where /static mapping 
            # root D:/;
            autoindex on;   #开启nginx目录浏览功能
            autoindex_exact_size off;   #文件大小从KB开始显示
            autoindex_localtime on;   #显示文件修改时间为服务器本地时间
            charset utf-8;
        }
    }
}

```

## Issues

### 500/404 when visit an url containing chinese string

* scene 
> when visiting `localhost/f/你好/`, `localhost/f/你好/` => 
(browser automatically encodes it to utf-8) `localhost/f/%4d%ee%/` => 
(the charset of [host environment 宿主环境] of nginx, like lunix, windows, is not utf-8) `500/404 err`

* (!) set the charset of your system to utf-8, then configure the nginx.conf `location [router]{charset utf-8}`(like the nginx.conf above)*
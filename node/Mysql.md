# MySql

## netstat(windows)

* netstat -aon
* netstat -aon|findstr "2000"

## MYSQL

>ERROR[]：Client does not support authentication protocol requested by server
SOLUTION: alter user '用户名'@'主机名' identified with mysql_native_password by '123';

```bat
function trust open:
set global log_bin_trust_function_creators=TRUE

INSTALL:  
    1. mysqld --initialize --console  
        1-1 password(Random):{...} generated
        1-2 see Console:[...for root@localhost: {rI5rvf5x5G,E}is 1-1password]
    2.mysqld --install
    3.net start mysql
    4.mysql -u root (-p)
        4-1 input 1-1password {...}
    5.alter user 'userName'@'hostName' identified with mysql_native_password by '123';
    (change password)
```

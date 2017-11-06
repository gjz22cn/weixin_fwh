### 用户 (users)
|字段   |类型  |说明   |备注   |
|:-----|:-----|:------|:------|
|id    |int   | |primary key<br>not null, auto_increment |
|openId |int |微信用户ID |unique|
|phone  |varchar(11) |手机号 ||
|password  |varchar(128) | ||
|nickName  |varchar(128) |微信昵称||
|gender  |int(11) | ||
|country  |varchar(32) | ||
|province  |varchar(32) | ||
|city  |varchar(32) | ||
|avatarUrl  |varchar(256) | ||
|unionId  |varchar(32) | ||
|appId  |varchar(32) | ||
|addtime  |char(19) | ||
|logintime  |char(19) | ||

### 康复医院 (kfyy)
|字段   |类型  |说明   |备注   |
|:-----|:-----|:------|:------|
|id    |int   | |primary key<br>not null auto_increment |
|name  |varchar(255)|名称|not null|
|addr  |varchar(255)|地址|default: null|
|url   |varchar(255)|主页|default: null|
|level |ENUM('1级','2级','3级')|等级|default: '1级'|
|cnum  |int   |床位数目|default: 0|
|mgmtUid |int   |管理员ID|foreign key：users id|

### 预约(kfyy_yuyue)
|字段   |类型  |说明   |备注   |
|:-----|:-----|:------|:------|
|id    |int   | |primary key<br>not null auto_increment|
|name  |varchar(16) |姓名||
|gender|ENUM('男','女') |性别 ||
|age   |int |年龄 ||
|idCard|varchar(20) |身份证 ||
|dateS |date|入院日期|年-月-日|
|dateE |date|出院日期|年-月-日|
|comment|varchar(256)|备注||
|phone|varchar(12)|手机号||
|uid  |int   |用户ID|foreign key：users id|
|kfyyId  |int   |用户ID|foreign key：kfyy id|
|status|ENUM('未处理','拒绝'，'接收') |状态 ||

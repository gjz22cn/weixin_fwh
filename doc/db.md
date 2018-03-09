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
|city  |varchar(16)|名称|not null|
|district  |varchar(16)|名称|not null|
|addr  |varchar(255)|地址|default: null|
|url   |varchar(255)|主页|default: null|
|level |ENUM('1级','2级','3级')|等级|default: '1级'|
|chuangwei  |int   |床位数目|default: 0|
|phone|varchar(11)   |联系人手机号||
|contacts|varchar(16)   |联系人称呼||
|email|varchar(64)   |联系人邮箱||

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
|phone|varchar(11)|手机号||
|uid  |int   |用户ID|foreign key：users id|
|kfyyId  |int   |用户ID|foreign key：kfyy id|
|status|ENUM('未处理','拒绝'，'接收') |状态 ||

### yqphb
|字段   |类型  |说明   |备注   |
|:-----|:-----|:------|:------|
|id    |int   | |primary key<br>not null auto_increment |
|name  |varchar(255)|名称|not null|
|city  |varchar(16)|城市|not null|
|district  |varchar(16)|区|not null|
|addr  |varchar(255)|地址|default: null|
|url   |varchar(255)|主页|default: null|
|phone|varchar(11)   |联系人手机号||
|contacts|varchar(16)   |联系人称呼||
|email|varchar(64)   |联系人邮箱||

### yqphb_user_info
|字段   |类型  |说明   |备注   |
|:-----|:-----|:------|:------|
|uid  |int   |用户ID|foreign key：users id|
|yqphbId  |int   |用户ID|foreign key：kfyy id|
|rank   |int |名次 |defalut:-1|
|date |date|刷新日期|年-月-日|


### yqphb_duizhan
|字段   |类型  |说明   |备注   |
|:-----|:-----|:------|:------|
|id    |int   | |primary key<br>not null auto_increment|
|yqphbId  |int   |用户ID|foreign key：yqphb id|
|isSingle|boolean|单打|default:true|
|uidL1  |int   |用户ID|default:-1|
|uidL2  |int   |用户ID|default:-1|
|uidR1  |int   |用户ID|default:-1|
|uidR2  |int   |用户ID|default:-1|
|isLeftWin|boolean|获胜方|defalut: true|
|leftName|varchar(255)|左边||
|rightName|varchar(255)|右边||
|leftScore|int|比分L||
|rightScore|int|比分R||
|dateS |date|创建日期|年-月-日|
|dateE |date|确认日期|年-月-日|
|isFinished|boolean|是否完成|default: false|

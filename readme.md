# 项目文件夹
## 目录内容
```
+ assets
    - bootstrap
    - jquery
    - jquery-pagination
    - jquery-validation
    - swiper

+ inmages

+ js
    - cart.js
    - detail.js
    - index.js
    - login.js
    - public.js
    - search.js
    - shopping.js

+ pages
    - cart.html
    - detail.html
    - index.html
    - login.html
    - search.html
    - shopping.html

+ sass
    - cart.scss
    - detail.scss
    - index.scss
    - login.scss
    - search.scss
    - shopping.scss

+ server
    - getCateOne.php
    - getCateThree.php
    - getCateTwo.php
    - getGoodsList.php
    - getTotalPage.php
    - login.php

+ readme.md
```

## index.html 页面布局
+ 导航栏下拉菜单
+ 导航栏点击跳转页面
+ 全屏轮播图


## login.html 页面布局
+ 表单验证
+ 输入正确 邮箱 以及 密码 跳转首页
+ 点击右上角跳转购物车


## search.html 页面布局
+ 搜索引擎


## shopping.html 页面布局
+ 分类列表渲染
+ 商品信息渲染
    + 点击商品名称跳转详情页
    + 点击加入购物车可往购物车添加一件商品
    + 点击去结算跳转购物车 
+ 分页器渲染
+ 跳转购物车

## detail.html 页面布局
+ 放大镜
+ 修改商品数量
+ 页面跳转


## cart.html 页面布局
+ 没有商品时
    + 点击跳转购物页面
+ 有商品时
    + 选中商品信息前的框框计算出总数量以及总金额
    + 点击商品信息的 加减 号可进行数量的增减
    + 点击删除按钮可删除该商品信息


## 数据库信息
```
+ mysql 
    - 新建 mi 的数据库
        - 导入 goods 文件
        - 新建 email 表格
            - 添加几条信息
            => username: 1119047100@qq.com  
               password: zhengyan
               nickname: zheng
            => username: 1119047100@163.com  
               password: wangjiaer
               nickname: jackson
            => username: 111111  
               password: 11111
               nickname: zheng
```

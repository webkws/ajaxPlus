## ajax-plus

<a href="https://www.npmjs.com/package/ajax-plus"><img src="https://img.shields.io/badge/npm-v0.1.0-blue.svg" alt="Version">
</a>


基于axios 的 Vue 插件

## 如何使用

### npm 模块引入

首先通过 npm 安装

```bash
npm install --save ajax-plus
or
yarn add ajax-plus -S
```

然后在入口文件引入并配置:

对标axios的配置，详见[axios](https://www.npmjs.com/package/axios)🚀

```javascript
import Vue from 'Vue'
// 引入
import ajaxPlus from 'ajax-plus'
// 配置
Vue.use(ajaxPlus, {
    //这里写一些ajax的option,详见axios文档,比如
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 150000
})
```

## 示例

### $ajaxPlus方法
在 Vue 组件上添加了 `$ajaxPlus` 方法, 使用如下:

```javascript
// method可以为 get、delete、options、post、put、patch、head

// url为去除baseUrl的

// data为object

this.$ajaxPlus(method, url, data, res =>{
    //success call back code
})

//也可以省略data参数，直接写callback(鉴于有些请求不需要传参数)
this.$ajaxPlus(method, url, res =>{
    //success call back code
})

//$ajaxPlus已经在源码中处理catch容错了，假若想在代码里处理报错，再加一个参数，如下

this.$ajaxPlus(method, url, data, res =>{
    //success call back code
},{
    //catch是ajax请求失败后 要执行的代码
    //finallyCb是ajax请求结束后 要执行的代码，无论成功或者失败
    catchCb:()=>{//code}    
    finallyCb:()=>{//code}
})

```
以上`catchCb`和`finallyCb`几乎很少会用

`ajax-plus`中给`vue`全局mixin了一个`loading`变量,会在ajax请求结束后自动置为false，这个变量，你可以做一些ui层，比如按钮的防止高频功能

如果你还要做其它相关操作 可以写在`finallyCb`中.

比如
```html
<el-button :loading="loading1" @click="handleSubmit">按钮1</el-button>
<el-button :loading="loading2">按钮2</el-button>
```
```js
handleSubmit(){
    this.$ajaxPlus('post','/submit',{foo:1, bar:2}, res=>{
        alert('提交成功了')
    },{
        catchCb:()=>{
            alert('提交失败了')
        },    
        finallyCb:()=>{
            //按钮置为可点击状态
            this.loading1 = false;
            this.loading2 = false;
        }
    })
}
```

### $ajax
也可以通过 `this.$axios` 来使用 `axios` 所有的 api 方法，如下：

```javascript
this.$ajax.get(url, data).then(res =>{
  //拿到res了
})

this.$ajax.post(url, data).then( res =>{
  //拿到res了
})

try {
  const data = await this.$ajax.post(url, data)
} catch (error) {
  
}
```
由于前后端约定不一致，关于callback的更深层的处理并没有完善。

`axios`和`router`、`vuex`结合起来才能更强大，比如拦截器中根据`status`判断是否登陆，用户的鉴权可以和`store`结合，`response`的相关报错和相关ui的Diag、Message结合会更棒.

更多使用方式以及改写, 参考[代码](https://github.com/webkws/ajaxPlus/blob/master/src/ajax.js), 欢迎提意见。

## License

MIT

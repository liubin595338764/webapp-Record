# webapp-Record
移动端常见问题记录

## click事件中IOS系统无效；
在开发移动端网站的时候，需要给新增的图片做点击事件，所以把click事件委托到body上，但是这会带来一个问题，在IOS设备里面，点击图片的时候，完全没有反应；

图片不能点击？思考了一下，可能有以下几个原因：
- 事件没有绑定成功？
- 图片被其他乱七八糟的元素挡住了，没点击到图片？
- 被css设置了pointer-events ?
- 事件没有触发？
- ……

最后网上找到原因是：在IOS里面，当把一个元素的`click`事件委托到`body`或者`document`时，如果此元素默认不具备点击效果时(如div, span, img)，此时`click`事件会失效；

解决的办法有：
- 将`click`事件直接绑定到div标签上，不使用委托；
- 将div标签改成`A`,`button`可点击的标签；
- 给div标签加上'cursor:pointer;'样式；
- 将`click`事件委托到非`body`,`document`上；

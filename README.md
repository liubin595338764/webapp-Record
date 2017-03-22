# 移动端常见问题记录

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

----

## translate(-50%,0)的bug
```
.text{
    position: absolute;
    top: rem(490px);
    left: 50%;
    width: rem(344px);
    height: rem(105px);
    -webkit-transform:translate(-50%,0);
    transform:translate(-50%,0);
}
```
有一个css类，设置translate(-50%,0)在ios上竟然有问题！页面加载完之后`.text`元素没有居中，但是在手指触摸屏幕的时候，才恢复居中；

> 于是思考是不是页面渲染的时候卡顿导致渲染失败？还是translate在ios根本无效？为什么手指触摸屏幕的时候又恢复居中？

手指触摸屏幕的时候能恢复居中说明translate是有效的，于是我怀疑是渲染的问题；那就启用硬件加速；

```
.text{
    position: absolute;
    top: rem(490px);
    left: 50%;
    width: rem(344px);
    height: rem(105px);
    -webkit-transform:translate3d(-50%, 0,1px);
    transform:translate3d(-50%, 0,1px);
}
```
果然能正常显示。

----

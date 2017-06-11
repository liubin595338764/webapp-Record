# 移动端UI体系整理

目前有一下UI组件已经整理完

- 列表
- 按钮
- 输入框


=======
解决的办法有：
- 将`click`事件直接绑定到div标签上，不使用委托；
- 将div标签改成`A`,`button`可点击的标签；
- 给div标签加上'cursor:pointer;'样式；
- 将`click`事件委托到非`body`,`document`上；


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

## 移动端全屏页面设计的注意点

一般的页面设计稿按照750px*1334px的尺寸来设计；   
然后我们在做整屏切换的页面时，一定要考虑到给页面预留一点扩展的空间，因为我们的页面中浏览器或者微信里面并不是全屏显示，所以要提前给设计师讲清楚，需要给设计稿头部预留出150px高度(微信头部占用的高度)，底部预留100px高度(浏览器底部菜单的高度，如果你的页面需要在浏览器中访问的话)

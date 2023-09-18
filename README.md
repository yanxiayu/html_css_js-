## 个人笔记
### HTML

### CSS
1. 使用了less与编译器
2. 解决行内元素空白问题：
```css
.father {
  font-size:0
  .son {
    font-size:12px
  }
}
```
3. 修饰文本框的修饰placeholder，input框默认提示文字
```css
&::-webkit-input-placeholder {
  color: yellowgreen;
}
```
4. 行内块强制不换行
```css
white-space: nowrap; 
```

### JavaScript
1. 在遍历元素时，使用let声明而不是var
```javascript
for (let i = 0; i < ddNodes.length; i++){
  ddNodes[i].addEventListener('click', function () {
    // 因为for循环是同步执行代码，当整体js文件加载之后，函数一旦被调用，for循环就会立即执行，没有任何的时机，所以不能使用var
  })
}
```
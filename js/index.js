// onload作用：需要将所有DOM元素对象以及相关的资源全部都加载完毕，再来实现的事件函数
window.onload = function () {
  /**
   * 思路：
   * 1.先获取路径导航的页面元素(navPath)
   * 2.再来获取所需要的数据(data.js->goodData.path)
   * 3.由于数据是动态产生的，那么相应的DOM元素也是动态产生的，含义：需要创建DOM元素，根据数据的数量来创建DOM元素
   * 4.在遍历数据创建DOM元素的最后一个时，只创建a标签，不创建i标签
   */

  // 1.获取页面导航的元素对象
  let navPath = document.querySelector(
    "#warpper #content .contentMain .navPath"
  );

  // 2.获取数据
  let path = goodData.path;

  // 3.遍历数据
  for (let i = 0; i < path.length; i++) {
    // 如果循环到最后一个元素
    if (i == path.length - 1) {
      // 只需要创建a并且没有href属性，再追加a标签
      let aNode = document.createElement("a");
      aNode.innerHTML = path[i].title;
      navPath.appendChild(aNode);
    } else {
      // 没有循环到最后一个元素，该怎么追加元素就怎么追加元素
      // 4.创建a标签
      let aNode = document.createElement("a");
      aNode.href = path[i].url;
      aNode.innerHTML = path[i].title;

      // 创建i标签
      let iNode = document.createElement("i");
      iNode.innerHTML = "/";

      // 6.向navPath元素中追加a和i两个子元素
      navPath.appendChild(aNode);
      navPath.appendChild(iNode);
    }
  }
};

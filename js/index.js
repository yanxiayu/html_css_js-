// onload作用：需要将所有DOM元素对象以及相关的资源全部都加载完毕，再来实现的事件函数
window.onload = function () {
  // 路径导航的数据渲染
  navPathDataBind();
  function navPathDataBind() {
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
  }

  // 放大镜的移入和移出
  bigClassBind();
  function bigClassBind() {
    /**
     * 思路：
     * 1.获取小图框元素对象，并且设置移入的事件(onmouseover有事件冒泡、onmouseenter没有事件冒泡)
     * 2.动态的创建蒙版元素、大图框、大图片元素
     * 3.移出时(onmouseleave)，需要移除蒙版元素、大图框
     */

    // 1.获取小图框元素
    let smallPic = document.querySelector(
      "#warpper #content .contentMain #center .left .leftTop .smallPic"
    );

    // 8.获取leftTop元素
    let leftTop = document.querySelector(
      "#warpper #content .contentMain #center .left .leftTop"
    );

    // 2.设置移入的事件
    smallPic.onmouseenter = function () {
      // 3.创建蒙版元素
      let maskDiv = document.createElement("div");
      maskDiv.className = "mask";

      // 4.创建大图框元素
      let bigPic = document.createElement("div");
      bigPic.className = "bigPic";

      // 5.创建大图片元素
      let bigImg = document.createElement("img");
      bigImg.src = "images/b1.png";

      // 6.将大图片追加到大图片中
      bigPic.appendChild(bigImg);

      // 7.将蒙版追加到小图框中
      smallPic.appendChild(maskDiv);

      // 9.将大图框追加到leftTop中
      leftTop.appendChild(bigPic);

      // 设置移除事件
      smallPic.onmouseleave = function () {
        // 让小图框移除蒙版元素
        smallPic.removeChild(maskDiv);

        // 让letTop元素移出大图框
        leftTop.removeChild(bigPic);
      };
    };
  }
};

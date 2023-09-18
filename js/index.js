// onload作用：需要将所有DOM元素对象以及相关的资源全部都加载完毕，再来实现的事件函数
window.onload = function () {
  // 声明一个记录点击的缩略图下标
  let idx = 0;

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

    // 获取数据
    let imagessrc = goodData.imagessrc;

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
      bigImg.src = imagessrc[idx].b;

      // 6.将大图片追加到大图框中
      bigPic.appendChild(bigImg);

      // 7.将蒙版追加到小图框中
      smallPic.appendChild(maskDiv);

      // 9.将大图框追加到leftTop中
      leftTop.appendChild(bigPic);

      // offsetWidth/offsetHeight：获取元素自身的宽高，包括border、padding、margin 站位
      // clientWidth/clientHeight：获取元素可见部分宽高，不包括border、padding、margin 可视
      // getBindingClientRect():返回的是一个对象

      // 设置移动事件
      smallPic.onmousemove = function (event) {
        // clientX：鼠标距离浏览器左侧X轴的值
        // getBoundingClientRect().left：元素距离浏览器左侧可视left值
        let left =
          event.clientX -
          smallPic.getBoundingClientRect().left -
          maskDiv.offsetWidth / 2;
        let top =
          event.clientY -
          smallPic.getBoundingClientRect().top -
          maskDiv.offsetHeight / 2;

        // 判断
        if (left < 0) {
          left = 0;
        } else if (left > smallPic.clientWidth - maskDiv.offsetWidth) {
          left = smallPic.clientWidth - maskDiv.offsetWidth;
        }

        if (top < 0) {
          top = 0;
        } else if (top > smallPic.clientHeight - maskDiv.offsetHeight) {
          top = smallPic.clientHeight - maskDiv.offsetHeight;
        }

        // 设置left和top属性
        maskDiv.style.left = left + "px";
        maskDiv.style.top = top + "px";

        // 移动比例关系 = 蒙版元素移动的距离 / 大图片元素移动的距离
        // 蒙版元素移动的距离 = 小图框宽度 - 蒙版元素的宽度
        // 大图片的移动距离 = 大图片的宽度 - 大图框元素的宽度

        let scale =
          (smallPic.clientWidth - maskDiv.offsetWidth) /
          (bigImg.offsetWidth - bigPic.clientWidth);

        // console.log(scale); 0.495

        bigImg.style.left = -left / scale + "px";
        bigImg.style.top = -top / scale + "px";
      };

      // 设置移除事件
      smallPic.onmouseleave = function () {
        // 让小图框移除蒙版元素
        smallPic.removeChild(maskDiv);

        // 让letTop元素移出大图框
        leftTop.removeChild(bigPic);
      };
    };
  }

  // 动态渲染缩略图的数据
  (function () {
    /**
     * 思路：
     * 1.先获取piclist元素下的ul
     * 2.在获取data.js文件下的数据goodData -> imagessrc
     * 3.遍历数组，根据数组的长度来创建li元素
     * 4.让ul遍历追加li元素
     */

    // 1.获取ul元素
    const ul = document.querySelector(
      "#warpper #content .contentMain #center .left .leftBottom .piclist ul"
    );

    // 2.获取imagessrc数据
    let imagessrc = goodData.imagessrc;

    // 3.遍历数组
    for (let i = 0; i < imagessrc.length; i++) {
      // 4.创建li元素
      let newLi = document.createElement("li");

      // 5.创建li中的img元素
      let newImg = document.createElement("img");
      newImg.src = imagessrc[i].s;

      // 6.将img追加到li中
      newLi.appendChild(newImg);

      // 7.将li追加到ul中
      ul.appendChild(newLi);
    }
  })();

  // 点击缩略图的效果
  (function () {
    /**
     * 思路：
     * 1.获取所有li元素，并且循环发生点击事件
     * 2.点击缩略图，需要确定下标位置来找到对应的小图路径和大图路径替换现有的src的值
     */

    // 1.获取所有li元素
    let liNodes = document.querySelectorAll(
      "#warpper #content .contentMain #center .left .leftBottom .piclist ul li"
    );

    // 获取小图元素
    let smallPic_img = document.querySelector(
      "#warpper #content .contentMain #center .left .leftTop .smallPic img"
    );

    // 获取数据
    let imagessrc = goodData.imagessrc;

    // 2.循环点击li标签
    for (let i = 0; i < liNodes.length; i++) {
      liNodes[i].onclick = function () {
        // 将局部变量i设置为全局变量
        idx = i;

        // 变化小图路径
        smallPic_img.src = imagessrc[i].s;
      };
    }
  })();

  // 缩略图左右点击切换的效果
  (function () {
    /**
     * 思路：
     * 1.先获取左右两侧箭头按钮
     * 2.再获取可视的div以及ul元素和所有的li元素
     * 3.计算(发生起点，步长、总体运动的距离值)
     * 4.然后再发生点击事件
     */

    // 1.获取箭头元素
    let prev = document.querySelector(
      "#warpper #content .contentMain #center .left .leftBottom a.prev"
    );
    let next = document.querySelector(
      "#warpper #content .contentMain #center .left .leftBottom a.next"
    );

    // 2.获取可视的div以及ul元素和所有的li元素
    let piclist = document.querySelector(
      "#warpper #content .contentMain #center .left .leftBottom .piclist"
    );

    let ul = document.querySelector(
      "#warpper #content .contentMain #center .left .leftBottom .piclist ul"
    );

    let liNodes = document.querySelectorAll(
      "#warpper #content .contentMain #center .left .leftBottom .piclist ul li"
    );

    // 3.计算
    // 起点
    let start = 0;

    // 步长
    let step = (liNodes[0].offsetWidth + 20) * 2;

    // 总体运动的距离值 = ul宽度 - div框的宽度 = (图片的总数 - div中显示的数量) * (li的宽度 + 20)
    let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20);

    // 4.发生事件
    prev.onclick = function () {
      start = start - step;
      if (start < 0) {
        start = 0;
      }
      ul.style.left = -start + "px";
    };
    next.onclick = function () {
      start = start + step;
      if (start > endPosition) {
        start = endPosition;
      }
      ul.style.left = -start + "px";
    };
  })();

  // 详情部分数据动态渲染
  (function () {
    /**
     * 思路：
     * 1.查找rightTop元素
     * 2.查找data.js -> goodData -> goodsDetail中相应的数据
     * 3.建立字符串变量，将原来的布局结构粘进来，将对应的内容进行重新动态渲染
     */

    // 1.获取rightTop元素
    let rightTop = document.querySelector(
      "#warpper #content .contentMain #center .right .rightTop"
    );

    // 2.获取对应数据
    let goodsDetail = goodData.goodsDetail;

    // 3.建立字符串
    let str = `
        <h3>${goodsDetail.title}</h3>
        <p>${goodsDetail.recommend}</p>
        <div class="priceWrap">
          <div class="priceTop">
            <span>价&nbsp;&nbsp;&nbsp;&nbsp;格</span>
            <div class="price">
              <span>￥</span>
              <p>${goodsDetail.price}</p>
              <i>降价通知</i>
            </div>
            <p>
              <span>累计评价</span>
              <span>${goodsDetail.evaluateNum}</span>
            </p>
          </div>
          <div class="priceBottom">
            <span>促&nbsp;&nbsp;&nbsp;&nbsp;销</span>
            <p>
              <span>${goodsDetail.promoteSales.type}</span>
              <span>${goodsDetail.promoteSales.content}</span>
            </p>
          </div>
        </div>
        <div class="support">
          <span>支&nbsp;&nbsp;&nbsp;&nbsp;持</span>
          <p>${goodsDetail.support}</p>
        </div>
        <div class="address">
          <span>配&nbsp;&nbsp;送&nbsp;&nbsp;至</span>
          <p>${goodsDetail.address}</p>
        </div>
    `;

    // 4.重新渲染数据
    rightTop.innerHTML = str;
  })();

  // 商品参数选择区域动态渲染
  (function () {
    /**
     * 思路：
     * 1.找rightBottom的元素对象
     * 2.查找data.js -> goodData.goodsDetail.crumbData数据
     * 3.由于数据是一个数组，要遍历，有一个元素需要有一个动态的dl元素对象(dt、dd)
     */

    // 1.查找元素对象
    let chooseWrap = document.querySelector(
      "#warpper #content .contentMain #center .right .rightBottom .chooseWrap"
    );

    // 2.查找数据
    let crumbData = goodData.goodsDetail.crumbData;

    // 3.循环数据
    for (let i = 0; i < crumbData.length; i++) {
      // 4.创建dl元素对象
      let dlNode = document.createElement("dl");

      // 5.创建dt元素对象
      let dtNode = document.createElement("dt");
      dtNode.innerHTML = crumbData[i].title;

      // 6.将dt追加到dl中
      dlNode.appendChild(dtNode);

      // 7.遍历dd元素 crumbData.data[i].type/changePrice
      for (let j = 0; j < crumbData[i].data.length; j++) {
        // 创建dd元素
        let ddNode = document.createElement("dd");
        ddNode.innerHTML = crumbData[i].data[j].type;
        // 给每个dd添加自定义属性
        ddNode.setAttribute("price", crumbData[i].data[j].changePrice);

        // dl追加dd
        dlNode.appendChild(ddNode);
      }

      // 8.chooseWrap追加dl
      chooseWrap.appendChild(dlNode);
    }
  })();

  // 点击商品参数之后的效果
  (function () {
    /**
     * 没一行文字颜色排他
     * 思路：
     * 1.获取所有dl元素，取其中第一个dl元素下的所有dd先做测试，
     * 测试完毕之后在对应dl第一行下标的前面嵌套一个for循环，目的在变换下标
     * 2.循环所有的dd元素，并且添加点击事件
     * 3.确定实际发生事件的目标源对象设置其文字颜色为红色，然后将其他元素的颜色都重置为基础颜色(#666)
     *
     * *****************************************************************************************
     * 点击dd之后产生mark标记
     * 思路：
     * 1.首先创建一个可以容纳点击的dd元素值的容器(数组)，确定数组的起始长度,再添加默认的初始值
     * 2.然后再将点击的dd元素的值按照对应下标写入到数组的元素身上
     */

    // 1.找第一个dl下的dd元素
    let dlNodes = document.querySelectorAll(
      "#warpper #content .contentMain #center .right .rightBottom .chooseWrap dl"
    );

    // 创建数组并设置数组的初始长度
    let arr = new Array(dlNodes.length);

    // 获取choose标签
    let choose = document.querySelector(
      "#warpper #content .contentMain #center .right .rightBottom .choose"
    );

    // 给数组填充值
    arr.fill(0);

    for (let i = 0; i < dlNodes.length; i++) {
      // 循环取出每个dl
      let ddNodes = dlNodes[i].querySelectorAll("dd");

      // 2.遍历当前所有的dd元素
      for (let j = 0; j < ddNodes.length; j++) {
        ddNodes[j].addEventListener("click", function () {
          // 清空choose元素
          choose.innerHTML = "";

          // 重置未点击的元素对象颜色
          for (let k = 0; k < ddNodes.length; k++) {
            ddNodes[k].style.color = "#666";
          }

          // 设置点击元素的颜色为red
          this.style.color = "red";

          // 点击哪一个dd元素动态的产生一个新的mark元素
          arr[i] = this;

          // 调用切换价格函数，实参
          changePriceBind(arr);

          // 遍历arr数组，将非0元素的值添加到mark标记中
          arr.forEach(function (value, index) {
            // 如果数组有值，就动态的创建mark
            if (value) {
              // 创建div元素
              let markDiv = document.createElement("div");
              // 设置类名为mark
              markDiv.className = "mark";
              // 获取值
              markDiv.innerText = value.innerText;

              // 创建a元素
              let aNode = document.createElement("a");
              // 设置值
              aNode.innerText = "X";
              // 并且设置下标,index为自定义属性名称
              aNode.setAttribute("index", index);

              // div元素追加a标签
              markDiv.appendChild(aNode);

              // choose元素追加div
              choose.appendChild(markDiv);
            }
          });

          // 获取所有a标签元素，并且循环发生点击事件
          let aNodes = document.querySelectorAll(
            "#warpper #content .contentMain #center .right .rightBottom .choose .mark a"
          );

          for (let n = 0; n < aNodes.length; n++) {
            aNodes[n].onclick = function () {
              // 获取点击的a标签身上的自定义index属性的值
              let idx1 = this.getAttribute("index");

              // 恢复数组中对应数组下标的值 0
              arr[idx1] = 0;

              // 查找对应下标的那个dl行的所有dd元素
              let ddlist = dlNodes[idx1].querySelectorAll("dd");

              // 遍历所有的dd元素
              for (let m = 0; m < ddlist.length; m++) {
                // 其余所有dd元素颜色都为灰色
                ddlist[m].style.color = "#666";
              }
              // 默认的文字颜色恢复为red
              ddlist[0].style.color = "red";

              // 删除对应下标的mark标记
              choose.removeChild(this.parentNode);

              // 调用价格函数
              changePriceBind(arr);
            };
          }
        });
      }
    }
  })();

  // 价格变动的函数声明 形参
  function changePriceBind(arr) {
    /**
     * 这个函数在删除mark、点击dd的时候进行调用
     * 思路:
     * 1.获取价格的标签元素
     * 2.给每一个dd标签身上都设置一个自定义属性，用来记录变化的价格
     * 3.遍历arr数组，将dd元素身上的价格和原来的价格相加
     * 4.最后将计算之后的结果重新渲染到p价格标签当中
     */

    // 1.获取原价格标签
    let oldPrice = document.querySelector(
      "#warpper #content .contentMain #center .right .rightTop .priceWrap .priceTop .price p"
    );

    // 取出默认的价格
    let price = goodData.goodsDetail.price;

    // 2.遍历arr数组
    for (let i = 0; i < arr.length; i++) {
      // 如果arr的每一项不为0
      if (arr[i]) {
        // 数据类型强制转换
        let changePrice = Number(arr[i].getAttribute("price"));
        // 最终价格
        price = price + changePrice;
      }
    }
    oldPrice.innerHTML = price;

    // 3.将变化后的价格写到标签当中
    // 获取左侧价格元素
    let leftPrice = document.querySelector(
      "#warpper #content .contentMain .goodsDetail .rightDetail .chooseBox .listWarp .left p"
    );

    leftPrice.innerText = "￥" + price;

    // 4.遍历选择搭配中所有的复选框，看是否有选中的
    let inputs = document.querySelectorAll(
      "#warpper #content .contentMain .goodsDetail .rightDetail .chooseBox .listWarp .center li input"
    );

    for (let j = 0; j < inputs.length; j++) {
      // 判断复选框是否被选中
      if (inputs[j].checked) {
        // 选中复选框
        price += Number(inputs[j].value);
      }
    }

    // 5.右侧优惠价格重新渲染
    // 获取优惠价元素
    let newPrice = document.querySelector(
      "#warpper #content .contentMain .goodsDetail .rightDetail .chooseBox .listWarp .right i"
    );
    newPrice.innerText = "￥" + price;
  }

  // 选择搭配中间区域复选框选中优惠价变动效果
  (function () {
    /**
     * 思路：
     * 1.先获取中间区域的所有复选框元素
     * 2.遍历元素，取出价格，和基础价格进行累加，累加之后重新写回优惠价标签中
     * 3.
     */

    // 1.先获取复选框的元素
    let inputs = document.querySelectorAll(
      "#warpper #content .contentMain .goodsDetail .rightDetail .chooseBox .listWarp .center li input"
    );

    // 获取左侧价格元素
    let leftPrice = document.querySelector(
      "#warpper #content .contentMain .goodsDetail .rightDetail .chooseBox .listWarp .left p"
    );

    // 获取优惠价元素
    let newPrice = document.querySelector(
      "#warpper #content .contentMain .goodsDetail .rightDetail .chooseBox .listWarp .right i"
    );

    // 2.先遍历复选框
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("click", function () {
        // left价格：元素截取 1 为下标，从￥开始的值都要，只写一个参数
        let oldPrice = Number(leftPrice.innerText.slice(1));

        for (let j = 0; j < inputs.length; j++) {
          // 如果选中
          if (inputs[j].checked) {
            // 新的price = leftprice + 选中复选框的price
            oldPrice = oldPrice + Number(inputs[i].value);
          }
        }
        // 3.重新写回优惠价
        newPrice.innerText = "￥" + oldPrice;
      });
    }
  })();

  // 封装一个公共的选项卡函数
  function Tab(tabBtns, tabConts) {
    /**
     * 思路：
     * ① 需要被点击的元素 tabBtns
     * ② 被切换显示的元素 tabConts
     */
    for (let i = 0; i < tabBtns.length; i++) {
      tabBtns[i].onclick = function () {
        for (let j = 0; j < tabBtns.length; j++) {
          tabBtns[j].className = "";
          tabConts[j].className = "";
        }
        this.className = "active";
        tabConts[i].className = "active";
      };
    }
  }

  // 点击左侧选项卡
  leftTab();
  function leftTab() {
    // 被点击的元素
    let h4s = document.querySelectorAll(
      "#warpper #content .contentMain .goodsDetail .leftAside .asideTop h4"
    );

    // 被切换显示的元素
    let divs = document.querySelectorAll(
      "#warpper #content .contentMain .goodsDetail .leftAside .asideBottom>div"
    );

    // 调用切换函数 点击元素/切换元素
    Tab(h4s, divs);
  }

  // 点击右侧选项卡
  rightTab();
  function rightTab() {
    // 被点击的元素
    let lis = document.querySelectorAll(
      "#warpper #content .contentMain .goodsDetail .rightDetail .bottomDetail .tab li"
    );

    // 被切换的元素
    let divs = document.querySelectorAll(
      "#warpper #content .contentMain .goodsDetail .rightDetail .bottomDetail .tabContent div"
    );

    // 调用切换函数
    Tab(lis, divs);
  }

  // 右边动态侧边栏的点击效果
  (function () {
    /**
     * 思路：
     * 1.先找到按钮元素，绑定点击事件
     * 2.记录一个初始状态，点击事件内容进行判断
     * 3.
     */

    // 1.获取按钮元素
    let btn = document.querySelector("#warpper .rightAside .btns");

    // 记录初始状态 关闭
    let flag = true;

    // 查找侧边栏元素
    let rightAside = document.querySelector('#warpper .rightAside')

    // 2.绑定点击事件
    btn.onclick = function () {
      // 判断，flag = true
      if (flag) {
        // 如果关闭，则展开
        // flag = false;

        btn.className = 'btns btnsOpen'

        rightAside.className = 'rightAside asideOpen'
      } else {
        // 否则关闭
        // flag = true;

        btn.className = 'btns btnsClose'
        
        rightAside.className = 'rightAside asideClose'
      }

      // 无论前面的if和else执行的到底是谁，最终flag的状态都是在原来的基础上取反
      flag = !flag;
    };
  })();
};

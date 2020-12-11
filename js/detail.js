function Enlarge (ele) {
    // 拿到范围元素
    this.ele = document.querySelector(ele)
    // show 盒子
    this.show = this.ele.querySelector('.show')
    // mask 盒子
    this.mask = this.ele.querySelector('.mask')
    // enlarge 盒子
    this.enlarge = this.ele.querySelector('.enlarge')
    // show 盒子的宽高
    this.show_width = this.show.clientWidth
    this.show_height = this.show.clientHeight
    // enlarge 盒子的宽高
    this.enlarge_width = parseInt(window.getComputedStyle(this.enlarge).width)
    this.enlarge_height = parseInt(window.getComputedStyle(this.enlarge).height)
    // 背景图片的尺寸
    this.bg_width = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[0])
    this.bg_height = parseInt(window.getComputedStyle(this.enlarge).backgroundSize.split(' ')[1])
    // 获取列表盒子
    this.list = this.ele.querySelector('.list')

    // console.log(this.ele)

    // 直接启动入口函数
    this.init ()
}

// 书写方法
Enlarge.prototype.init = function () {
//     // init 方法是被实例调用的
//     // 此处的 this 就是当前实例
    this.setScale ()
    this.overOut ()
    this.move ()
    this.change ()
}


Enlarge.prototype.setScale = function () {
//     // 计算 mask 盒子的大小
    this.mask_width = this.show_width * this.enlarge_width / this.bg_width
    this.mask_height = this.show_height * this.enlarge_height / this.bg_height

//     // 给 mask 盒子进行赋值
    this.mask.style.width = this.mask_width + 'px'
    this.mask.style.height = this.mask_height + 'px'
}

// 移入移出
// 移入 show 盒子的时候， mask 和 enlarge 显示
// 移出 show 盒子的时候， mask 和 enlarge 消失


Enlarge.prototype.overOut = function () {
    this.show.addEventListener('mouseover', () => {
        // console.log('鼠标移入了')
        this.mask.style.display = 'block'
        this.enlarge.style.display = 'block'
        
    })

    this.show.addEventListener('mouseout', () => {
            this.mask.style.display = 'none'
            this.enlarge.style.display = 'none'
        
        
    })
}


// 鼠标移动
Enlarge.prototype.move = function () {
    this.show.addEventListener('mousemove', e => {
        e = e || window.event
        
      
        let x = e.offsetX - this.mask_width / 2
        let y = e.offsetY - this.mask_height / 2

        // 边界值判断
        if (x <= 0) x = 0
        if (y <= 0) y = 0
        if (x >= this.show_width - this.mask_width) x = this.show_width - this.mask_width
        if (y >= this.show_height - this.mask_height) y = this.show_height - this.mask_height

        this.mask.style.left = x + 'px'
        this.mask.style.top = y + 'px'

        const bg_x = this.enlarge_width * x / this.mask_width
        const bg_y = this.enlarge_height * y / this.mask_height

        this.enlarge.style.backgroundPosition = `-${ bg_x }px -${ bg_y }px`
        

        
    })
}


Enlarge.prototype.change = function () {
    this.list.addEventListener('click', e => {
        e = e || window.event

        const target = e.target || e.srcElement

        if (target.nodeName === 'IMG') {
            const show_url = target.getAttribute('show')
            const enlarge_url = target.getAttribute('enlarge')

            // 给元素赋值
            this.show.firstElementChild.src = show_url
            this.enlarge.style.backgroundImage = `url(${ enlarge_url })`

            for (let i = 0; i < this.list.children.length; i++) {
                this.list.children[i].classList.remove('active')
            }

            target.parentElement.classList.add('active')
        }
    })
}

const span = document.querySelector('span')
// console.log(span)


const ol = document.querySelector('ol')
span.addEventListener('click', (e) => {
    e = e || window.event
    var target = e.target || e.srcElement
    // console.log(ol)
    if(target.nodeName === 'SPAN'){
        ol.style.display = 'block'
    }

    
})

const lis = document.querySelectorAll('ol > li')
// console.log(lis)
for (let i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', function () {
        ol.style.display = 'none'
        console.log(ol)
        console.log(this)

        const value = $(this).text()
        console.log(value)
        // console.log($('span').first().text())
        const b = document.querySelector('span > b')
        
        

        
    })
}
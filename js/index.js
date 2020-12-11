var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: true,

// 如果需要前进后退按钮
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
})

// 获取导航栏的 li, 添加点击事件
// 点击弹出二级菜单
const lis = document.querySelectorAll('ul > li')
const showBox = document.querySelector('.showBox')
for (let i = 1; i <= 3; i++) {
    // console.log(lis[i])

    lis[i].addEventListener('mouseover', function () {
        // console.log(this)
        // console.log(lis[i])
        lis[i].classList.remove('active')
        this.classList.add('active')
        showBox.style.display = 'flex'

    })
    
    
    lis[i].addEventListener('mouseout', function () {
    console.log('鼠标移出了')
    showBox.style.display = 'none'
    this.classList.remove('active')
})
    
}


















// $('ul > li').hover(
//     function () {
//         console.log(this)

//         $(this)
//         .addClass('active')
//         .siblings()
//         .removeClass('active')
        
//     },

//     function () {
//         $(this)
//         .removeClass('active')
//         .siblings()
//         .removeClass('active')
//     }
// )
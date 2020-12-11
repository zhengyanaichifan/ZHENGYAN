// 入口函数
$(function () {
    // 准备变量，接受所有商品信息
    let list = null

    // 准备对象，记录可能影响页面主题内容的数据
    const list_info = {
        cat_one: 'all',
        cat_two: 'all',
        cat_three: 'all',
        sort_method: '综合',
        sort_type: 'ASC',
        current: 1,
        pagesize: 8
    }

    // 请求一级分类列表
    getCateOne()
    async function getCateOne () {
        // 发送请求获取
        const cat_one_list = await $.get('../server/getCateOne.php', null, null, 'json')

        console.log(cat_one_list)
        // 进行列表渲染
        let str = `<span data-type="all" class="active">全部</span>`

        cat_one_list.list.forEach(item => {
            str += `
            <span data-type="${ item.cat_one_id }">${ item.cat_one_id }</span>
            `
        })

        $('.cateOneBox > .right').html(str)
    }


    // 请求二级分类列表
    getCateTwo()
    async function getCateTwo () {
        // 请求二级分类列表数据
        const cate_two_list = await $.get('../server/getCateTwo.php', { cat_one: list_info.cat_one }, null, 'json')
        console.log(cate_two_list)

        // 根据二级列表渲染页面
        let str = '<span data-type="all" class="active">全部</span>'
        cate_two_list.list.forEach(item => {
            str += `<span data-type="${ item.cat_two_id }">${ item.cat_two_id }</span>`
        })
        $('.catTwoBox .right').html(str)
    }


    // 请求三级分类列表
    getCateThree()
    async function getCateThree() {
        // 请求三级分类列表数据
        const cate_three_list = await $.get('../server/getCateThree.php', { cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')

        // 根据三级列表数据渲染页面
        let str = '<span data-type="all" class="active">全部</span>'
        cate_three_list.list.forEach(item => {
            str += `<span data-type="${ item.cat_three_id }">${ item.cat_three_id }</span>`
        })
        $('.catThreeBox .right').html(str)
    }




    // 请求总页数，渲染分页器
    getTotalPage()
    async function getTotalPage () {
        // 请求分页数据
        const totalInfo = await $.get('../server/getTotalPage.php', list_info, null, 'json')
        console.log(totalInfo)

        // 渲染分页内容
        $('.pagination').pagination({
            pageCount: totalInfo.total,
            callback (index) {
                list_info.current = index.getCurrent()

                // 从新请求商品列表
                getGoodsList()
            }
        })
    }


    // 请求商品列表数据
    getGoodsList()
    async function getGoodsList () {
        // 请求商品列表
        const goodsList = await $.get('../server/getGoodsList.php', list_info, null, 'json')

        list = goodsList.list

        // 渲染页面
        let str = ''
        goodsList.list.forEach(item => {
            str += `
            <li class="thumbnail">
                <img src="${ item.goods_big_logo }" alt="...">
                <div class="caption">
                    <h3 data-id="${ item.goods_id }">${ item.goods_name }</h3>
                    <p class="price">$ 
                        <span class="text-danger">${ item.goods_price }</span>
                        <span>ID: ${ item.goods_id }</span>
                    </p>
                    <p>
                        <a href="javascript:;" class="btn btn-danger addCart" role="button" data-id="${ item.goods_id }">加入购物车</a>
                        <a href="./cart.html" class="btn btn-warning" role="button">去结算</a>
                    </p>
                </div>
            </li>
            `
        })
        $('.goodsList > ul').html(str)
    }



    // 一级分类的点击事件
    // 事件委托的形式进行事件绑定

    $('.cateOneBox').on('click', 'span', function () {
        // console.log('我被点击了')

        // 操作类名
        $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')

        const type = $(this).data('type')
        

        list_info.cat_two = 'all'
        list_info.cat_three = 'all'

        list_info.current = 1

        list_info.cat_one = type

        getTotalPage()
        getGoodsList()

        $('.catTwoBox .right').html('<span data-type="all" class="active">全部</span>')

        if (type === 'all') {
            $('.catTwoBox .right').html('<span data-type="all" class="active">全部</span>')
        } else {
            getCateTwo()
        }
    })

    $('.catTwoBox').on('click', 'span', function () {
        const type = $(this).data('type')

        $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')

        list_info.cat_three = 'all'

        list_info.current = 1

        list_info.cat_two = type

        getTotalPage()
        getGoodsList()


        if (type === 'all') {
            $('.catThreeBox .right').html('<span data-type="all" class="active">全部</span>')
        } else {
            getCateThree()
        }
    })


    $('.catThreeBox').on('click', 'span', function () {
        const type = $(this).data('type')

        $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')

        list_info.cat_three = type

        list_info.current = 1
        getTotalPage()
        getGoodsList()
    })

    $('.sortBox').on('click', 'span', function () {
        const method = $(this).attr('data-method')
        const type = $(this).attr('data-type')

        $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')

        list_info.sort_method = method
        list_info.sort_type = type

        getTotalPage()
        getGoodsList()


        $(this)
        .attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
        .siblings()
        .attr('data-type', 'ASC')
    })


    // 点击跳转到详情页
    $('.goodsList ul').on('click', 'h3', function () {

        const id = $(this).data('id')

        setCookie('goods_id', id)

        window.location.href = './detail.html'
    })


    // 加入购物车
    $('.goodsList').on('click', '.addCart', function () {
        console.log('我被点击了')
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []

        const id = $(this).data('id')

        const flag = cart.some(item => item.goods_id == id)
        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id == id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + 1
        } else {
            const info = list.filter(item => item.goods_id == id)[0]
            info.cart_number = 1
            cart.push(info)
        }

        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

})
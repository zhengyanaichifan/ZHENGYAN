// jQuery 的入口函数， DOM 结构加载完毕就会执行
// 保护变量私有化

$(function () {

    // 使用 validate 插件进行表单验证操作
    $('#login').validate({
        //规则配置
        rules: {
            username: {
                required: true,
                minlength: 6,
                maxlength: 20
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 12
            }
        },

        // 提示配置信息
        messages: {
            username: {
                required: 'Incorrect Email',
                minlength: 'Minimum 6 characters',
                maxlength: 'Up to 20 characters'
            },
            password: {
                required: 'Incorrect Password',
                minlength: 'Minimum 5 characters',
                maxlength: 'Up to 12 characters'
            }
        },

        // 表单提交事件
        submitHandler (form) {
            // 进行表单提交
            // 拿到用户填写的内容
            const info = $(form).serialize()
            // console.log(info)
            // 发送请求到后端，准备接受结果
            $.post('../server/login.php', info, null, 'json').then(res => {
                // res 就是后端给到的结果
                console.log(res)

                // 登录成功以后的操作
                if (res.code === 0) {
                    // 登录失败
                    $('.login_error').removeClass('hide')
                } else if (res.code === 1) {
                    // 登录成功
                    setCookie('nickname', res.nickname)
                    // 跳转页面
                    window.location.href = './index.html'
                }
            })
        }
    })

})
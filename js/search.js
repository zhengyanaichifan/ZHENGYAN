// https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=teamwang%E5%AE%98%E7%BD%91&req=2&bs=teamwang%E5%AE%98%E7%BD%91&pbs=teamwang%E5%AE%98%E7%BD%91&csor=10&pwd=teamwang%E5%AE%98%E7%BD%91&cb=jQuery1102004449039396419541_1607434437549&_=1607434437556

const ul = document.querySelector('ul')
const inp = document.querySelector('input')

inp.addEventListener('input', function () {
    const value = this.value.trim()

    if(!value) return

    const script = document.createElement('script')

    const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${value}&req=2&bs=teamwang%E5%AE%98%E7%BD%91&pbs=teamwang%E5%AE%98%E7%BD%91&csor=10&pwd=teamwang%E5%AE%98%E7%BD%91&cb=bindHtml&_=1607434437556`

    script.src = url

    document.body.appendChild(script)

    script.remove()
})

bindHtml
function bindHtml (res) {

    if(!res.g) {
        ul.classList.remove('active')
        return
    }

    let str = ''
    console.log(res)

    for (let i = 0; i < res.g.length; i++) {
        str += `<li>${res.g[i].q}</li>`
    }

    ul.innerHTML = str

    ul.classList.add('active')
}

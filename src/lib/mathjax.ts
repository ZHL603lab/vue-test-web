/*
watch(()=> myFormula.value,
    (newValue)=>{
      //直接调用TypeSet()也可以，但是会重新渲染页面所有公式
      // TypeSet([document.getElementById("output")])
      TypeSet()
    })
*/

const render = async function (elements) {
    if (!window.MathJax) return
    window.MathJax.startup.promise = window.MathJax.startup.promise.then(() => {
        return window.MathJax.typesetPromise(elements)
    }).catch((err) => console.log('Typeset failed: ' + err.message))
    return window.MathJax.startup.promise
}

export const mathjax = {
    render,
}
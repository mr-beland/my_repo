const $controlElements = document.querySelectorAll('.controls')
const $carouselContainer = document.querySelector('.carousel-container')
let itemWidth = $carouselContainer.offsetWidth
let translate = 0
let loop = 1
let imgQuantity = $carouselContainer.children.length



let controlsClickHandler = (e) => {
    console.dir(e.target.classList.contains('prev'))

    //Зацикливание
    

    if (e.target.classList.contains('prev')) {

        if (translate !== 0) {
            translate += itemWidth
        } else {
            if(loop) translate = (imgQuantity - 1) * itemWidth *-1
        }

    } else if (e.target.classList.contains('next')) {

        //перемотка
        if ( (imgQuantity - 1) * itemWidth !== -translate ) {
            translate -= itemWidth
        } else {
            if(loop) translate = 0
        }

    }

    $carouselContainer.style.transform='translateX(' + translate + 'px)'
    //что делаем, когда получили клик
    
}


$controlElements.forEach(element => {
    
    //тут происходят итерации цикла. перебор controlElements
    element.addEventListener(
        'click',
        controlsClickHandler
    )

})

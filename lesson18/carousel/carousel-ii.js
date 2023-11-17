
const $controlElements = document.querySelectorAll('.controls')
const $carouselContainer = document.querySelector('.carousel-container')
const $indicatorsContainer = document.querySelector('.carousel-indicators')

let translate = 0 // указывает изначально точку сдвига 0, которое будет потом перезаписываться
let loop = 1 // создаем петлю, которая будет регулировать зацикливание слайдов (+/- true/false)
// let imgQuantity = document.querySelector('.carousel-container').children.length // указываем изначальное количество картинок
let imgQuantity = $carouselContainer.children.length // указываем изначальное количество картинок
let currentImg = 0 // указываем начальный индекс картинки
 
// Указание Ширины Элемента, Значение которой будет динамически меняться за счет алгоритма
// let itemWidth = 600
// let itemWidth = $carouselContainer.parentElement.offsetWidth
let itemWidth = $carouselContainer.offsetWidth

// функция 1
let updateIndicators = () => {

    let arrFromCollection = Array.from($indicatorsContainer.children)
 
    // выяcнение в какую сторону будут сдвигаться слайд
    // ловим target (Элемент куда кликнули) в event - Сlickhandler-ом и дальше обращаемся через Classlist и проверяем contains, есть у того, на что кликнули класс - Кнопка (prev или next) 
    
    // $indicatorsContainer.children.forEach((elem)=> {

    arrFromCollection.forEach((elem, index)=> {
        // elem.className = 'dot'
        // if (index === currentImg) 
        //     elem.className = 'dot active' 
        
        // elem.className = (index === currentImg) ? 'dot active' : 'dot'

        elem.className = 'dot ' + ( (index === currentImg) ? 'active' : '')
       
    })
}

// функция 2
let controlsClickHandler = (e) => {
    console.dir(e.target.classList.contains('prev')) 
    
        // } else { 
        //     if (translate += itemWidth <= imgQuantity * itemWidth) // cравнение значени сдвига и нового элемента с максимально допустимой длинной элемента carusel-conteiner
        //         translate += itemWidth
        //     }

        // } else { 
        //     if (translate += itemWidth <= imgQuantity * itemWidth) // cравнение значени сдвига и нового элемента с максимально допустимой длинной элемента carusel-conteiner
        //         translate += itemWidth
        //     }

       
     //Зацикливание
      
     // если такой класс - кнопка есть, идет проверка, какая из них была нажата, для понимания в какую сторону двигать и исходя из этого удаляет или вычетаем ширину  
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
 
    currentImg = Math.abs(translate/itemWidth)
    console.log('index' + +currentImg)

    updateIndicators() // вызовы функции 1, отвечающий за обработку индикаторов 
 
    // тут применяем сдвиг - translate
    $carouselContainer.style.transform='translateX('+ translate + 'px)' 

    // что делаем, когда получаем клик
    // $carouselContainer.style.transform='translateX(-'+ itemWidth + 'px)' 
    // // itemWidth += 600 
    // itemWidth *= 2

}

$controlElements.forEach(element => {
    // тут происходят итерации цикла forEach - перебор Массива controlElements
    element.addEventListener(
        'click', 
        controlsClickHandler // вызовы функции 2, отвечающий за обработку индикаторов 
    )

})


 


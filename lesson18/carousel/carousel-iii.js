// let counter = 11

// let template = `
//     <div> 
//         <b>Файлов загружено: ${counter > 10 ? 'больше 10' : counter}</b>
//     </div> 
// `

// объявление переменной с Элементми (Картинками) - тип данных Массив - c ccылыками на Элементы. Если не вынести данные отдельно, то они могу обновлятсья и поступать из других Источников, в т.ч с Сервера.
const images = ['img1.jpg', 'img2.jpg', 'img3.jpg']

// функция 1
let updateIndicators = () => {
    let arrFromCollection = Array.from($indicatorsContainer.children);

    // выяcнение в какую сторону будут сдвигаться слайд
    // ловим target (Элемент куда кликнули) в event - Сlickhandler-ом и дальше обращаемся через Classlist и проверяем contains, есть у того, на что кликнули класс - Кнопка (prev или next)

    // $indicatorsContainer.children.forEach((elem)=> {

    arrFromCollection.forEach((elem, index) => {
        // elem.className = 'dot'
        // if (index === currentImg)
        //     elem.className = 'dot active'

        // elem.className = (index === currentImg) ? 'dot active' : 'dot'

        elem.className = 'dot ' + (index === currentImg ? 'active' : '');
    });
};

// функция 2
let controlsClickHandler = (e) => {
    console.dir(e.target.classList.contains('prev'));

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
            translate += itemWidth;
        } else {
            if (loop) translate = (imgQuantity - 1) * itemWidth * -1;
        }
    } else if (e.target.classList.contains('next')) {
        //перемотка
        if ((imgQuantity - 1) * itemWidth !== -translate) {
            translate -= itemWidth;
        } else {
            if (loop) translate = 0;
        }
    }

    currentImg = Math.abs(translate / itemWidth);
    console.log('index' + +currentImg);

    // вызоd функции 1, отвечающий за обработку индикаторов
    updateIndicators(); 

    // тут применяем сдвиг - translate
    $carouselContainer.style.transform = 'translateX(' + translate + 'px)';

    // что делаем, когда получаем клик
    // $carouselContainer.style.transform='translateX(-'+ itemWidth + 'px)'
    // // itemWidth += 600
    // itemWidth *= 2
};

// $controlElements.forEach((element) => {
//     // тут происходят итерации цикла forEach - перебор Массива controlElements
//     element.addEventListener(
//         'click',
//         controlsClickHandler // вызовы функции 2, отвечающий за обработку индикаторов
//     );
// });

// Функция 3 - создания Карусели, которая принимает 3 параметра: elemId ('carousel') - идентификатор Контейнера, ссылки на элементы (картинки), количество элементов (картинки)
// const createCarusel = (elemeId, counter, images) => {
    const createCarusel = (elemeId, images) => {
    // const $mainContainer = document.getElementById('carousel')

    const $mainContainer = document.getElementById(elemeId);

    // создание в DOM Элемента (не строка) - carousel-controls
    const $controlElements = document.createElement('div');
    $controlElements.className = 'carousel-controls'
    $controlElements.innerHTML = `
        <div class="controls prev"><</div>
        <div class="controls next">></div>
    `

    // const $carouselContainer = document.querySelector('.carousel-container');

    const $carouselContainer = document.createElement('div');
    $carouselContainer.className = 'carousel-container'
    // проход циклом по Массиву Элементов с Картинками
    for(let item of images) {
        // создание Элемента
        let $imgContainer = document.createElement('div') 
        // назначение класса Созданнмоу Элементу
        $imgContainer.className = 'carousel-item' 
        // добавленеия Элемента в DOM
        $imgContainer.innerHTML = '<img src="img1.jpg" alt="">' 
        // $imgContainer.innerHTML += $imgContainer 
        // добавение carouselContainer в imgContainer
        $carouselContainer.append($imgContainer) 
    }

    

    // const $indicatorsContainer = document.querySelector('.carousel-indicators');
    // let translate = 0; // указывает изначально точку сдвига 0, которое будет потом перезаписываться
    // let loop = 1; // создаем петлю, которая будет регулировать зацикливание слайдов (+/- true/false)
    // // // let imgQuantity = document.querySelector('.carousel-container').children.length // указываем изначальное количество картинок
    // let imgQuantity = $carouselContainer.children.length; // указываем изначальное количество картинок
    // let currentImg = 0; // указываем начальный индекс картинки

    // // Указание Ширины Элемента, Значение которой будет динамически меняться за счет алгоритма
    // // let itemWidth = 600
    // // let itemWidth = $carouselContainer.parentElement.offsetWidth

    // let itemWidth = $carouselContainer.offsetWidth;

    // let template = `
    //     <div class="carousel-container">
    //         <div class="carousel-item">
    //         <img src="img1.jpg" alt="">
    //     </div>
    //     <div class="carousel-item">
    //         <img src="img2.jpg" alt="">
    //     </div>
    //     <div class="carousel-item">
    //         <img src="img3.jpg" alt="">
    //     </div>

    //     <div class="carousel-indicators"> 
    //     <div class="dot active"></div> 
    //         <div class="dot"></div>
    //         <div class="dot"></div>
    //     </div>  
    // `

    // помещение Шаблона Вёрстки в найденный Элемент в DOM - как текст
    // $mainContainer.append(template) 

    // помещение Шаблона Вёрстки в найденный Элемент в DOM - как Элемент

    //$mainContainer.innerHTML = template 
    $mainContainer.append($controlElements) // добавление в главный Контейнер - carousel-controls - Блока с Кнопками
    $mainContainer.append($carouselContainer) // добавления в главный Контейнер - carouselContainer - Блока с Картинками

}

// передача сюда Аргумента - класс (идентификатор) Элемента
// createCarusel('carousel-1', counter); 
// // а также, передача сюда Аргументов - Элементов ссылок на Картинки.
// createCarusel('carousel-1', 'img1', 'img2', 'img3'); 
createCarusel('carousel-1', images); 

export function createCarousel (elemeId, images, options) {
    if (!options) { // проверка на то, что если в параметр options не добавлены данные
        options = {
            loop: 1,
            indicators: 1,
            controls: 1
        }
    }

    const $mainContainer = document.getElementById(elemeId);

    let currentImg = 0;
    let translate = 0; // указывает изначально точку сдвига 0, которое будет потом перезаписываться

    // let loop = 1; // создаем петлю, которая будет регулировать зацикливание слайдов (+/- true/false)

    const $carouselContainer = document.createElement('div');
    $carouselContainer.className = 'carousel-container';

    // let itemWidth = $carouselContainer.offsetWidth;
    let imgQuantity = $carouselContainer.children.length; // указываем изначальное количество картинок

    // создание в DOM Элемента (не строка) - carousel-controls
    const $controlElements = document.createElement('div');
    $controlElements.className = 'carousel-controls';
    $controlElements.innerHTML = `
        <div class="controls prev"><</div>
        <div class="controls next">></div>
    `;

    // const $carouselContainer = document.querySelector('.carousel-container');

    // const $carouselContainer = document.createElement('div');
    // $carouselContainer.className = 'carousel-container';
    // проход циклом по Массиву Элементов (Ссылок) с Картинками, где в item - записывается каждая Ссылка
    for (let item of images) {
        // создание Элемента
        let $imgContainer = document.createElement('div');
        // назначение класса Созданнмоу Элементу
        $imgContainer.className = 'carousel-item';
        // добавленеия Элемента в DOM (одинаковые Картинки)
        $imgContainer.innerHTML = '<img src="' + item + '" alt="">';
        // $imgContainer.innerHTML += $imgContainer
        // добавение carouselContainer в imgContainer
        $carouselContainer.append($imgContainer);

    }

        // создание Индикаторов
        const $indicatorElement = document.createElement('div');
        $indicatorElement.className = 'carousel-indicators';

        // for (let item of images) {
        //  когда номер итерации i cовпадает (равен) с currentimg, то ставиться индикатор активен. 
        images.forEach((elem, index) => {
          $indicatorElement.innerHTML += `
            <div class="dot ${currentImg === index ? 'active' : ''}"></div>  
            `  
    });
         
        //$mainContainer.innerHTML = template
        
        $mainContainer.append($carouselContainer); // добавление в главный Контейнер - carousel-controls - Блока с Кнопками
        if(options.controls) $mainContainer.append($controlElements); 
        // $mainContainer.append($controlElements); 
        $mainContainer.append($indicatorElement); 

        let itemWidth = $carouselContainer.offsetWidth;
        const $indicatorsContainer = document.querySelector('.carousel-indicators');
        // const $mainContainer = document.getElementById('carousel')

        // Глобальная Функция 2
        let controlsClickHandler = (e) => {
            console.dir(e.target.classList.contains('prev'));

            //Зацикливание

            // если такой класс - кнопка есть, идет проверка, какая из них была нажата, для понимания в какую сторону двигать и исходя из этого удаляет или вычетаем ширину
            if (e.target.classList.contains('prev')) {
                if (translate !== 0) {
                    translate += itemWidth;
                } else {
                    if (options.loop) translate = (imgQuantity - 1) * itemWidth * -1;
                }
            } else if (e.target.classList.contains('next')) {
                //перемотка
                if ((imgQuantity - 1) * itemWidth !== -translate) {
                    translate -= itemWidth;
                } else {
                    if (options.loop) translate = 0;
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
        let arrFromCollection = Array.from($controlElements.children)
  
        arrFromCollection.forEach((element) => {
             // тут происходят итерации цикла forEach - перебор Массива - controlElements
             element.addEventListener(
                 'click', controlsClickHandler);
         });

};


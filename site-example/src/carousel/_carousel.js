import './carousel.css' 

export function createCarousel (elemeId, images, options) {
    if (!options) { 
        options = {
            loop: 1,
            indicators: 1,
            controls: 1
        }
    }

    const $mainContainer = document.getElementById(elemeId);

    let currentImg = 0;
    let translate = 0;

    // let loop = 1; 

    const $carouselContainer = document.createElement('div');
    $carouselContainer.className = 'carousel-container';

   
    const $controlElements = document.createElement('div');
    $controlElements.className = 'carousel-controls';
    $controlElements.innerHTML = `
        <div class="controls prev"><</div>
        <div class="controls next">></div>
    `;

    
    for (let item of images) {
      
        let $imgContainer = document.createElement('div');
      
        $imgContainer.className = 'carousel-item';
       
        $imgContainer.innerHTML = '<img src="' + item + '" alt="">';
     
        $carouselContainer.append($imgContainer);

    }

        // создание Индикаторов
        const $indicatorElement = document.createElement('div');
        $indicatorElement.className = 'carousel-indicators';

        images.forEach((elem, i) => {
          $indicatorElement.innerHTML += `
            <div class="dot ${currentImg === i ? 'active' : ''}"></div>  
            `  
    });
         
        //$mainContainer.innerHTML = template

        let $wrapper = document.createElement('div')
        $wrapper.className = 'carousel'

        $wrapper.append($carouselContainer);
        if(options.controls) $wrapper.append($controlElements); 
        // $mainContainer.append($controlElements); 
        $wrapper.append($indicatorElement); 
        $mainContainer.append($wrapper)
 
        let itemWidth = $carouselContainer.offsetWidth;

        const $indicatorsContainer = document.querySelector('.carousel-indicators');
     
        let imgQuantity = $carouselContainer.children.length; 
      
       
        let controlsClickHandler = (e) => {
            console.dir(e.target.classList.contains('prev'));

            //Зацикливание

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

            updateIndicators();

            // применение сдвига - translate
            $carouselContainer.style.transform = 'translateX(' + translate + 'px)';

           
        };
    
        let updateIndicators = () => {
        let arrFromCollection = Array.from($indicatorsContainer.children);
    
        // выяcнение в какую сторону будут сдвигаться слайд
       
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
             
             element.addEventListener(
                 'click', controlsClickHandler);
         });

};


const typingText=document.querySelector('.typing-text p');
const input=document.querySelector('.wrapper .input-field');
const time=document.querySelector('.time span b');
const mistakes=document.querySelector('.mistake span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
const btn=document.querySelector('button');
// set values
let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;


function laodParagraph(){
    let paragraph = [
        "The sun set over the horizon, painting the sky in hues of orange and pink. A gentle breeze swept through the trees, rustling the leaves as the world slowly drifted into dusk. It was a peaceful moment, one that invited reflection and quiet thoughts.",
        
        "In the heart of the city, life moved at a much faster pace. Cars honked, people rushed by, and the sounds of construction filled the air. Despite the chaos, there was a rhythm to it all—a pulse that made the city feel alive and full of potential.",
        
        "Deep in the forest, the sounds of nature were all-consuming. The chirping of crickets, the rustle of small creatures in the underbrush, and the occasional call of a distant bird created a symphony that was both wild and serene. It was a place untouched by time, where one could escape the pressures of the modern world."
    ];
    
    const randomIndex=Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML+=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>{
        input.focus();
    })
    typingText.addEventListener("click",()=>{
        input.focus();
    })
}
//handle user input
function initTyping(){
    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);


    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer =setInterval(initTime,1000);
                isTyping=true;
        }
        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText=mistake;
        cpm.innerText=charIndex-mistake;
    }
    else{
        clearInterval(timer);
        input.value="";

    }
}
function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmval=Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60 );
        wpm.innerText=wpmval;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    laodParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    charIndex=0;
    mistake=0;
    isTyping=false;
}
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);

laodParagraph();

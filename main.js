document.querySelector(".control-button span").onclick=function () {
    let yourName =window.prompt("what is your name");
    if(yourName==""||yourName==null){
        yourName="unKnown";
    }
    document.querySelector(".info-container .name span").innerHTML=`${yourName}`
    document.querySelector(".control-button").remove()
}
let duraion = 1000;
let blockContainer=document.querySelector(".memory-game-block");
let blocks=Array.from(blockContainer.children);
let orderRange=[...Array(blocks.length).keys()];
suffle(orderRange);
blocks.forEach((block, i)=> {
    block.style.order = orderRange[i];
    block.addEventListener("click",function(){
        flipBlock(block)
});
});

function flipBlock(selected) {
    selected.classList.add('is-flipped');
    let allFlipped = blocks.filter(block=>(block.classList.contains('is-flipped')));
    if (allFlipped.length==2) {
        stopclick()
        checkMatch(allFlipped[0],allFlipped[1])
    }
}
function stopclick() {
    blockContainer.classList.add('no-flip');
    setTimeout(() => {
    blockContainer.classList.remove('no-flip');
    }, duraion);
}

let tries=0;
function checkMatch(first,second) {
        if(first.dataset.technology === second.dataset.technology){
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');
        first.classList.add('is-matched');
        second.classList.add('is-matched');
    }else{
        tries++;
        document.querySelector(".tries span").innerHTML=`${tries}`
        setTimeout(() => {
        first.classList.remove('is-flipped');
        second.classList.remove('is-flipped');
        }, duraion);
    }
}

function suffle(array) {
    let current=array.length,
        temp,
        random;
    while (current>0) {
        random=Math.floor(Math.random()*current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array
}

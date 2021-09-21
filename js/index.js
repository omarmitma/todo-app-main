/* Change of themes */
let body=document.getElementById('body');
let prevTheme='themeDark';
function theme(){
    if(prevTheme==='themeDark'){
        body.classList.replace('themeDark','themeLight');
        prevTheme='themeLight';
    }else if(prevTheme==='themeLight'){
        body.classList.replace('themeLight','themeDark');
        prevTheme='themeDark';
    }
}


let inputCreate=document.getElementById('inputCreate');
let wrapItems=document.getElementById('wrapItems');
let itemsLeft=document.getElementById('itemsLeft');

let array=[];
let todoId=0;

/* inputCreate */
inputCreate.addEventListener('keypress',(e)=>{
    if(e.key==="Enter" && inputCreate.value !=""){
        createDivs(inputCreate.value);
        inputCreate.value = "";
    }
})


/* Create Element */
function createDivs(text){
    const elemCreate = document.createElement("div");
    elemCreate.classList.add("Items");
    elemCreate.id = "" + todoId;
    elemCreate.innerHTML =`<div class="circle">
                                    <button class="itemChecked">
                                    <img src="images/icon-check.svg" alt>
                                    </button>
                                </div>
                                <div class="todoText">
                                    <p>${text}</p>
                                    <button class="btnRemove">
                                    <img src="images/icon-cross.svg" alt>
                                    </button>
                                </div>`;
    array.push({
        content:text,
        active: true,
        domElement:elemCreate,
        idarray:todoId++
    });
    

    updateItemsLeft();
    wrapItems.appendChild(elemCreate);

    const todo_delete = elemCreate.querySelector(".btnRemove");
    todo_delete.addEventListener("click", function()  {
        removeElement(elemCreate);
    });

    const item=elemCreate.querySelector(".itemChecked");
    item.addEventListener('click',()=>{
        checkedItem(elemCreate);
    });

    
}

/* Items left */
function updateItemsLeft(){
    const spanLeft = array.filter((obj) => obj.active);
    itemsLeft.textContent=spanLeft.length+" items left"
}
/* Checked Item  */
function checkedItem(elem){
    console.log(array);
    for(let i in array){
        if(array[i].idarray==elem.id){
            if(array[i].active){
                elem.classList.add('ItemChecked');
                array[i].active=false;
            }else{
                elem.classList.remove('ItemChecked');
                array[i].active=true;
            }
        }
    }
    filterActive();
    updateItemsLeft();
}

/* */
let prevActiveFil="filAll";

function activeFilter(fil){
    let activeFil=document.getElementById(`fil${fil}`);
    let prev=document.getElementById(prevActiveFil);
    prev.classList.remove('filterActive');
    activeFil.classList.add('filterActive');
    prevActiveFil=`fil${fil}`

    filterActive();
}

function filterActive(){
    wrapItems.innerHTML="";
    if(prevActiveFil=='filActive'){
        for(let i in array){
            if(array[i].active){
                wrapItems.appendChild(array[i].domElement);
            }
        }
    }else if(prevActiveFil=='filCompleted'){
        for(let i in array){
            if(!array[i].active){
                wrapItems.appendChild(array[i].domElement);
            }
        }
    }else if(prevActiveFil=='filAll'){
        for(let i in array){
            wrapItems.appendChild(array[i].domElement);
        }
    }
}

function clearCompleted(){
    const toRemove = array.filter((obj) => !obj.active);

    if (toRemove.length > 0 &&  confirm(`¿Are you sure to remove ${toRemove.length} completed task.?`)) {
        toRemove.forEach((elem) => {
            removeElement(elem.domElement);
        });
    }
}
/* Remove Element */
function removeElement(elem){
    if(array.length!=0){

        for(let i in array){
            if(array[i].idarray==elem.id){
                array.splice(i,1);
                console.log(array);
            }
        }
        todoId=array[array.length - 1].idarray+1;
    }
    elem.remove();
    updateItemsLeft()
    
}

/* Iniciar */
function init(){
    createDivs('Complete online JavaScript course');
    checkedItem(array[0].domElement);
    createDivs('Jog around the park 3x');
    createDivs('10 minutes meditation');
    createDivs('Read for 1 hour');
    createDivs('Pick up groceries');
    createDivs('Complete Todo App on Frontend Mentor');
}
init();
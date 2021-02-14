function getUserSelection(){
    if(window.getSelection){
        console.log(window.getSelection().toString());
    }
}
document.addEventListener("mouseup", getUserSelection);
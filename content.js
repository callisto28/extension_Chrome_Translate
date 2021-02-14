function getUserSelection(){
    if(window.getSelection){
        //console.log(window.getSelection().toString());
        const selection = window.getSelection().toString();
        const payload = {
        text: selection.trim(),
        src: "English",
        dest: "French",
        detected: "English",
        email: "ui@frengly.com",
        password:"ui123"
    };
    fetch("https://www.frengly.com/frengly/data/translate",{
        method: "POST",
        headers: {
            "content-Type":"application/json",
        },
        body:JSON.stringify(payload)
    })
    .then(data => data.json())
    .then(res =>{
        console.log("res", res);
        if(res.list){
        const translation = res.list[0].destWord;
        insertHtmlAfterSelection(window.getSelection(),translation)
        }
    })
    }
}
function insertHtmlAfterSelection(selectionObject, translation) {
    let range;
    let expandedSelRange;
    // let node;
    if (selectionObject.getRangeAt && selectionObject.rangeCount) {
      range = selectionObject.getRangeAt(0);
      expandedSelRange = range.cloneRange();
      range.collapse(false);
       
      const el = document.createElement("div");
      el.innerHTML = ` [FR: ${translation} ] `;
      let frag = document.createDocumentFragment();
      let node;
      let lastNode;
      while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);
      selectionObject.empty();
    }
  }
document.addEventListener("mouseup", getUserSelection);
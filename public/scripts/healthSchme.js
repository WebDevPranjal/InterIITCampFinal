const divs = document.querySelectorAll('.down-arrow');

function handleDivClick(event) {
  const clickedDiv = event.target;
  const parentContainer = clickedDiv.parentNode;
  const desiredChild = parentContainer.parentNode.children[1]
  
  if(desiredChild.style.display == 'none') {
      desiredChild.style.display = 'block'
      parentContainer.parentNode.style.boxShadow = "rgba(149, 157, 165, 0.2) 0px 8px 24px";
      parentContainer.parentNode.style.borderTop = "4px solid #2b79f6";
  }else {
      desiredChild.style.display = 'none'
      parentContainer.parentNode.style.boxShadow = 'none'
      parentContainer.parentNode.style.borderTop = 'none'
  }
   
}

divs.forEach(div => {
  div.addEventListener('click', handleDivClick);
});
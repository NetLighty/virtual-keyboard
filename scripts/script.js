//Page initialisation-------
//create main container
function createMainContainer(){
  let container= document.createElement('div')
  container.className= 'main-container'
  container.id=`main-container`
  return container
}
const mainContainerHtml= createMainContainer()
document.body.insertAdjacentElement('afterbegin', mainContainerHtml)
const mainContainer= document.getElementById('main-container')
//create keyboard tip
function createKeyboardTip(){
  let tip= document.createElement('span')
  tip.className= 'keyboard-tip'
  tip.id=`keyboard-tip`
  tip.innerHTML = `Keyboard made on Windows <br> Change language: Alt + Shift`
  return tip
}
const keyboardTip= createKeyboardTip()
mainContainer.insertAdjacentElement('beforeend', keyboardTip)
//create input
function createInput(){
  let input= document.createElement('textarea')
    input.className= 'input'
    input.id=`input`
    input.innerHTML = ``
    return input
}
const inputHtml= createInput()
mainContainer.insertAdjacentElement('beforeend', inputHtml)
//Create keyboardContainer
function createKeyboardContainer(){
  let container= document.createElement('div')
  container.className= 'keyboard-container'
  container.id=`keyboard-container`
  //container.innerHTML = ``
  return container
}
const keyboardContainerHtml= createKeyboardContainer()
mainContainer.insertAdjacentElement('beforeend', keyboardContainerHtml)

//keys creating
const keyboardContainer= document.getElementById('keyboard-container')

function createKey(id, subText, text){
  let key= document.createElement('div')
     key.className= 'key'
     key.id=`${id}`
     key.innerHTML = `<span class="subText">${subText}</span>${text}`
    return key
}
function addEventsOnKey(id){
    const key= document.getElementById(id)
    key.addEventListener('mousedown', mousedownListener)
    key.addEventListener('mouseup', keyupListener)
    key.addEventListener('mouseleave', keyupListener)
}

const keysForDark= ['0', '13', '14', '28', '29', '41', '42', '53',
'54', '55', '56', '57','58', '59', '60', '61', '62', '63']
const keysForDoubleRight= [13, 41, 54]
const keysForDoubleLeft= [29, 42]

function createKeys(keysInformation){
  keyboardContainer.innerHTML=''
  for(let i=0; i<keysInformation.length; i++){
  const htmlKey= createKey(keysInformation[i].id, keysInformation[i].subText, keysInformation[i].text)
  if(keysForDark.includes(String(i))) htmlKey.classList.add('dark')
  if(keysForDoubleRight.includes(i)) htmlKey.classList.add('double-right')
  if(keysForDoubleLeft.includes(i)) htmlKey.classList.add('double-left')
  if(i===58) htmlKey.classList.add('space')
  keyboardContainer.insertAdjacentElement('beforeend', htmlKey)
  addEventsOnKey(keysInformation[i].id)
}
}

function initKeys(){
const currentLang= localStorage.getItem('lang')
if(!currentLang || currentLang==='eng') createKeys(allKeysInformation)
else createKeys(allRussianKeysInformation)
}

initKeys()
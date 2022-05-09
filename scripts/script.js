import {allKeysInformation, allRussianKeysInformation} from './modules/keys.js'

let keys=[]
//Listeners
function mouseupListener(event){
}
function mousedownListener(event){
    const keyEvent= new KeyboardEvent('keydown', {
        key: event.target.id,
        code: event.target.id,
        bubbles: true,
        metaKey: true,
        isComposing: true,
        repeat: true,
    })
    //console.log(keyEvent)
    document.dispatchEvent(keyEvent)
}
function keyupListener(event){
  input.focus()
  let keyCode= null
  if(event.key) keyCode=event.code
  if(event.screenX) keyCode= event.target.id
  const key= document.getElementById(keyCode)
  const altLeft= document.getElementById('AltLeft')
  const altRight= document.getElementById('AltRight')
  const shiftLeft= document.getElementById('ShiftLeft')
  const shiftRight= document.getElementById('ShiftRight')
  if(((keyCode==='ShiftLeft' || keyCode==='ShiftRight') &&
  (altLeft.classList.contains('pressed') || altRight.classList.contains('pressed')))||
  ((keyCode==='AltLeft' || keyCode==='AltRight') &&
  (shiftLeft.classList.contains('pressed') || shiftRight.classList.contains('pressed')))) {
      const currentLang=localStorage.getItem('lang')
      if(currentLang){
          if(currentLang==='eng'){
              createKeys(allRussianKeysInformation)
              localStorage.setItem('lang','rus')
          }else{
              createKeys(allKeysInformation)
              localStorage.setItem('lang','eng')
          }
      }
      else{
          createKeys(allRussianKeysInformation)
          localStorage.setItem('lang', 'rus')
      }
  }
  if(key && keyCode!=='CapsLock') key.classList.remove('pressed')
}
function keydownListener(event){
    const currentLang= localStorage.getItem('lang')
    let keyCode= null
    const isKeyboardEvent= event.target.id ? true : false
    keyCode=event.code
    //console.log('keyboardEvent: '+isKeyboardEvent)
    const key= document.getElementById(keyCode)
    const shiftLeft= document.getElementById('ShiftLeft')
    const shiftRight= document.getElementById('ShiftRight')
    const caps= document.getElementById('CapsLock')
    let isShiftPressed= false
    let isCapsPressed=false
    let isLowerCase= false
    if(shiftLeft && shiftRight && (shiftLeft.classList.contains('pressed') || shiftRight.classList.contains('pressed'))){
      isShiftPressed=true
    }
    if(caps && caps.classList.contains('pressed')){
      isCapsPressed=true
    }
    if(isCapsPressed ^ isShiftPressed) isLowerCase=true
    //console.log(`isLowerCase: ${isCapsPressed^isShiftPressed}`)
    let virtualKey= null
    if(!currentLang || currentLang==='eng'){
        virtualKey= allKeysInformation.filter(el=> el.id===keyCode)[0]
    }else{
        virtualKey= allRussianKeysInformation.filter(el=> el.id===keyCode)[0]
    }
    let textKey= null
    let symbolKey= null
    let functionalKey= null
    let withRussianKey= null
    let arrowKey=null
    if(arrowKeyCodes.includes(keyCode)) arrowKey=virtualKey
    if(withRussianCodes.includes(keyCode)) withRussianKey= virtualKey
    if(symbolsKeysCodes.includes(keyCode)) symbolKey= virtualKey
    if(textKeysCodes.includes(keyCode)) textKey= virtualKey
    if(functionalKeysCodes.includes(keyCode)) functionalKey= virtualKey
    if(withRussianKey || textKey || keyCode==='AltLeft' || keyCode==='AltRight' || keyCode==='Tab' || keyCode==='MetaLeft')event.preventDefault()
  //console.log(keyCode)
  input.focus()
  if(keyCode==='Space') insertAtCaret('input',  ' ')
  if(keyCode==='Enter' && !isKeyboardEvent) insertAtCaret('input', `\n`)
  if(keyCode==='Tab') insertAtCaret('input', '\t')
  if(keyCode==='Backspace' && !isKeyboardEvent) backspaceAtCaret('input')
  if(keyCode==='Delete' && !isKeyboardEvent) deleteAtCaret('input')
  if(arrowKey!==null && !isKeyboardEvent) insertAtCaret('input', arrowKey.text)
  if(symbolKey) isLowerCase ? insertAtCaret('input', symbolKey.subText) : insertAtCaret('input', symbolKey.text)
  if(withRussianKey) isLowerCase ? insertAtCaret('input', withRussianKey.subText) : insertAtCaret('input', withRussianKey.text)
  if(textKey) isLowerCase ? insertAtCaret('input', textKey.text) : insertAtCaret('input', textKey.text.toLowerCase())
  //if(textKey) input.value+= isShiftPressed ? textKey.text : textKey.text.toLowerCase()
  if(keyCode==='CapsLock'){
      //console.log('isCapsPressed: '+isCapsPressed)
      if(isCapsPressed) caps.classList.remove('pressed')
      else caps.classList.add('pressed')
  }else{
      if(key) key.classList.add('pressed')
  }
}


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

//
function insertAtCaret(areaId, text) {
  let txtarea = document.getElementById(areaId)
  const scrollPos = txtarea.scrollTop
  let caretPos = txtarea.selectionStart

  const front = (txtarea.value).substring(0, caretPos)
  const back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length)
  txtarea.value = front + text + back
  caretPos = caretPos + text.length
  txtarea.selectionStart = caretPos
  txtarea.selectionEnd = caretPos
  txtarea.focus()
  txtarea.scrollTop = scrollPos
}
function backspaceAtCaret(areaId){
  let txtarea = document.getElementById(areaId)
  const scrollPos = txtarea.scrollTop
  let caretPos = txtarea.selectionStart
  const front = (txtarea.value).substring(0, caretPos-1)
  const back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length)
  txtarea.value= front+back
  caretPos = caretPos - 1
  txtarea.selectionStart = caretPos
  txtarea.selectionEnd = caretPos
  txtarea.focus()
  txtarea.scrollTop = scrollPos
}
function deleteAtCaret(areaId){
  let txtarea = document.getElementById(areaId)
  const scrollPos = txtarea.scrollTop
  let caretPos = txtarea.selectionStart
  const front = (txtarea.value).substring(0, caretPos)
  const back = (txtarea.value).substring(txtarea.selectionEnd+1, txtarea.value.length)
  txtarea.value= front+back
  txtarea.selectionStart = caretPos
  txtarea.selectionEnd = caretPos
  txtarea.focus()
  txtarea.scrollTop = scrollPos
}
//elements
const input= document.getElementById('input')
//some keys
const functionalKeysCodes=['Backspace', 'Tab', 'Delete', 'AltLeft', 'AltRight',
 'ControlLeft', 'ControlRight', 'Enter', 'ShiftRight', 'ShiftLeft','CapsLock']
const textKeysCodes=[, 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY','KeyU', 'KeyI', 'KeyO', 'KeyP',  'KeyA', 'KeyS', 'KeyD',
    'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',  'KeyZ', 'KeyX', 'KeyC', 'KeyV','KeyB', 'KeyN', 'KeyM']
const symbolsKeysCodes=['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7',
'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backslash', 'Slash']
const arrowKeyCodes=['ArrowDown','ArrowLeft', 'ArrowUp', 'ArrowRight',]
const withRussianCodes=['Backquote','Comma', 'Period', 'BracketLeft', 'BracketRight','Semicolon', 'Quote']
//events

document.addEventListener('keydown', keydownListener)
document.addEventListener('keyup', keyupListener)
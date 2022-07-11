const DEFAULT_MAX_NUMBER = 10

let a = ''
let b = ''
let currentOperation = null

const result = document.getElementById('result')

let resultShow = ''
let tempResult = ''

const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const comma = document.querySelector('[data-comma]')
const equalBtn = document.querySelector('[data-equal]')
const clearBtn = document.querySelector('[data-clear-all]')
const deleteBtn = document.querySelector('[data-delete]')
const percent = document.querySelector('[data-percent]')

clearBtn.addEventListener('click', () => clear())
deleteBtn.addEventListener('click', () => deleteAction())
comma.addEventListener('click', () => commaCheck())
percent.addEventListener('click', () => makePercent())
equalBtn.addEventListener('click', () => equal())

numberBtn.forEach(button =>
    {
        button.addEventListener('click', () =>
        {   
            appendNumber(button.innerText)
        })
    })

operationBtn.forEach(button =>
    {
        button.addEventListener('click', () =>
        {   
            operationCheck(button.innerText)
        })
    })

function clear()
{
    result.innerText = '0'
    resultShow = ''
    a = ''
    b = ''
    tempResult = ''
    currentOperation = null
}

function deleteAction()
{
    if (tempResult !== '')
    {
        b = b.slice(0,-1)
        tempResult = tempResult.slice(0,-1)
        result.innerText = tempResult
    }
    else
    {
        resultShow = resultShow.slice(0,-1)
        if (resultShow == '')
        {
            resultShow = '0'
        }
        result.innerText = resultShow
    } 
}

function commaCheck()
{
    if (tempResult !== '')
    {
        if (tempResult.includes('.')) return
        else if (b == '')
        {
            b += '0.'
            tempResult += '0.'
            result.innerText = tempResult
        }
        else
        {
            b += '.'
            tempResult += '.'
            result.innerText = tempResult
        }
    }
    else
    {
        if (resultShow.includes('.')) return
        else if (resultShow == '')
        {
            resultShow += '0.'
            result.innerText = resultShow
        }
        else
        {
            resultShow += '.'
            result.innerText = resultShow
        }
    }
}

function makePercent()
{
    if (tempResult !== '')
    {
        console.log(tempResult)

        if (b < 10)
        {
            tempResult = tempResult.slice(0,-1) + '0.0' + tempResult.slice(-1)
        }
        else if (b < 100 && b > 10)
        {
            tempResult = tempResult.slice(0,-2) + '0.' + tempResult.slice(-2)
        }
        else
        {
            tempResult = tempResult.slice(0,-2) + '.' + tempResult.slice(-2)
        }

        b /= 100
        console.log(tempResult)
        result.innerText = tempResult
    }
    else
    {
        resultShow /= 100
        if (resultShow == '')
        {
            resultShow = '0.00'
        }
        result.innerText = resultShow
    } 
}

function appendNumber(number)
{
    if (resultShow == '0')
    {
        resultShow = ''
    }

    if (resultShow.length + tempResult.length >= DEFAULT_MAX_NUMBER)
    {
        clear()
    }

    if (tempResult !== '')
    {
        b += number
        tempResult += number
        result.innerText = tempResult
    }
    else
    {
        resultShow += number
        result.innerText = resultShow  
    }
}

function operationCheck(operation)
{
    if (currentOperation !== null) equal()
    currentOperation = operation
    if (resultShow == '')
    {
        a = 0
    }
    else
    {
        a = resultShow
    }
    
    tempResult = `${a}${currentOperation}`
    result.innerText = tempResult
    resultShow = ''
}

// Calculation functions
function roundResult(number)
{
    return Math.round(number * 1000) / 1000
}

function equal()
{
    if (currentOperation === null) return
    let firstOperand = parseFloat(a)
    let secondOperand = parseFloat(b)
    
    if (firstOperand == 0)
    {
        return clear()
    }
    
    resultShow = roundResult(calculator(currentOperation, firstOperand, secondOperand))
    result.innerText = resultShow
    b = ''
    currentOperation = null
    tempResult = ''
}

function calculator(operation, a, b)
{
    switch(operation)
    {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            return divide(a, b)
        default:
            return null
    }
}

// Math functions
function add(a, b)
{
    return a + b
}

function subtract(a, b)
{
    return a - b
}

function multiply(a, b)
{
    return a * b
}

function divide(a, b)
{
    return a / b
}

function operate(operator, a, b)
{
    if (operator === '+')
    {
        add(a, b)
    }
    else if (operator === '-')
    {
        subtract(a, b)
    }
    else if (operator === '×')
    {
        multiply(a, b)
    }
    else if (operator === '÷')
    {
        divide(a, b)
    }
}

// Operation convert (* -> × || / -> ÷)
function operationConvert(keyOperator)
{
    if (keyOperator == '+') return '+'
    if (keyOperator == '-') return '-'
    if (keyOperator == '*') return '×'
    if (keyOperator == '/') return '÷'
}

// KEYBOARD SUPPORT
document.addEventListener('keydown', (event) =>
{
    //console.log(event)
    keyboardInput(event)
})

function keyboardInput(e)
{
    //console.log(e)
    // 1 - 9
    if (e.key >= 0 && e.key <= 9)
    {
        appendNumber(e.key)
    }

    // Numpad 1 - 9
    if (e.code == 'Numpad0') appendNumber('0')
    if (e.code == 'Numpad1') appendNumber('1')
    if (e.code == 'Numpad2') appendNumber('2')
    if (e.code == 'Numpad3') appendNumber('3')
    if (e.code == 'Numpad4') appendNumber('4')
    if (e.code == 'Numpad5') appendNumber('5')
    if (e.code == 'Numpad6') appendNumber('6')
    if (e.code == 'Numpad7') appendNumber('7')
    if (e.code == 'Numpad8') appendNumber('8')
    if (e.code == 'Numpad9') appendNumber('9')

    // Others
    if (e.key == '.') commaCheck()
    if (e.key == 'Backspace') deleteAction()
    if (e.key == '=' || e.key == 'Enter') equal()
    if (e.key == 'Escape') clear()

    // Operators
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/')
    {
        return operationCheck(operationConvert(e.key))
    }

    // Numpad operators
    if (e.code == 'NumpadAdd') operationCheck('+')
    if (e.code == 'NumpadSubtract') operationCheck('-')
    if (e.code == 'NumpadMultiply') operationCheck('×')
    if (e.code == 'NumpadDivide') operationCheck('÷')

    if (e.keyCode == 53) 
    {
        if (e.shiftKey)
        {
            makePercent()
        }
    }
}
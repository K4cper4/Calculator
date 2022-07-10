const DEFAULT_MAX_NUMBER = 8

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

function clear()
{
    result.innerText = '0'
    resultShow = '0'
    a = ''
    b = ''
    tempResult = ''
    currentOperation = null
}

function deleteAction()
{
    resultShow = resultShow.slice(0,-1)
    if (resultShow == '')
    {
        resultShow = '0'
    }
    result.innerText = resultShow
}

numberBtn.forEach(button =>
    {
        button.addEventListener('click', () =>
        {   
            if (resultShow == '0')
            {
                resultShow = ''
            }

            if (resultShow.length + tempResult.length > DEFAULT_MAX_NUMBER)
            {
                return
            }
            
            if (tempResult !== '')
            {
                b += button.innerText
                tempResult += button.innerText
                result.innerText = tempResult
            }
            else
            {
                resultShow += button.innerText
                result.innerText = resultShow  
            }
            
        })
    })

operationBtn.forEach(button =>
    {
        button.addEventListener('click', () =>
        {   
            operationCheck(button.innerText)
        })
    })

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

function equal()
{
    if (currentOperation === null) return
    let firstOperand = parseFloat(a)
    let secondOperand = parseFloat(b)
    
    resultShow = calculator(currentOperation, firstOperand, secondOperand)
    result.innerText = resultShow
    b = ''
    currentOperation = null
    tempResult = ''
}

equalBtn.addEventListener('click', () =>
{
    equal()
})

clearBtn.addEventListener('click', () =>
{
    clear()
})

deleteBtn.addEventListener('click', () =>
{
    deleteAction()
})

comma.addEventListener('click', () =>
{
    if (resultShow.includes('.')) return
    else
    {
        resultShow += '.'
        result.innerText = resultShow
    }
})

function calculator(operation, a, b)
{
    switch(operation)
    {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            return divide(a, b)
        default:
            return null
    }
}

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
    else if (operator === '*')
    {
        multiply(a, b)
    }
    else if (operator === '/')
    {
        divide(a, b)
    }
}
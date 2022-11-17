let h3 = document.querySelector('h3')
let li2 = document.querySelectorAll('.li2');
let li3 = document.querySelectorAll('.li3');
let p1 = document.querySelector('.p1')
let p2 = document.querySelector('.p2')

let lftText = "1 RUB", rghtText = "USD", any;
let base = 'RUB', symbols = 'USD';

p1.innerHTML = lftText + " = " + any + rghtText;

let input = document.querySelector('.inptget1')
let output = document.querySelector('.inptget2')

li2[0].style.backgroundColor = '#833AE0'
li2[0].style.color = 'white'
li3[1].style.backgroundColor = '#833AE0'
li3[1].style.color = 'white'

li2.forEach(item1 => {
    item1.addEventListener('click', (event1) => {
        event1.target.style.background = '#833AE0';
        event1.target.style.color = 'white';
        lftText = "1 " + event1.target.innerText;
        base = event1.target.innerText;
        myFunction();
        li2.forEach(item2 => {
            if (item2 != item1) {
                item2.style.backgroundColor = 'white'
                item2.style.color = '#C6C6C6'
            }
        })
    })
})

li3.forEach(item3 => {
    item3.addEventListener('click', (event2) => {
        event2.target.style.backgroundColor = '#833AE0'
        event2.target.style.color = 'white'
        symbols = event2.target.innerText;
        myFunction();
        li3.forEach(item4 => {
            if (item4 != item3) {
                item4.style.backgroundColor = 'white'
                item4.style.color = '#C6C6C6'
            }
        })
    })
})


function myFunction() {
    fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
        .then(res => res.json())
        .then(data => {
            any = data.rates[symbols];
            input.oninput = function () {
                output.value = any.toFixed(4) * input.value.replaceAll(',', '.');
            }
            output.oninput = function () {
                input.value = (1 / any).toFixed(4) * output.value.replaceAll(',', '.');
            }
            output.value = any.toFixed(4) * input.value.replaceAll(',', '.');
            rghtText = any.toFixed(4) + " " + symbols;
            p1.innerHTML = lftText + " = " + rghtText;
            p2.innerHTML = "1 " + symbols + " = " + (1 / any).toFixed(4) + " " + base;
        })
        .catch(error => {
            h3.textContent = error.message;
            h3.style.display = 'block'
        });

}

myFunction();
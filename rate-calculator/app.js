const currencyElement_one=document.getElementById('currency-one');
const amountEl_one=document.getElementById('amount-one');
const currencyElement_two=document.getElementById('currency-two');
const amountEl_two=document.getElementById('amount-two');

const rateEl=document.getElementById('rate');
const swapEl=document.getElementById('swap');

// fetch exchange rates and update dom
function cal(){
    // console.log('ran');
    const currency_one=currencyElement_one.value;
    const currency_two=currencyElement_two.value; 
    // console.log(currency_one,currency_two); 
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`). then(res=>res.json())
    .then(data=>{
        // console.log(data)});
        const rate=data.rates[currency_two];
        // console.log(rate)
        rateEl.innerText=`1 ${currency_one} equals =${rate} ${currency_two}`;




       amountEl_two.value=(amountEl_one.value*rate).toFixed(2) ;
    });
}

//event listeners
currencyElement_one.addEventListener('change',cal);
amountEl_one.addEventListener('input',cal);
currencyElement_two.addEventListener('change',cal);
amountEl_two.addEventListener('input',cal);

swapEl.addEventListener('click',()=>
{
const temp=currencyElement_one.value;
currencyElement_one.value=currencyElement_two.value;
currencyElement_two.value=temp;
cal();
})

cal();
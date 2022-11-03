document.querySelector('#button1').addEventListener('click', apiRequest)


async function apiRequest(){
    const rapperName = document.querySelector('#input1').value
    try{
        const response = await fetch(`https://api-p2us.onrender.com/api/${rapperName}`)
        const data = await response.json()
        console.log(data)
        document.querySelector('h2').innerText = data.birthName
    }catch(error){
        console.log(error)
    }
}

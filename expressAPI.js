const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 3000

const rappers = {
    '21 savage':{
        'age': 29,
        'birthName': 'Sheyaa Bin Abraham-Joseph',
        'birthLocation': 'London, England'
    },
    'chance the rapper':{
        'age': 29,
        'birthName': 'Chancelor Bennett',
        'birthLocation': 'Chicago, Illinois'
    },
    'na': {
        'age': 'N/A',
        'birthName': 'N/A',
        'birthLocation': 'N/A'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/expressAPI.html')
})

// We added /:rapperName  to the end of /api. So, now when someone goes to that URL, they can put a rapper name in the URL.Note that something must be entered after
// the api/ portion for this path to fire. And we can extract that to use how we would like. The colon lets Express know that that this is a query parameter on the URL 
//Note that when going to certain paths, you don't have to enter in %20 to signify spaces. You can just leave the spaces. Express handles that for us. 
app.get('/api/:rapperName', (request, response) => {
    //The rapperName is part of the request. It is also a query parameter. So, this is how we would extract that
    const nameOfRapper = request.params.rapperName.toLowerCase()//we convert to lowercase to handle edge cases in case a user types something in that's uppercase. So, now this will match out object bc we made all of our keys in the object be lowercase.

    //This enables us to grab the object and use its key. We need brackets rather than dot notation because some of our properties such as '21 Save' and 'Chance the Rapper' have spaces, which would cause problems. 
    if(rappers[nameOfRapper]){
        response.json(rappers[nameOfRapper])
    }else{
        response.json(rappers['na'])
    }

    console.log('pass')
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})
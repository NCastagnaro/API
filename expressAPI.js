const express = require('express')
const app = express()
const cors = require('cors')
//Using cors which allows us to use local client side html/CSS/JS code to interact with the API that we have hosted on Render.com
//You also can use a Chrome extesion to handle cors, if you don't want to install the npm package and use it with express. 
app.use(cors())
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
//__dirname is always the directory in which the currently executing script resides
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

//In many environments, and as a convention, you can set the environment variable PORT to tell your web server what port to listen to. 
//So, process.env.PORT || PORT (aka 3000) means: whatever is in the environment variable PORT, or 3000 if there is nothing else.
//If you just passed PORT with a value of 3000 hard-corded to app.listen(), you're always listening on port 3000, which might be just for you, or not
//depending on your requirements and the requirements of the environment in which you're running your server. 
app.listen(process.env.PORT || PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("fetch/url/emotion:link", (req,res) => {

    res.send(" URL is " + req.params.link); var link = req.params.link; getNLUInstance(link)});


app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("fetch/emotiontext/:story", (req,res) => {
    res.send(" text is " + req.params.story); var story = req.params.story; getNLUInstance(story)});


app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

function getNLUInstance(link) {
    console.log("URL 2 " +link); 
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });

    const analyzeParams = { 
        'url': link, 
        'features': { 
            'emotion': { 'sentiment': true, 'limit': 1 } 
        } };

    naturalLanguageUnderstanding.analyze(analyzeParams) 
    .then(analysisResults => { 
        console.log(JSON.stringify(analysisResults, null, 2)); 
    }) .catch(err => { console.log('error:', err); }); 
    
    return naturalLanguageUnderstanding;
}


let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})


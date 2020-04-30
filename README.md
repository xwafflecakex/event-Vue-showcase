<p align="center"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer"><img width="100" src="https://vuejs.org/images/logo.png" alt="Vue logo"></a></p>

<p align="center">
       <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue.svg?sanitize=true" alt="Vue Version"></a>
</p>

## Event-Vue-showcase
You should have the latest [`npm`], [`json-server`] & [`Node.js`] locally installed.
  
To run this locally, simply download and extract, run ```npm install ``` to get the dependacies.
  
Then its recomemnded to run ```npm update ``` to make sure they are all up-to-date.
  
Launch the Vue app with ```npm run serve ```, however to see the example date there is one more step.
  
Lauch the Json server data in a seperate terminal via ```json-server --watch db.json ```, or to really feel the loading times and admire the progress bar + spinner, 
type: ```json-server -d 1500 db.json ``` which adds a 1.5 second delay for the API call.

<details><summary markdown='span'><strong>Further things to add and learn</strong></summary>

- Building a modular Vue event case shower.
- Second is to build a [`Heroku`] host API for the db.json so that [`AXIO`] calls that instead of using localhost Json-server all the time.
- Move to an [`Apollo`] based API and data retrival solution, maybe use [`Graphql`] as the method of storing db.json.
- Lastly make a server.js with [`Express`] and also setup for [`Heroku`] deployment.

</details>

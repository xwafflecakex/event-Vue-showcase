<p>
     <a href="http://badge.fury.io/js/jest"><img src="https://badge.fury.io/js/jest.svg" alt="npm version"></a>
</p>

## event-Vue-showcase
- Need to have [`npm`] [`json-server`] locally installed
- To run this locally, simply download and extract, run ```bash npm install ``` to get the dependacies.
- Then its recomemnded to run ```bash npm update ``` to make sure they are all up-to-date.
- Launch the Vue app with ```bash npm run serve ```, however to see the example date there is one more step.
- Lauch the Json server data in a seperate terminal via ```bash json-server --watch db.json ```, or to really feel the loading times and admire the progress bar + spinner, type: ```bash json-server -d 1500 db.json ``` which adds a 1.5 second delay for the API call.

<details><summary markdown='span'><strong>Further Things to make and learn</strong></summary>

- Building a modular Vue event case shower.
- Second is to build a [`Heroku`] host API for the db.json so that [`AXIO`] calls that instead of using localhost Json-server all the time.
- Move to an [`Apollo`] based API and data retrival solution, maybe use [`Graphql`] as the method of storing db.json.
- Lastly make a server.js with [`Express`] and also setup for [`Heroku`] deployment.

</details>
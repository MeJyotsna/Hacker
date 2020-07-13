### `Overview`
This project is to design the clone of hacker news website using React.js with Server-side rendering(Node.JS) technique and the application modules bundled using Webpack Javascript module bundler and it uses babel-loader to load the plugins with the given presets.

To render the votes in a line chart, it uses react-chartkick and chart.js npm modules.

And the application has been built with Jenkins Pipeline (continuous integration) and deployed to Amazon AWS.

## Available Scripts

In the project directory, you can run:
git clone https://github.com/MeJyotsna/Hacker.git
npm install
npm start
npm test


### `npm start`

Open (http://localhost:3001/) to view it in the browser.


The page will be reloaded it will contain the changes made(upvotes,hide).

### `npm test`

Launches the test runner.

## Deployment

The project is deployed on Amazon AWS ec2 instance(t2.micro).
Project can be accessed on following URL (http://3.23.104.18:3001/).

## About Code

Responsive web App(Mobile Device compatible UI).
Uses Redux for state management(store).
Maintaining News feed API data with News Id in local storage.
For Server side rendering seperate Client and Server folders are maintained.
For Graph implementation 'Chart.js' is used alongwith 'react-chartkick'.
Used moment.js node module for calculating time from created date-time.
Used Jest with Enzyme for Testing.


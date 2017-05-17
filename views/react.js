var React = require('react');
var ReactDOM = require('react-dom');


// React Components
class App extends React.Component {
    render() {
        return React.DOM.h1(null, "I am working with React!");

    }
}
ReactDOM.render(
<App/>, 
document.getElementById('app')
);
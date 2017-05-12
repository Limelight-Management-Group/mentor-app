var React = require('react');
var ReactDOM = require('react-dom');


// React Components
class App extends React.Component {
    render() {
        return <div>I am working with React!</div>
        
    }
}
ReactDOM.render(
<App/>, 
document.getElementById('app')
);
// import logo from './logo.svg';
import './App.css';

// import Container from 'react-bootstrap/Container';
import Login from './components/Login'
import Dashboard from './components/Dashboard'

// 'URLSearchParams(window.location.search)' will get url string after the '?' & .get() will get the code value from the url
const code = new URLSearchParams(window.location.search).get('code')
// console.log(code)

const link = window.location.href.includes('playlist')

function App() {

  return (
    <div id='app'>
      {link ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;

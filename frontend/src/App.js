import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import {Switch , Route} from 'react-router-dom' 
import Footer from './components/footer/Footer'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Vote from './components/voting/Vote'

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={Login} />  
      <Route exact path="/signout"  />
      <Route exact path="/vote" component={Vote} />
      <Route exact path="/signup" component={Register} />
    </Switch>
    <Footer />
    </>
  );
}

export default App;

import Header from './Components/Header';
import './App.css';
import Section from './Components/Section';
import UserDetails from './Components/User-Details';
import {Provider} from 'react-redux';
import store from './store';
import Footer from './Components/Footer';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Header/>
      <UserDetails/>
      <Section/>
      <Footer/>
    </div>
    </Provider>
  );
}

export default App;

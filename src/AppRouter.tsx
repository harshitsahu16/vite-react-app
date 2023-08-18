import {BrowserRouter, Routes,Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';


const App: React.FC = () => {
    return(
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={UserForm} />
            <Route path="/second-page" Component={SecondPage} />
          </Routes>
        </BrowserRouter>
    )
}

export default App;
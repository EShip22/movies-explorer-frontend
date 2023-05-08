import './App.css';
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies"
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <div className='page'>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/saved-movies" element={<SavedMovies/>} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

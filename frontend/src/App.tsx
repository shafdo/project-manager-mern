import { Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import './index.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default App;

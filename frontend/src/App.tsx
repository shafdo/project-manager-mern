import { Route, Routes } from 'react-router-dom';
import {
  ClientAdd,
  ClientEdit,
  ClientListing,
  Home,
  ProjectAdd,
  ProjectEdit,
  ProjectListing,
} from './pages';
import './index.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/client/add" element={<ClientAdd />}></Route>
      <Route path="/client/edit" element={<ClientEdit />}></Route>
      <Route path="/client/list" element={<ClientListing />}></Route>
      <Route path="/project/add" element={<ProjectAdd />}></Route>
      <Route path="/project/edit" element={<ProjectEdit />}></Route>
      <Route path="/project/list" element={<ProjectListing />}></Route>
    </Routes>
  );
}

export default App;

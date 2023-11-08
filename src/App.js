import Home from './home/Home';
import NinjaNakamoto from './ninja-nakamoto/NinjaNakamoto';
import PingPong2 from './ping-pong/PingPong2';
import Tetris from './tetris/Tetris';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/game/tetris" element={<Tetris/>} />
        <Route exact path="/game/pingpong" element={<PingPong2/>} />
        <Route exact path="/game/ninjanakamoto" element={<NinjaNakamoto/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// pages/index.tsx

import GameCanvas from '../Componenets/GameCanvas';

const Home = () => {
  return (
    <div className="container">
      <h1 style={{marginBottom:"20px",border:"2px solid white"}} >::Arcade Game::</h1>
      
      <GameCanvas/>
    </div>
  );
};

export default Home;

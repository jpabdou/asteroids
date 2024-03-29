import React, { useState, useEffect } from 'react';
import { Rect, Stage, Layer, Circle, RegularPolygon, Text } from 'react-konva';
import {getState , start, tick, accelerate, decelerate, bearLeft, bearRight, shootBullet} from "./game.js"

start();

function radiansToDegrees(radian) {
  return radian*180/Math.PI - 270
};



const Ship = (props) => {
  const state = props.state
  return <RegularPolygon
        x={state.x}
        y={state.y}
        radius={state.radius}
        sides = {3}
        rotation = {radiansToDegrees(state.bearing)}
        fillLinearGradientStartPoint = {{ x: 0, y: 0 }}
        fillLinearGradientEndPoint= {{ x: 0, y: 5 }}
        fillLinearGradientColorStops= {[0, 'blue', 1, 'red']}
        shadowBlur={5}
  />
}

const Explosion = (props) => {
  const state = props.state
  return <Circle
        y={state.y}
        x={state.x}
        radius={state.radius}
        fill= {'orange'}
        shadowBlur={5}
  />
}


const Bullet = (props) => {
  const state = props.state
  return <Circle
  x = {state.x}
  y = {state.y}
  radius = {state.radius}
  fill = {"green"}
  />
}

const Asteroid = (props) => {
  const state = props.state
  return <Circle
        x={state.x}
        y={state.y}
        radius={state.radius}
        fill={"tan"}
        shadowBlur={5}
  />
}

const Level = (props) => {
  return <Text
    x={500}
    y={520}
    text={"Level: " + props.level}
    align={"center"}
    fontSize={16}
    fontFamily= {'Calibri'}
    fill= {'white'}
    />
};


const Lives = (props) => {
  return <Text
    x={500}
    y={540}
    text={"Lives: " + props.lives}
    fontSize={16}
    fontFamily= {'Calibri'}
    fill= {'white'}
    />
};

const Score = (props) => {
  return <Text
    x={500}
    y={560}
    text={"Score: " + props.score}
    fontSize={16}
    fontFamily= {'Calibri'}
    fill= {'white'}
    />
};

const GameOver = (props) => {
  return <Text
      x= {75}
      y= {300}
      text= {'GAME OVER! Press Enter to restart.'}
      fontSize= {30}
      align={"center"}
      fontFamily= {'Calibri'}
      fill= {'red'}
      />
};

function handleKeyPress(e) {
    if (e.key === "ArrowUp") {
      accelerate()
    }
    else if (e.key === "ArrowDown") {
      decelerate()
    }
    else if (e.key === "ArrowLeft") {
      bearLeft()
    }
    else if (e.key === "ArrowRight") {
      bearRight()
  }
    else if (e.key === " ") {
      shootBullet()
    } 
  else if (e.key === "Enter") {
      start()
    }
}

const App = () => {
  const [state, setState] = useState(null)
  useEffect(()=>{
    document.addEventListener('keydown', handleKeyPress);
  },[])
  useEffect(() => {
    const interval = setInterval(() => {
      tick()
      setState(getState()) 
    }, 16.7);
    return () => clearInterval(interval);
  }, []);
  if (state === null) {return null}
    return (
      <div>
      <Stage width={state.width} height={state.height}>
        <Layer>
        <Rect width={600} height={600} fill="black" />
          <Ship state= {state.ship}/>
          {state.explosion && <Explosion state = {state.ship}/>}
          {state.asteroids.map((asteroidState, idx) => <Asteroid key={idx} state = {asteroidState}/>)}
          {state.bullets.map((bulletState, idx) => <Bullet key={idx} state = {bulletState}/>)}
          {state.gameOver && <GameOver/>}
          <Level level= {state.level}/>
          <Lives lives= {state.lives}/>
          <Score score= {state.score}/>
        </Layer>
      </Stage>
      <ul> 
      <li>Fire a bullet with the Spacebar key. You can only have 3 bullets on-screen at a time.</li>
      <li>Rotate counterclockwise with the Left Arrow key.</li>
      <li>Rotate clockwise with the Right Arrow key.</li>
      <li>Accelerate with the Up Arrow key.</li>
      <li>Deccelerate with the Down Arrow key.</li>
      <li>Restart the game with the Enter key.</li>
      </ul>
      </div>

    );
  
}


export default App;

"use client"
import { useEffect, useRef, useState } from 'react';

const GameCanvas = () => {
const reload=()=>setTimeout(() => {
  window.location.reload()
}, 30000);

  reload()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<{ x: number, y: number, vx: number, vy: number }[]>([]);
const [run,setrun]=useState(true)
  // Constants for dimensions
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const BALL_RADIUS = 7;
  const ORANGE_BALL_RADIUS = 5;
  const BOX_WIDTH = 23;
  const BOX_HEIGHT = 23;
  const BOX_SPACING = 10;
  const REM = 10; // Distance below the last row of balls


  const GRAVITY = 0.05; // Reduced gravity for slower motion
  const FRICTION = 0.09;
  const YFRICTION=0.4;
  // Function to pad a value to whole number
  const pad = (value: number) => Math.round(value);

  
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Offscreen canvas for static elements
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = CANVAS_WIDTH;
    offscreenCanvas.height = CANVAS_HEIGHT;
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!offscreenCtx) return;

    // Function to draw a single ball
    const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    };

    // Function to draw Pascal's Triangle
    const drawPascalsTriangle = (ctx: CanvasRenderingContext2D) => {
      const rows = 14;
      const spacing = 30;
      for (let row = 0; row < rows; row++) {
        const numBalls = row + 3;
        const y = pad(spacing + row * spacing);
        for (let col = 0; col < numBalls; col++) {
          const x = pad((CANVAS_WIDTH / 2) - ((numBalls - 1) * spacing / 2) + col * spacing);
          drawBall(ctx, x, y);
        }
      }
    };

    // Function to draw gradient boxes
    const drawGradientBoxes = (ctx: CanvasRenderingContext2D) => {
      const numBoxes = 15;
      const lastRowY = pad(14 * 30 + 30); // y position of the last row of balls
      const startX = pad((CANVAS_WIDTH / 2) - ((numBoxes * BOX_WIDTH + (numBoxes - 1) * BOX_SPACING) / 2));
      const startY = pad(lastRowY + REM); // Position boxes 10 pixels below the last row of balls

      for (let i = 0; i < numBoxes; i++) {
        const fraction = Math.abs(i - Math.floor(numBoxes / 2)) / (numBoxes / 2);
        const r = Math.round(255 * (1 - fraction)); // Red decreases from 255 to 0
        const g = Math.round(255 * fraction); // Green increases from 0 to 255
        const b = 0;
        const color = `rgb(${r},${g},${b})`;

        ctx.fillStyle = color;
        ctx.fillRect(pad(startX + i * (BOX_WIDTH + BOX_SPACING)), startY, BOX_WIDTH, BOX_HEIGHT);
      }
    };

    // Render static elements to offscreen canvas
    drawPascalsTriangle(offscreenCtx);
    drawGradientBoxes(offscreenCtx);

    // Function to draw all falling balls
    const drawFallingBalls = () => {
      for (const ball of balls) {
        ctx.beginPath();
        ctx.arc(pad(ball.x), pad(ball.y), ORANGE_BALL_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
      }
    };
    

    // Function to update ball positions
    // Function to update ball positions
const updateBallPositions = () => {
  setBalls((prevBalls) =>
    prevBalls.map((ball) => {
      let { x, y, vx, vy } = ball;

      vy += GRAVITY; // Apply gravity
      vx *= FRICTION; // Apply friction
      vy *= FRICTION;

      x += vx; // Update position
      y += vy;

      // Check for collision with walls
      if (x - ORANGE_BALL_RADIUS < 0 || x + ORANGE_BALL_RADIUS > CANVAS_WIDTH) {
        vx = -vx;
        x = Math.max(ORANGE_BALL_RADIUS, Math.min(CANVAS_WIDTH - ORANGE_BALL_RADIUS, x));
      }
      if (y + ORANGE_BALL_RADIUS > CANVAS_HEIGHT) {
        vy = -vy;
        y = CANVAS_HEIGHT - ORANGE_BALL_RADIUS;
      }

      // Check collision with Pascal's Triangle balls
      const rows = 14;
      const spacing = 30;
      let inBox = false;
      const lastRowY = pad(14 * 30 + 30); // y position of the last row of balls
      const startX = pad((CANVAS_WIDTH / 2) - ((15 * BOX_WIDTH + (15 - 1) * BOX_SPACING) / 2));
      const startY = pad(lastRowY + REM); // Position boxes 10 pixels below the last row of balls

      for (let row = 0; row < rows; row++) {
        const numBalls = row + 3;
        const baseY = spacing + row * spacing;
        for (let col = 0; col < numBalls; col++) {
          const baseX = (CANVAS_WIDTH / 2) - ((numBalls - 1) * spacing / 2) + col * spacing;
          const dx = x - baseX;
          const dy = y - baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= BALL_RADIUS + ORANGE_BALL_RADIUS) {
            // Ball collision, bounce off
            const normalX = dx / distance;
            const normalY = dy / distance;
            const dotProduct = vx * normalX + vy * normalY;
            //change in pace after collision
            vx = vx - 10 * dotProduct * normalX;
            vy = vy - 10 * dotProduct * normalY;
            //orange ball sliding to the edge of white ball
            x += normalX * (BALL_RADIUS + ORANGE_BALL_RADIUS - distance);
            y += normalY * (BALL_RADIUS + ORANGE_BALL_RADIUS - distance);
          }

          // Check if the ball is within the box area
          if (x >= startX && x <= startX + 15 * (BOX_WIDTH + BOX_SPACING) && y >= startY && y <= startY + BOX_HEIGHT) {
            inBox = true;
          }
        }
      }

      // If ball is in a box, settle it at the center of the box
      if (inBox) {
        const boxX = Math.floor((x - startX) / (BOX_WIDTH + BOX_SPACING)) * (BOX_WIDTH + BOX_SPACING) + startX + BOX_SPACING / 2;
        const boxY = startY + BOX_HEIGHT / 2;
        x = boxX;
        y = boxY;
        vx = 0;
        vy = 0;
      }

      return { x, y, vx, vy };
    })
  );
};


    const animate = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(offscreenCanvas, 0, 0); // Draw pre-rendered static elements
      drawFallingBalls();
      updateBallPositions();
      requestAnimationFrame(animate);
    };

    animate();
  }, [balls]);

  const handleDropBall = () => {
    const dropX = (CANVAS_WIDTH / 2) - 45 + Math.random() * 90; // Random x within the specified region above the first row of balls
    const newBall = {
      x: dropX,
      y: 0,
      vx: (Math.random() - 0.5) * 2, // Random horizontal velocity
      vy: 2, // Initial vertical velocity
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  };

  return (
    <div>
      <button onClick={handleDropBall} style={{ padding:"0.4rem",backgroundColor:"crimson",display: 'block', margin: '10px auto' }}>Drop Ball</button>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ backgroundColor: 'black' }} />
    </div>
  );
};

export default GameCanvas;

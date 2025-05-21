import { useEffect, useState } from "react";

function Background() {
  const NUM_CIRCLES = 3;
  const STORAGE_KEY = "circlePositions";
  const colors = ["rgba(152, 217, 255, .54)", "rgba(162, 31, 185, 1)"];
  const rotation = [0, 54.7];

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setPositions(JSON.parse(saved));
    } else {
      const newPositions = Array.from({ length: NUM_CIRCLES }).map(() => ({
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 - 20 + "%",
        duration: Math.random() * 15 + 65 + "s",
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions));
      setPositions(newPositions);
    }
  }, []);

  return (
    <div className="circle-background">
      {positions.map((pos, i) => (
        <div
          key={i}
          className="circle"
          id={`circle-${i}`}
          style={{
            top: pos.top,
            left: pos.left,
            width: 892,
            height: 618,
            transform: `rotate(${rotation[i % rotation.length]}deg)`,
            filter: "blur(250px)",
            animation: `float${i % 2} ${pos.duration} linear infinite`,
            background: colors[i % colors.length],
          }}
        />
      ))}
    </div>
  );
}

// Styling found in App.css
export default Background;

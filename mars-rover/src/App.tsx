import React, { useState } from "react";

interface Rover {
  x: number;
  y: number;
  direction: string;
}
// State variables to hold the plateau size, input string, and output
const RoverSimulator: React.FC = () => {
  const [plateauX, setPlateauX] = useState<number>(5);
  const [plateauY, setPlateauY] = useState<number>(5);
  const [inputString, setInputString] = useState<string>(
    "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM"
  );
  const [output, setOutput] = useState<string>("");

  // Function to move a rover based on its instructions
  const moveRover = (rover: Rover, instructions: string): Rover => {
    for (const instruction of instructions) {
      if (instruction === "L") {
        turnLeft(rover);
      } else if (instruction === "R") {
        turnRight(rover);
      } else if (instruction === "M") {
        moveForward(rover);
      }
    }
    return rover;
  };
  // Helper functions to turn the rover left or right
  const turnLeft = (rover: Rover): void => {
    const directions = ["N", "W", "S", "E"];
    const currentDirectionIndex = directions.indexOf(rover.direction);
    rover.direction = directions[(currentDirectionIndex + 1) % 4];
  };

  const turnRight = (rover: Rover): void => {
    const directions = ["N", "E", "S", "W"];
    const currentDirectionIndex = directions.indexOf(rover.direction);
    rover.direction = directions[(currentDirectionIndex + 1) % 4];
  };

  // Helper function to move the rover forward in the current direction
  const moveForward = (rover: Rover): void => {
    if (rover.direction === "N" && rover.y < plateauY) {
      rover.y += 1;
    } else if (rover.direction === "E" && rover.x < plateauX) {
      rover.x += 1;
    } else if (rover.direction === "S" && rover.y > 0) {
      rover.y -= 1;
    } else if (rover.direction === "W" && rover.x > 0) {
      rover.x -= 1;
    }
  };

  // Function to process the input string and simulate rover movements
  const processInput = () => {
    // Split the input string into lines
    const lines = inputString.trim().split("\n");
    // Extract plateau size from the first line
    const [plateauSize, ...roverLines] = lines;
    // Extract plateau dimensions
    const [plateauXStr, plateauYStr] = plateauSize.split(" ");
    setPlateauX(parseInt(plateauXStr)); // Update plateauX state
    setPlateauY(parseInt(plateauYStr)); // Update plateauY state

    const rovers: Rover[] = [];

    // Iterate over rover lines and process each rover
    for (let i = 0; i < roverLines.length; i += 2) {
      const [x, y, direction] = roverLines[i].split(" ");
      const rover: Rover = { x: Number(x), y: Number(y), direction };
      const instructions = roverLines[i + 1];
      const finalRover = moveRover({ ...rover }, instructions);
      rovers.push(finalRover);
    }

    return rovers;
  };

  // Function to format the output string
  const formatOutput = (rovers: Rover[]) => {
    return rovers
      .map((rover) => `${rover.x} ${rover.y} ${rover.direction}`)
      .join("\n");
  };

  // Event handler for simulating rover movements
  const handleSimulate = () => {
    const rovers = processInput();
    const result = formatOutput(rovers);
    setOutput(result);
  };

  return (
    <div className="application">
      <h1>Mars Rover Simulator</h1>
      <div>
        <label>
          Input:
          <textarea
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            rows={5}
            cols={30}
          />
        </label>
      </div>
      <button onClick={handleSimulate}>Simulate</button>
      <div>
        <h2>Output</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default RoverSimulator;

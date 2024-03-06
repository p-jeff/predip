import React, { useState, useEffect } from 'react';

const generateNodes = (count) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 90,
    y: Math.random() * 90,
  }));
};

const generateConnections = (nodes) => {
  return nodes.map((node, index) => {
    if (index < nodes.length - 1) {
      const end = nodes[index + 1];
      const width = Math.sqrt(Math.pow(end.x - node.x, 2) + Math.pow(end.y - node.y, 2));
      const angle = Math.atan2(end.y - node.y, end.x - node.x) * 180 / Math.PI;
      return { ...node, width, angle };
    }
    return null;
  }).filter(Boolean);
};

const NetworkSimulation = () => {
  const [nodes, setNodes] = useState(generateNodes(30));
  const [connections, setConnections] = useState(generateConnections(nodes));

  useEffect(() => {
    const interval = setInterval(() => {
      const newNodes = generateNodes(10);
      setNodes(newNodes);
      setConnections(generateConnections(newNodes));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="network-simulation">
        Neural Node Construction
      {connections.map((conn, index) => (
        <div
          key={index}
          className="network-connection"
          style={{
            left: `${conn.x}%`,
            top: `${conn.y}%`,
            width: `${conn.width}%`,
            transform: `rotate(${conn.angle}deg)`
          }}
        ></div>
      ))}
      {nodes.map((node, index) => (
        <div
          key={index}
          className="network-node"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`
          }}
        ></div>
      ))}
    </div>
  );
};

export default NetworkSimulation;

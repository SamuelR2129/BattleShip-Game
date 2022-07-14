const createShip = (section, name) => {
  const position = section;
  const shipName = name;
  const hits = [];

  const hit = (index) => {
    hits.push(index);
  };

  const isSunk = () => {
    console.log("pos", position);
    return position.every((occupiedCell) => {
      return hits.includes(occupiedCell);
    });
  };

  return { hit, isSunk, position, shipName, hits };
};

export default createShip;

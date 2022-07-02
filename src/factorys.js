const createShip = (length, shipName) => {
  let health = length;

  const attack = () => {
    health -= 1;
    console.log(health);
    if (health <= 0) {
      //sink();
      console.log(`sunk ${shipName}`);
    }
  };
  return { attack, health: health };
};

export default createShip;

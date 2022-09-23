function checkWinner({ human, computer }) {
  const stillPlaying = [human, computer].filter((player) => {
    const shipSunk = !player.ships.every((ship) => ship.isSunk(ship.hits));
    return shipSunk;
  });
  return stillPlaying.length === 1 ? stillPlaying[0] : false;
}

export default checkWinner;

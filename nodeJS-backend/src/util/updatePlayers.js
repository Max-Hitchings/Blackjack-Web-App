export default function updatePlayers(
  socket,
  gameCode,
  { players, hostId, activePlayerId }
) {
  socket.to(gameCode).emit("updatePlayers", {
    players: players,
    hostId: hostId,
    activePlayerId: activePlayerId,
  });
}

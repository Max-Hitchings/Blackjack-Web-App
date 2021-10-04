export default function updatePlayers(
  io,
  gameCode,
  { players, hostId, activePlayerId }
) {
  io.to(gameCode).emit("updatePlayers", {
    players: players,
    hostId: hostId,
    activePlayerId: activePlayerId,
  });
}

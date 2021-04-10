export const leaveGame = async ({ Games, gameCode, socket }) => {
  try {
    await Games.findOneAndUpdate(
      { gameCode: gameCode },
      { $pull: { players: socket.id } },
      { useFindAndModify: false }
    );
    console.log("Removed");
  } catch (err) {
    console.error(err);
  }
};

window.onload = function() {
  FBInstant.initializeAsync().then(function() {
    // Start loading game assets here
    console.log("Loading...");

    FBInstant.startGameAsync().then(function() {
      console.log("uuuuuuuuuu");
      var contextId = FBInstant.context.getID();
      var contextType = FBInstant.context.getType();

      var playerName = FBInstant.player.getName();
      var playerPic = FBInstant.player.getPhoto();
      var playerId = FBInstant.player.getID();

      console.log("contextId", contextId);
      console.log("contextType", contextType);
      console.log("playerId", playerId);

      localStorage.setItem("contextId", contextId);
      localStorage.setItem("contextType", contextType);
      localStorage.setItem("playerId", playerId);

      window.gameData = {
        contextId: contextId,
        contextType: contextType,
        playerName: playerName,
        playerPic: playerPic,
        playerId: playerId
      };
      game.start();
    });
  });
};

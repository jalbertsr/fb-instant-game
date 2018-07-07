window.onload = function() {
  FBInstant.initializeAsync().then(function() {
    // Start loading game assets here
    console.log("Loading...");

    FBInstant.startGameAsync().then(function() {
      console.log("wwwwww");
      var contextId = FBInstant.context.getID();
      var contextType = FBInstant.context.getType();

      var playerName = FBInstant.player.getName();
      var playerPic = FBInstant.player.getPhoto();
      var playerId = FBInstant.player.getID();

      fetch(
        "https://food-society.herokuapp.com/api/instant-game/send-cache/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          body: JSON.stringify({ group_id: contextId, user_id: playerId })
        }
      );

      console.log("contextId", contextId);
      console.log("contextType", contextType);
      console.log("playerId", playerId);

      game.start();
    });
  });
};

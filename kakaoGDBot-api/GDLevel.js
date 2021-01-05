module.exports=(function(){
    function GDLevel(name, id, description, author, difficulty, downloads, likes, disliked, length,
         stars, orbs, diamonds, featured, epic, gameVersion, version, copiedID, twoPlayer, officialSong, customSong,
         coins, verifiedCoins, starsRequested, objects, large, cp, difficultyFace, song, demonList,
         uploaded, updated, password, ldm, extraString, data) {

            this.name = name;
            this.id = id;
            this.description = description;
            this.author = author;
            this.difficulty = difficulty;
            this.downloads = downloads;
            this.likes = likes;
            this.disliked = disliked;
            this.length = length;
            this.stars = stars;
            this.orbs = orbs;
            this.diamonds = diamonds;
            this.featured = featured;
            this.epic = epic;
            this.gameVersion = gameVersion;
            this.version = version;
            this.copiedID = copiedID;
            this.twoPlayer = twoPlayer;
            this.officialSong = officialSong;
            this.customSong = customSong;
            this.coins = coins;
            this.verifiedCoins = verifiedCoins;
            this.starsRequested = starsRequested;
            this.objects = objects;
            this.large = large;
            this.cp = cp;
            this.difficultyFace = difficultyFace;
            this.song = song;
            this.demonList = demonList;
            this.uploaded = uploaded;
            this.updated = updated;
            this.password = password;
            this.ldm = ldm;
            this.extraString = extraString;
            this.data = data;

    }

    return GDLevel;
})();
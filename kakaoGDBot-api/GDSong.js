module.exports=(function(){
    function GDSong(author, id, name, size, url, downloadURL) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.size = size || '0MB';
        this.url = url || '';
        this.downloadURL = decodeURIComponent(downloadURL || '');
    }

    GDSong.EMPTY = new GDSong("Unknown", 0, "Unknown");

    GDSong.basicSongs = {
        "0": new GDSong("ForeverBound", "Level 1", "Stereo Madness"),
        "1": new GDSong("DJVI", "Level 2", "Back On Track"),
        "2": new GDSong("Step", "Level 3", "Polargeist"),
        "3": new GDSong("DJVI", "Level 4", "Dry Out"),
        "4": new GDSong("DJVI", "Level 5", "Base After Base"),
        "5": new GDSong("DJVI", "Level 6", "Cant Let Go"),
        "6": new GDSong("Waterflame", "Level 7", "Jumper"),
        "7": new GDSong("Waterflame", "Level 8", "Time Machine"),
        "8": new GDSong("DJVI", "Level 9", "Cycles"),
        "9": new GDSong("DJVI", "Level 10", "xStep"),
        "10": new GDSong("Waterflame", "Level 11", "Clutterfunk"),
        "11": new GDSong("DJ-Nate", "Level 12", "Theory of Everything"),
        "12": new GDSong("Waterflame", "Level 13", "Electroman Adventures"),
        "13": new GDSong("DJ-Nate", "Level 14", "Clubstep"),
        "14": new GDSong("DJ-Nate", "Level 15", "Electrodynamix"),
        "15": new GDSong("Waterflame", "Level 16", "Hexagon Force"),
        "16": new GDSong("Waterflame", "Level 17", "Blast Processing"),
        "17": new GDSong("DJ-Nate", "Level 18", "Theory of Everything 2"),
        "18": new GDSong("Waterflame", "Level 19", "Geometrical Dominator"),
        "19": new GDSong("F-777", "Level 20", "Deadlocked"),
        "20": new GDSong("MDK", "Level 21", "Fingerdash")
    };

    return GDSong;
})();
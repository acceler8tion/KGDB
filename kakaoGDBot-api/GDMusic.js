/**
 * GDMusic 객체
 * 
 * @param {String} author 음원 저자
 * @param {Number | String} id 음원 아이디
 * @param {String} name 음원 타이틀
 * @param {String} size 음원 사이즈
 * @param {String} url 음원 링크(newgrounds.com)
 * @param {String} downloadURL 음원 다운로드 링크
 */
function GDMusic(author, id, name, size, url, downloadURL) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.size = size;
    this.url = url;
    this.downloadURL = decodeURIComponent(downloadURL || '');
}

GDMusic.EMPTY = new GDMusic("Unknown", 0, "Unknown");

GDMusic.basicSongs = {
    "0": new GDMusic("ForeverBound", "Level 1", "Stereo Madness"),
    "1": new GDMusic("DJVI", "Level 2", "Back On Track"),
    "2": new GDMusic("Step", "Level 3", "Polargeist"),
    "3": new GDMusic("DJVI", "Level 4", "Dry Out"),
    "4": new GDMusic("DJVI", "Level 5", "Base After Base"),
    "5": new GDMusic("DJVI", "Level 6", "Cant Let Go"),
    "6": new GDMusic("Waterflame", "Level 7", "Jumper"),
    "7": new GDMusic("Waterflame", "Level 8", "Time Machine"),
    "8": new GDMusic("DJVI", "Level 9", "Cycles"),
    "9": new GDMusic("DJVI", "Level 10", "xStep"),
    "10": new GDMusic("Waterflame", "Level 11", "Clutterfunk"),
    "11": new GDMusic("DJ-Nate", "Level 12", "Theory of Everything"),
    "12": new GDMusic("Waterflame", "Level 13", "Electroman Adventures"),
    "13": new GDMusic("DJ-Nate", "Level 14", "Clubstep"),
    "14": new GDMusic("DJ-Nate", "Level 15", "Electrodynamix"),
    "15": new GDMusic("Waterflame", "Level 16", "Hexagon Force"),
    "16": new GDMusic("Waterflame", "Level 17", "Blast Processing"),
    "17": new GDMusic("DJ-Nate", "Level 18", "Theory of Everything 2"),
    "18": new GDMusic("Waterflame", "Level 19", "Geometrical Dominator"),
    "19": new GDMusic("F-777", "Level 20", "Deadlocked"),
    "20": new GDMusic("MDK", "Level 21", "Fingerdash")
};

module.exports = GDMusic;

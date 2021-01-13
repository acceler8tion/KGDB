const GDMusic = require("../GDMusic");

const Converter = require("./Converter");

module.exports={
    /**
     * 두 객체를 섞은 새 객체를 반환합니다.
     * 
     * @param {Object} obj1 
     * @param {Object} obj2 
     * @returns {Object} obj1과 obj2를 섞은 새 객체
     * @throws 두 객체의 인스턴스가 서로 다를시 오류 방출.
     */
    mergeWith: function(obj1, obj2) {
        if(obj1.__proto__ != obj2.__proto__) {
            throw new TypeError("obj1 and obj2 have different instances.");
        } else {
            let mainObj = {};
            let k1 = Object.keys(obj1);
            let k2 = Object.keys(obj2);
            let ks = Array.from(new Set(k1.concat(k2)));
            for(k of ks) {
                if(typeof obj1[k] === "function" || typeof obj2[k] === "function") {
                    continue;
                } else if(obj1[k] == undefined) {
                    mainObj[k] = obj2[k];
                } else if(obj2[k] == undefined) {
                    mainObj[k] = obj1[k];
                } else if(obj1[k] == obj2[k]) {
                    mainObj[k] = obj2[k];
                }
            }
            return mainObj;
        }
    },

    /**
     * 값이 undefined이거나 null인지 검사합니다.
     * 
     * @param {any} obj 불안정한 값
     * @param {String} message 값이 undefined이거나 null일 시 반환할 에러 내용
     * @throws 값이 undefined이거나 null일 시 에러 방출.
     */
    requireNonNull: function(obj, message) {
        if(obj == undefined || obj == null) throw new Error(message);
    },

    /**
     * 값이 undefined이거나 null일시 다른 값으로 대체합니다.
     * 
     * @param {any} unstableData 불안정한 값
     * @param {any} replacer 값이 undefined이거나 null일 시 반환할 값
     * @returns {any} 결과 값
     */
    replaceIfEmptyData: function(unstableData, replacer) {
        return ((unstableData == undefined || unstableData == null) ? replacer : unstableData);
    },

    /**
     * 서버에서 받은 데이터에서 노래 정보를 추출합니다.
     * 
     * @param {Array<String>} songInfo 추출전 데이터
     * @returns {Object} 추출된 노래정보
     */
    extractSongInfo: function(songInfo) {
        let result = {};
        for(s of songInfo) {
            let data = Converter.convert(s, "~|~");
            let songID = data[Converter.SONG_ID];
            let songName = data[Converter.SONG_TITLE];
            result[songID] = new GDMusic(
                    this.replaceIfEmptyData(data[Converter.SONG_AUTHOR], "-"),
                    songID,
                    songName,
                    this.replaceIfEmptyData(data[Converter.SONG_SIZE], "0")+"MB",
                    "https://www.newgrounds.com/audio/listen/"+songID,
                    (function(){
                        if(songID <= 469776) {
                            return "https://www.newgrounds.com/audio/download/"+songID;
                        } else {
                            let url = "https://audio-download.ngfiles.com/";
                            let clonedSongName = songName;
                            clonedSongName = clonedSongName.replace(" ", "-");
                            clonedSongName = clonedSongName.replace("&", "amp");
                            clonedSongName = clonedSongName.replace("\\", "quot");
                            clonedSongName = clonedSongName.replace("<", "lt");
                            clonedSongName = clonedSongName.replace(">", "gt");
                            if(clonedSongName.length > 27) {
                                clonedSongName = clonedSongName.substring(0, 27);
                            }
                            url = url + (songID+"").substring(0, 3) + "000/" + songID + "_" + clonedSongName + ".mp3";
                            return url;
                        }
                    }).bind(this)()
            );
        }

        return result;
    },

    /**
     * 서버에서 받은 데이터에서 유저 정보를 추출합니다.
     * 
     * @param {Array<String>} userInfo 추출전 raw string
     * @returns {Object} 추출된 유저정보
     */
    extractUserInfo: function(userInfo) {
        let result = {};
        for(u of userInfo) {
            let data = u.split(":");
            let playerID = data[0];
            result[playerID] = {
                name: data[1],
                playerID: data[0],
                accountID: data[2]
            };
        }

        return result;
    },

    /**
     * raw string에서 페이지 정보를 추출합니다.
     * 
     * @param {Array<String>} pageInfo 추출전 raw string
     * @returns {Object} 추출된 페이지 정보
     */
    extractPageInfo: function(pageInfo) {
        return {
            currentPage: +pageInfo[1],
            currentPageItemCount: +pageInfo[2],
            maxItemCount: +pageInfo[0],
            maxPage: Math.ceil(+pageInfo[0] / +pageInfo[2])
        };
    }
}

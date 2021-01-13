module.exports = {
    /**
     * GD서버에서 받은 Raw데이터를 JSObject로 변환시킵니다.
     * 
     * @param {String} string raw데이터
     * @param {String} seperator 분리할 문자
     * @returns {Object} 변환된 JSObject
     */
    convert: function(string, seperator){
        let splitted = string.split(seperator);
        let result = {};
        for(let i = 0; i < splitted.length; i += 2){
            result[splitted[i]] = splitted[i+1];
        }
        return result;
    },

/* LEVEL INDEX */
    LEVEL_ID: 1,
    LEVEL_NAME: 2,
    LEVEL_DESCRIPTION: 3,
    LEVEL_DATA: 4,
    LEVEL_VERSION: 5,
    LEVEL_CREATOR_ID: 6,
    LEVEL_DIFFICULTY: 9,
    LEVEL_DOWNLOADS: 10,
    LEVEL_AUDIO_TRACK: 12,
    LEVEL_GAME_VERSION: 13,
    LEVEL_LIKES: 14,
    LEVEL_LENGTH: 15,
    LEVEL_IS_DEMON: 17,
    LEVEL_STARS: 18,
    LEVEL_FEATURED_SCORE: 19,
    LEVEL_IS_AUTO: 25,
    LEVEL_ENCRYPTED_INFO: 26,
    LEVEL_PASS: 27,
    LEVEL_UPLOADED_TIMESTAMP: 28,
    LEVEL_LAST_UPDATED_TIMESTAMP: 29,
    LEVEL_ORIGINAL: 30,
    LEVEL_IS_TWOPLAYER: 31,
    LEVEL_SONG_ID: 35,
    LEVEL_EXTRA_STRING: 36,
    LEVEL_COIN_COUNT: 37,
    LEVEL_COIN_VERIFIED: 38,
    LEVEL_REQUESTED_STARS: 39,
    LEVEL_LDM: 40,
    LEVEL_IS_EPIC: 42,
    LEVEL_DEMON_DIFFICULTY: 43,
    LEVEL_OBJECT_COUNT: 45,
    LEVEL_WT: 46,
    LEVEL_WT2: 47,

/* PROFILE INDEX */
    PROFILE_NAME: 1,
    PROFILE_PLAYER_ID: 2,
    PROFILE_STARS: 3,
    PROFILE_DEMONS: 4,
    PROFILE_CREATOR_POINTS: 8,
    PROFILE_ICON_ID: 9,
    PROFILE_COLOR_1: 10,
    PROFILE_COLOR_2: 11,
    PROFILE_SECRET_COINS: 13,
    PROFILE_ICON_TYPE: 14,
    PROFILE_GLOW_OUTLINE: 15,
    PROFILE_ACCOUNT_ID: 16,
    PROFILE_USER_COINS: 17,
    PROFILE_PRIVATE_MESSAGE_POLICY: 18,
    PROFILE_FRIEND_REQUEST_POLICY: 19,
    PROFILE_YOUTUBE: 20,
    PROFILE_ICON_CUBE: 21,
    PROFILE_ICON_SHIP: 22,
    PROFILE_ICON_BALL: 23,
    PROFILE_ICON_UFO: 24,
    PROFILE_ICON_WAVE: 25,
    PROFILE_ICON_ROBOT: 26,
    PROFILE_IS_NOT_BANNED: 29,
    PROFILE_GLOW_OUTLINE_2: 28,
    PROFILE_GLOBAL_RANK: 30,
    PROFILE_ICON_SPIDER: 43,
    PROFILE_TWITTER: 44,
    PROFILE_TWITCH: 45,
    PROFILE_DIAMONDS: 46,
    PROFILE_DEATH_EFFECT: 48,
    PROFILE_ROLE: 49,
    PROFILE_COMMENT_HISTORY_POLICY: 50,

/* SONG INDEX */
    SONG_ID: 1,
    SONG_TITLE: 2,
    SONG_AUTHOR: 4,
    SONG_SIZE: 5,
    SONG_SECRET_URL: 7,
    SONG_URL: 10,

/* MESSAGE INDEX */
    MESSAGE_ID: 1,
    MESSAGE_SENDER_ID: 2,
    MESSAGE_SENDER_NAME: 6,
    MESSAGE_SUBJECT: 4,
    MESSAGE_BODY: 5,
    MESSAGE_TIMESTAMP: 7,
    MESSAGE_IS_READ: 8,

/* COMMENT INDEX */
    COMMENT_LEVEL_ID: 1,
    COMMENT_BODY: 2,
    COMMENT_AUTHOR_ID: 3, //player id
    COMMENT_LIKES: 4,
    COMMENT_ID: 6,
    COMMENT_IS_SPAM: 7,
    COMMENT_TIMESTAMP: 9,
    COMMENT_LEVEL_PERCENTAGE: 10,
    COMMENT_USER_STATUS: 11,
    COMMENT_COLOR: 12,
    COMMENT_TYPE: 101,

    COMMENT_PROFILE_NAME: 1,
    COMMENT_PROFILE_ICON: 9,
    COMMENT_PROFILE_COLOR_1: 10,
    COMMENT_PROFILE_COLOR_2: 11,
    COMMENT_PROFILE_ICON_TYPE: 14,
    COMMENT_PROFILE_IS_GLOW: 15,
    COMMENT_PROFILE_ACCOUNT_ID: 16,

/* REQUEST INDEX */    
    REQUEST_SENDER_NAME: 1,
    REQUEST_SENDER_ID: 2,
    REQUEST_SENDER_ACCOUNT_ID: 16,
    REQUEST_ID: 32,
    REQUEST_BODY: 35,
    REQUEST_TIMESTAMP: 37,
    REQUEST_STATUS: 41,
    REQUEST_INDICATOR: 101,

/* MAPPACK INDEX */    
    MAPPACK_ID: 1,
    MAPPACK_NAME: 2,
    MAPPACK_LEVEL_IDS: 3,
    MAPPACK_STARS: 4,
    MAPPACK_COINS: 5,
    MAPPACK_DIFFICULTY: 6,
    MAPPACK_COLOR: 7,

/* GAUNTLET INDEX */
    GAUNTLET_ID: 1,
    GAUNTLET_LEVELS: 3
};
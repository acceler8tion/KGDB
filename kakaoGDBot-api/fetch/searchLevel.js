importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

const GDLevel = require('../GDLevel');
const GDMusic = require('../GDMusic');
const GDDifficulty = require('../GDDifficulty');
const GDLength = require('../GDLength');

const FailedRequestException = require('../exception/FailedRequestException');

const Converter = require('../util/Converter');
const ExtraUtils = require('../util/ExtraUtils');
const LevelSearchFilter = require('../util/LevelSearchFilter');
const Param = require('../util/param');
const URL = require('../util/url');
const { Base64 } = require('../util/Crypto');

const orbs = [0, 0, 50, 75, 125, 175, 225, 275, 350, 425, 500];

/**
 * query에 해당하는 레벨들을 검색합니다.
 * 
 * @param {LevelSearchFilter} query 레벨 검색 필터
 * @param {Object} defaultOption 기본 옵션값
 * @returns {Object} 검색 결과
 */
exports.searchLevel = function(query, defaultOption) {

    let param = new Param();
    param.add("type", query.type)
    param.add("str", query.str)
    param.add("diff", query.diff);
    param.add("len", query.len);
    param.add("page", query.page);
    param.add("total", query.total);
    param.add("uncompleted", query.uncompleted);
    param.add("onlyCompleted", query.onlyCompleted);
    param.add("featured", query.featured);
    param.add("original", query.original);
    param.add("twoPlayer", query.twoPlayer);
    param.add("coins", query.coins);
    param.add("epic", query.epic);
    if(query.demonFilter !== undefined) param.add("demonFilter", query.demonFilter);
    if(query.song !== undefined) param.add("song", query.song);
    if(query.customSong !== undefined) param.add("customSong", query.customSong);
    if(query.completedLevels !== undefined) param.add("completedLevels", query.completedLevels);

    let ks = Object.keys(defaultOption);
    for(k of ks) {
        param.add(k, defaultOption[k]);
    }

    let result = {
        raw: {},
        levels: [],
        pageInfo: {
            currentPage: query.page,
            currentPageItemCount: query.total < 10 ? 10 : query.total,
            maxItemCount: 0,
            maxPage: 0
        },
        error: {
            isError: false,
            customMessage: "",
            errorClassName: null,
            stack: null
        }
    }

    param = param.build();
    try {
        let response = Jsoup.connect(URL.load(URL.LEVEL_SEARCH))
                            .timeout(20000)
                            .ignoreContentType(true)
                            .requestBody(param)
                            .method(Connection.Method.POST)
                            .execute();
        let data = response.body().toString();

        if(response.statusCode() == 500) throw new FailedRequestException("Server internal error");
        if(data == "-1") throw new FailedRequestException("Returned value `-1`");

        let splitted = data.split("#");
        let levels = splitted[0].split("|");
        let users = splitted[1].split("|");
        let songs = splitted[2].split("~:~");
        let pageInfo = splitted[3].split(":");

        users = ExtraUtils.extractUserInfo(users);
        songs = ExtraUtils.extractSongInfo(songs);
        pageInfo = ExtraUtils.extractPageInfo(pageInfo);

        for(lv of levels) {
            let data = Converter.convert(lv, ":");
            let levelId = +data[Converter.LEVEL_ID];
            let creatorId = ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_CREATOR_ID], "0");
            let userInfo = users[creatorId];
            let songInfo = songs[data[Converter.LEVEL_SONG_ID]];
            result.raw[""+levelId] = lv;
            result.levels.push(
                    new GDLevel(
                            data[Converter.LEVEL_NAME],
                            levelId,
                            Base64.decode(ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_DESCRIPTION], "")),
                            !userInfo ? { name: "-", playerId: 0, accountId: 0} : userInfo,
                            GDDifficulty.getAbsoluteDifficulty(
                                    data[Converter.LEVEL_DIFFICULTY],
                                    data[Converter.LEVEL_DEMON_DIFFICULTY],
                                    data[Converter.LEVEL_IS_AUTO],
                                    data[Converter.LEVEL_IS_DEMON]
                            ),
                            +data[Converter.LEVEL_DOWNLOADS],
                            +data[Converter.LEVEL_LIKES],
                            GDLength.getAbsoluteLength(ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_LENGTH], "0")),
                            +data[Converter.LEVEL_STARS],
                            orbs[+data[Converter.LEVEL_STARS]],
                            data[Converter.LEVEL_STARS] < 2 ? 0 : (+data[Converter.LEVEL_STARS])+2,
                            data[Converter.LEVEL_FEATURED_SCORE] > 0,
                            data[Converter.LEVEL_IS_EPIC] > 0,
                            (data[Converter.LEVEL_GAME_VERSION] > 17 ? (data[Converter.LEVEL_GAME_VERSION] / 10).toFixed(1) 
                                                        : (data[Converter.LEVEL_GAME_VERSION] == 11 ? "1.8" 
                                                                    : (data[Converter.LEVEL_GAME_VERSION] == 10 ? "1.7" : "Pre-1.7"))),
                            +data[Converter.LEVEL_VERSION],
                            +data[Converter.LEVEL_ORIGINAL],
                            data[Converter.LEVEL_IS_TWOPLAYER] > 0,
                            +data[Converter.LEVEL_COIN_COUNT],
                            data[Converter.LEVEL_COIN_VERIFIED] > 0,
                            +data[Converter.LEVEL_REQUESTED_STARS],
                            +data[Converter.LEVEL_OBJECT_COUNT],
                            data[Converter.LEVEL_OBJECT_COUNT] > 40000,
                            (+(data[Converter.LEVEL_STARS] > 0)) + (+(data[Converter.LEVEL_FEATURED_SCORE] > 0)) + (+(data[Converter.LEVEL_IS_EPIC] > 0)),
                            ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_SONG_ID], "0") == "0" ? GDMusic.basicSongs[data[Converter.LEVEL_AUDIO_TRACK]]
                                                        : (!songInfo ? GDMusic.EMPTY : songInfo),
                            null,
                            ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_UPLOADED_TIMESTAMP], "NA") + " ago",
                            ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_LAST_UPDATED_TIMESTAMP], "NA") + " ago",
                            null,
                            null,
                            null,
                            null
                    )
            );
        }
    } catch(e) {
        result.error.isError = true;
        result.error.customMessage = e.message;
        result.error.stack = e.stack;
        if(e instanceof FailedRequestException) {
            result.error.errorClassName = "FailedRequestException";
        } else {
            result.error.errorClassName = e.rhinoException.getClass().getName();
        }
    } finally {
        return result;
    }
}

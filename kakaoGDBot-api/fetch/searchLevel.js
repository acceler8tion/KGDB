importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

const GDLevel = require('../GDLevel');
const GDDifficulty = require('../GDDifficulty');
const GDLength = require('../GDLength');

const FailedRequestException = require('../exception/FailedRequestException');

const Converter = require('../util/Converter');
const ExtraUtils = require('../util/ExtraUtils');
const LevelSearchFilter = require('../util/LevelSearchFilter');
const Param = require('../util/param');
const URL = require('../util/url');
const Base64 = require('../util/Crypto').Base64;

/**
 * 
 * @param {LevelSearchFilter} query 
 * @param {Object} config 
 */
exports.searchLevel = function(query, config) {

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

    let configKs = Object.keys(config);
    for(k of configKs) {
        param.add(k, configKs[k]);
    }

    let result = {
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
            errorClassName: null
        }
    }
    try {
        let response = Jsoup.connect(URL.load(URL.LEVEL_SEARCH))
                            .timeout(20000)
                            .requestBody(param.build())
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
            let levelId = data[Converter.LEVEL_ID];
            let creatorId = ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_CREATOR_ID], "0");
            let userInfo = users[creatorId];
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
                            
                    )
            )
        }
    } catch(e) {
        result.error.isError = true;
        result.error.customMessage = e.message;
        if(e instanceof FailedRequestException) {
            result.error.errorClassName = "FailedRequestException";
        } else {
            result.error.errorClassName = e.rhinoException.getClass().getName();
        }
    } finally {
        return result;
    }
}
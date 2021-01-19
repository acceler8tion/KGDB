importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

const GDUser = require('../GDUser');
const Role = require('../Role');

const FailedRequestException = require('../exception/FailedRequestException');
const InvalidParamException = require('../exception/InvalidParamException');

const Converter = require('../util/Converter');
const ExtraUtils = require('../util/ExtraUtils');
const Param = require('../util/param');
const URL = require('../util/url');
const { PROFILE_FRIEND_REQUEST_POLICY } = require('../util/Converter');

/**
 * id(accountID)에 해당하는 유저 프로필을 갖고옵니다.
 * 
 * @param {Number} id 유저의 accountID
 * @param {Object} credential 봇 계정
 * @param {Object} defaultOption 기본 옵션값
 * @returns {Object} 요청한 프로필 
 */
exports.getUserProfileByAccountID = function(id, credential, defaultOption) {

    if(!credential) throw new InvalidParamException("Need credential");

    let param = new Param();
    param.add("accountID", credential.accountID);
    param.add("gjp", credential.password);
    param.add("targetAccountID", id);

    Log.d(credential.password);

    let ks = Object.keys(defaultOption);
    for(k of ks) {
        param.add(k, defaultOption[k]);
    }

    let result = {
        user: null,
        error: {
            isError: false,
            customMessage: "",
            errorClassName: null,
            stack: null
        }
    };

    param = param.build();
    try {
        let response = Jsoup.connect(URL.load(URL.GET_USER_INFO))
                            .timeout(20000)
                            .ignoreContentType(true)
                            .requestBody(param)
                            .method(Connection.Method.POST)
                            .execute();
        let dt = response.body();

        if(response.statusCode() == 500) throw new FailedRequestException("Server internal error");
        if(dt == "-1") throw new FailedRequestException("Returned value `-1`");

        let data = Converter.convert(dt, ":");
        result.user = new GDUser(
                ExtraUtils.replaceIfEmptyData(data[Converter.PROFILE_NAME], "-"),
                +data[Converter.PROFILE_PLAYER_ID],
                +data[Converter.PROFILE_STARS],
                +data[Converter.PROFILE_DEMONS],
                +data[Converter.PROFILE_CREATOR_POINTS],
                null,
                +data[Converter.PROFILE_COLOR_1],
                +data[Converter.PROFILE_COLOR_2],
                +data[Converter.PROFILE_SECRET_COINS],
                null,
                null,
                +ExtraUtils.replaceIfEmptyData(data[Converter.PROFILE_ACCOUNT_ID], "0"),
                +data[Converter.PROFILE_USER_COINS],
                +ExtraUtils.replaceIfEmptyData(data[Converter.PROFILE_PRIVATE_MESSAGE_POLICY], "0"),
                +ExtraUtils.replaceIfEmptyData(data[Converter/PROFILE_FRIEND_REQUEST_POLICY], "0"),
                (function (){
                    let yt = data[Converter.PROFILE_YOUTUBE];
                    return yt.indexOf("youtube.com") != -1 || yt.indexOf("youtu.be") != -1 ?
                            yt : "https://www.youtube.com/channel/" + yt;
                }).bind(this)(),
                +data[Converter.PROFILE_ICON_CUBE],
                +data[Converter.PROFILE_ICON_SHIP],
                +data[Converter.PROFILE_ICON_BALL],
                +data[Converter.PROFILE_ICON_UFO],
                +data[Converter.PROFILE_ICON_WAVE],
                +data[Converter.PROFILE_ICON_ROBOT],
                data[Converter.PROFILE_GLOW_OUTLINE] > 0,
                +ExtraUtils.replaceIfEmptyData(data[Converter.PROFILE_GLOBAL_RANK], "0"),
                +data[Converter.PROFILE_ICON_SPIDER],
                data[Converter.PROFILE_TWITTER],
                data[Converter.PROFILE_TWITCH],
                +data[Converter.PROFILE_DIAMONDS],
                +data[Converter.PROFILE_DEATH_EFFECT],
                Role.getRole(ExtraUtils.replaceIfEmptyData(data[Converter.PROFILE_ROLE], "0")),
                +ExtraUtils.replaceIfEmptyData(data[Converter.PROFILE_COMMENT_HISTORY_POLICY], "0")
        );
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
importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

const GDLevel = require('../GDLevel');
const GDMusic = require('../GDMusic');
const GDDifficulty = require('../GDDifficulty');
const GDLength = require('../GDLength');
const { DemonListData, DemonListRecord, DemonListPlayer } = require('../demonlist');

const FailedRequestException = require('../exception/FailedRequestException');

const Converter = require('../util/Converter');
const ExtraUtils = require('../util/ExtraUtils');
const Param = require('../util/param');
const URL = require('../util/url');
const { Base64, AssHole } = require('../util/Crypto');

const orbs = [0, 0, 50, 75, 125, 175, 225, 275, 350, 425, 500];

/**
 * id에 해당하는 레벨을 갖고옵니다.
 * 
 * @param {Number} id 갖고올 레벨 id
 * @param {String} preLevel merge할 이전레벨 데이터
 * @param {Object} preLevelUser merge할 이전레벨 유저 데이터
 * @param {GDMusic} preLevelMusic merge할 이전레벨 음원 데이터
 * @param {Object} defaultOption 기본 옵션값
 * @returns {Object} 요청한 레벨
 */
exports.getLevel = function(id, preLevel, preLevelUser, preLevelMusic, defaultOption) {

    let param = new Param();
    param.add("levelID", id);
    param.add("inc", 0);
    param.add("extras", 0);

    let ks = Object.keys(defaultOption);
    for(k of ks) {
        param.add(k, defaultOption[k]);
    }

    let result = {
        level: null,
        error: {
            isError: false,
            customMessage: "",
            errorClassName: null,
            stack: null
        }
    };

    param = param.build();
    try {
        let response = Jsoup.connect(URL.load(URL.DOWNLOAD_LEVEL))
                            .timeout(20000)
                            .ignoreContentType(true)
                            .requestBody(param)
                            .method(Connection.Method.POST)
                            .execute();
        let dt = response.body().toString();

        if(response.statusCode() == 500) throw new FailedRequestException("Server internal error");
        if(dt == "-1") throw new FailedRequestException("Returned value `-1`");

        let splitted = dt.split("#");
        let newLevel = Converter.convert(splitted[0], ":");
        let data = !preLevel ? newLevel : ExtraUtils.mergeWith(
                Converter.convert(preLevel, ":"),
                newLevel
        );
        let levelID = +data[Converter.LEVEL_ID];
        let levelName = data[Converter.LEVEL_NAME];
        let levelDiff = GDDifficulty.getAbsoluteDifficulty(
            data[Converter.LEVEL_DIFFICULTY],
            data[Converter.LEVEL_DEMON_DIFFICULTY],
            data[Converter.LEVEL_IS_AUTO],
            data[Converter.LEVEL_IS_DEMON]
        );

        let demonListObject = null;
        if(levelDiff == GDDifficulty.INSANE_DEMON || levelDiff == GDDifficulty.EXTREME_DEMON) {
            try {

                let response2 = Jsoup.connect("https://www.pointercrate.com/api/v1/demons/?name="+encodeURI(levelName))
                                        .timeout(8000)
                                        .ignoreContentType(true)
                                        .method(Connection.Method.GET)
                                        .execute()
                                        .body()
                                        .toString();
                response2 = JSON.parse(response2);

                if(response2[0]) {
                    let demonListID = response2[0].id;
                    try {

                        let response3 = Jsoup.connect("https://www.pointercrate.com/api/v2/demons/"+demonListID)
                                                .timeout(8000)
                                                .ignoreContentType(true)
                                                .method(Connection.Method.GET)
                                                .execute()
                                                .body()
                                                .toString();
                        response3 = JSON.parse(response3);
                        if(response3.data) {
                            let demonObj = response3.data;
                            let creators = demonObj.creators.map(v => {
                                    return new DemonListPlayer(
                                            v.id,
                                            v.name,
                                            v.banned
                                    );
                            });
                            let records = demonObj.records.map(v => {
                                    return new DemonListRecord(
                                            v.id,
                                            new DemonListPlayer(
                                                    v.player.id,
                                                    v.player.name,
                                                    v.player.banned
                                            ),
                                            v.progress,
                                            v.status,
                                            v.video
                                    );
                            });
                            demonListObject = new DemonListData(
                                    demonObj.id,
                                    demonObj.name,
                                    demonObj.position,
                                    demonObj.level_id,
                                    demonObj.requirement,
                                    creators,
                                    records,
                                    demonObj.video
                            );
                        }
                    } catch(e) {
                        //접속 실패(혹은 다른 이유)
                        Log.d(e+"\n\n"+e.stack);
                    }
                }
            } catch(e) {
                //접속 실패(혹은 다른 이유)
                Log.d(e+"\n\n"+e.stack);
            }
        }

        result.level = new GDLevel(
                data[Converter.LEVEL_NAME],
                levelID,
                Base64.decode(ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_DESCRIPTION], "")),
                !preLevelUser ? { name: "-", playerID: 0, accountID: 0} : preLevelUser,
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
                !preLevelMusic ? GDMusic.EMPTY : preLevelMusic,
                demonListObject,
                ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_UPLOADED_TIMESTAMP], "NA") + " ago",
                ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_LAST_UPDATED_TIMESTAMP], "NA") + " ago",
                (function(){
                    let pass = data[Converter.LEVEL_PASS];
                    if(!pass){
                        return 0;
                    } else if(pass == "Aw=="){
                        return 1;
                    } else{
                        pass = AssHole.decrypt(pass, "26364");
                        //if(pass.length > 1) pass = pass.slice(1);
                        return pass.substring(1, 7);
                    }
                }).bind(this)(),
                ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_LDM], false),
                ExtraUtils.replaceIfEmptyData(data[Converter.LEVEL_EXTRA_STRING], ''),
                data[Converter.LEVEL_DATA]
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
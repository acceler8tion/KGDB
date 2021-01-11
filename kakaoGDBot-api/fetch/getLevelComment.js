importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

const GDComment = require('../GDComment');
const Role = require('../Role');

const FailedRequestException = require('../exception/FailedRequestException');

const Converter = require('../util/converter');
const ExtraUtils = require('../util/ExtraUtils');
const URL = require('../util/url');
const { Base64, AssHole } = require('../util/Crypto');
const Param = require('../util/param');

const iconSet = ['Icon', 'Ship', 'Ball', 'Ufo', 'Wave', 'Robot', 'Spider'];

/**
 * levelID에 해당하는 레벨의 댓글 리스트를 갖고옵니다.
 * 
 * @param {Number} levelID 댓글을 가져올 레벨 id
 * @param {Number} sort 정렬 방법(0: normal, 1: most liked)
 * @param {Number} page 댓글 페이지
 * @param {Number} count 한번에 가져올 댓글 갯수
 * @param {Object} defaultOption 기본 옵션값
 * @returns {Object} 요청한 댓글 리스트
 */
exports.getLevelComment = function(levelID, sort, page, count, defaultOption) {

    count = !count ? 10 : count;

    let param = new Param();
    param.add("levelID", levelID);
    param.add("page", page);
    param.add("total", "0");
    param.add("mode", sort);
    param.add("count", count);

    let ks = Object.keys(defaultOption);
    for(k of ks) {
        param.add(k, defaultOption[k]);
    }

    let result = {
        comments: [],
        pageInfo: {
            currentPage: page,
            currentPageItemCount: count,
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
        let response = Jsoup.connect(URL.load(URL.GET_COMMENTS))
                            .timeout(20000)
                            .ignoreContentType(true)
                            .requestBody(param)
                            .method(Connection.Method.POST)
                            .execute();
        let data = response.body().toString();

        if(response.statusCode() == 500) throw new FailedRequestException("Server internal error");
        if(data == "-1") throw new FailedRequestException("Returned value `-1`");

        let splitted = data.split("#");
        let comments = splitted[0].split("|");
        let pageInfo = splitted[1];
        if(pageInfo) {
            pageInfo = ExtraUtils.extractPageInfo(pageInfo.split(":"));
            result.pageInfo = pageInfo;
        }

        if(splitted[0]) {
            for(cm of comments) {
                let datas = cm.split(":");
                let cData = Converter.convert(datas[0], "~");
                let uData = Converter.convert(datas[1], "~");

                let author = {
                    name: ExtraUtils.replaceIfEmptyData(uData[Converter.COMMENT_PROFILE_NAME], "-"),
                    playerID: +cData[Converter.COMMENT_AUTHOR_ID],
                    accountID: +(uData[Converter.COMMENT_PROFILE_ACCOUNT_ID] || 0)
                };
                let iconInfo = {
                    form: iconSet[+uData[Converter.COMMENT_PROFILE_ICON_TYPE]],
                    icon: +uData[Converter.COMMENT_PROFILE_ICON],
                    col1: +uData[Converter.COMMENT_PROFILE_COLOR_1],
                    col2: +uData[Converter.COMMENT_PROFILE_COLOR_2],
                    glow: +uData[Converter.COMMENT_PROFILE_IS_GLOW] > 0
                };

                result.comments.push(
                        new GDComment(
                                Base64.decode(cData[Converter.COMMENT_BODY]),
                                +cData[Converter.COMMENT_ID],
                                +cData[Converter.COMMENT_LIKES],
                                ExtraUtils.replaceIfEmptyData(cData[Converter.COMMENT_TIMESTAMP], "NA")+" ago",
                                levelID,
                                author,
                                +cData[Converter.COMMENT_LEVEL_PERCENTAGE],
                                Role.getRole(ExtraUtils.replaceIfEmptyData(cData[Converter.COMMENT_USER_STATUS], "0")),
                                iconInfo
                        )
                );
            }
        }
    } catch(e) {
        //접속 실패(혹은 다른 이유)
        Log.d(e+"\n\n"+e.stack);
    } finally {
        return result;
    }
}
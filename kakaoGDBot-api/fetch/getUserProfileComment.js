importClass(org.jsoup.Jsoup);
importClass(org.jsoup.Connection);

const GDComment = require('../GDComment');

const FailedRequestException = require('../exception/FailedRequestException');

const Converter = require('../util/Converter');
const ExtraUtils = require('../util/ExtraUtils');
const Param = require('../util/param');
const URL = require('../util/url');
const { Base64 } = require('../util/Crypto');

exports.getUserProfileComment = function(accountID, page, defaultOption) {

    page = !page ? 0 : page;

    let param = new Param();
    param.add("accountID", accountID);
    param.add("page", page);
    param.add("total", 0);

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
        let response = Jsoup.connect(URL.load(URL.GET_ACC_COMMENTS))
                            .timeout(20000)
                            .ignoreContentType(true)
                            .requestBody(param)
                            .method(Connection.Method.POST)
                            .execute();
        let dt = response.body().toString();

        if(response.statusCode() == 500) throw new FailedRequestException("Server internal error");
        if(dt == "-1") throw new FailedRequestException("Returned value `-1`");

        let splitted = dt.split("#");
        let comments = splitted[0].split("|");
        let pageInfo = splitted[1];
        if(pageInfo) {
            pageInfo = ExtraUtils.extractPageInfo(pageInfo.split(":"));
            result.pageInfo = pageInfo;
        }

        return dt;
    } catch(e) {
        
    }
}
module.exports=(function(){
    function Connection(url, body, timeout, callback){
        this.url = url;
        this.body = body;
        this.timeout = timeout;
        this.callback = callback;

        this.result = org.jsoup.Jsoup.connect(url).timeout(timeout);
        this.result = this.result.requestBody(body);
        this.result = this.result.method(method);
    }

    Connection.sendPOST = function(url, body, timeout, callback){
        let con = new Connection(url, body, timeout, callback);
        return con.send();
    }

    Connection.prototype.send = function(){
        let res;
        try{
            res = this.result.execute().body();
            return this.callback(res.toString());
        } catch(e){
            this.callback(null, e);
            return;
        }
    }

    Connection.prototype.toString = function(){
        return "URL: "+this.url+"\n"+
                "Body: "+this.body+"\n"+
                "Timeout: "+this.timeout
    }

    return Connection;
})();
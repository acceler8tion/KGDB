RequestFailedException = function(message) {
    try{__}catch(e){
        this.name = "RequestFailedException";
        this.message = message;
        this.lineNumber = e.lineNumber;
        this.stack = e.stack;
    }
}

RequestFailedException.prototype = Object.create(Error.prototype);
RequestFailedException.prototype.constructor = RequestFailedException;

module.exports = RequestFailedException;
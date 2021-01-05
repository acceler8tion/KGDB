InvalidParamException = function(message) {
    try{__}catch(e){
        this.name = "InvalidParamException";
        this.message = message;
        this.lineNumber = e.lineNumber;
        this.stack = e.stack;
    }
}

InvalidParamException.prototype = Object.create(TypeError.prototype);
InvalidParamException.prototype.constructor = InvalidParamException;

module.exports = InvalidParamException;
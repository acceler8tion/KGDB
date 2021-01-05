module.exports=(function (){
    function LevelSearchFilter(){
        this.diff = null;
        this.len = null;
        this.demonFilter = null;
        
    }

    LevelSearchFilter.AUTO = -3;
    LevelSearchFilter.DEMON = -2;
    LevelSearchFilter.EASY_DEMON = [-2,1];
    LevelSearchFilter.MEDIUM_DEMON = [-2,2];
    LevelSearchFilter.HARD_DEMON = [-2,3];
    LevelSearchFilter.INSANE_DEMON = [-2,4];
    LevelSearchFilter.EXTREME_DEMON = [-2,5];
    LevelSearchFilter.NA = -1;
    LevelSearchFilter.EASY = 1;
    LevelSearchFilter.NORMAL = 2;
    LevelSearchFilter.HARD = 3;
    LevelSearchFilter.HARDER = 4;
    LevelSearchFilter.INSANE = 5;

    LevelSearchFilter.TINY = 0;
    LevelSearchFilter.SHORT = 1;
    LevelSearchFilter.MEDIUM = 2;
    LevelSearchFilter.LONG = 3;
    LevelSearchFilter.XL = 4;

    LevelSearchFilter.prototype.setDifficulty = function(diff){
        var diffs = Array.from(arguments);
        if(diffs.length > 1){
            if(diffs.some(v => v instanceof Array)) throw new TypeError("Multi-difficulty is only available with EASY ~ INSANE");
            else this.diff = diffs.join();
        } else {
            if(diffs[0] == LevelSearchFilter.AUTO) this.diff = LevelSearchFilter.AUTO;
            else if(diffs[0] == LevelSearchFilter.NA) this.diff = LevelSearchFilter.NA;
            else {
                var splitted = diffs[0].split("/");
                this.diff = splitted[0];
                this.demonFilter = splitted[1];
            }
        }

        return this;
    }

    LevelSearchFilter.prototype.setLength = function(len){
        this.len = Array.from(arguments).join();
        return this;
    }
})();
'use strict';

if (process.env.RUN_ENV === "server") {
    require = function (assets) {
        var index = assets.lastIndexOf('/');
        var file = assets.slice(index + 1);
        return "/assets/images/" + file;
    }
}

module.exports = {
    gallery: {
        'slider-4-lg': require("./images/slider/slider-4-lg.jpg"),
        'slider-4-sm': require("./images/slider/slider-4-sm.jpg"),
        'slider-1-lg': require("./images/slider/slider-1-lg.jpg"),
        'slider-1-sm': require("./images/slider/slider-1-sm.jpg")
    },
    skin: {
        'left': require("./images/skin/left.jpg"),
        'right': require("./images/skin/right.jpg")
    }
};

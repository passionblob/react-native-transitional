"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transitional = void 0;
var src_1 = require("./src");
var Transitional = /** @class */ (function () {
    function Transitional() {
    }
    Transitional.Text = src_1.TransitionalText;
    Transitional.View = src_1.TransitionalView;
    Transitional.Image = src_1.TransitionalImage;
    Transitional.FlatList = src_1.TransitionalFlatList;
    Transitional.SectionList = src_1.TransitionalSectionList;
    Transitional.ScrollView = src_1.TransitionalScrollView;
    return Transitional;
}());
exports.Transitional = Transitional;
exports.default = Transitional;

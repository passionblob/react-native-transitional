"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapLayoutToAnimated = exports.mapLengthToAnimated = exports.mapColorToAnimated = exports.interpolateLayout = exports.interpolateLength = exports.interpolateColor = void 0;
var chroma_js_1 = __importDefault(require("chroma-js"));
var utils_1 = require("@monthem/utils");
var common_1 = require("./common");
var getRgbaString = function (color) {
    return "rgba(" + chroma_js_1.default(color).rgba().join(",") + ")";
};
var mapLengthToString = function (length) {
    if (typeof length === "string")
        return length;
    return length + "px";
};
var interpolateColor = function (prev, next, ratio) {
    if (prev === void 0) { prev = "rgba(255,255,255,0)"; }
    if (next === void 0) { next = "rgba(255,255,255,0)"; }
    var prevColor = getRgbaString(prev);
    var nextColor = getRgbaString(next);
    return getRgbaString(chroma_js_1.default.scale([prevColor, nextColor])(ratio).hex());
};
exports.interpolateColor = interpolateColor;
var interpolateLength = function (prev, next, ratio) {
    if (prev === void 0) { prev = 0; }
    if (next === void 0) { next = 0; }
    var start = 0, end = 0, unit = "px";
    var length1 = mapLengthToString(prev);
    var length2 = mapLengthToString(next);
    if (length1.match("%") && length2.match("%")) {
        unit = "%";
        start = Number(length1.replace(unit, "")),
            end = Number(length2.replace(unit, ""));
    }
    else if (length1.match("px") && length2.match("px")) {
        unit = "px";
        start = Number(length1.replace(unit, "")),
            end = Number(length2.replace(unit, ""));
    }
    else {
        return next;
    }
    return "" + (start + (end - start) * ratio) + unit;
};
exports.interpolateLength = interpolateLength;
var defaultLayout = { width: 0, height: 0 };
var interpolateLayout = function (prev, next, ratio) {
    if (prev === void 0) { prev = defaultLayout; }
    if (next === void 0) { next = defaultLayout; }
    return {
        width: common_1.interpolateNumber(prev.width, next.width, ratio),
        height: common_1.interpolateNumber(prev.height, next.height, ratio)
    };
};
exports.interpolateLayout = interpolateLayout;
var mapColorToAnimated = function (prev, next, animatedValue) {
    if (prev === void 0) { prev = "rgba(255,255,255,0)"; }
    if (next === void 0) { next = "rgba(255,255,255,0)"; }
    var prevColor = "rgba(" + chroma_js_1.default(prev).rgba().join(",") + ")";
    var nextColor = "rgba(" + chroma_js_1.default(next).rgba().join(",") + ")";
    return animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [prevColor, nextColor]
    });
};
exports.mapColorToAnimated = mapColorToAnimated;
var mapLengthToAnimated = function (prev, next, animatedValue) {
    if (prev === void 0) { prev = 0; }
    if (next === void 0) { next = 0; }
    var output1, output2;
    var prevLength = mapLengthToString(prev);
    var nextLength = mapLengthToString(next);
    var hasSameUnit = utils_1.anyOf([
        !!prevLength.match("%") && !!nextLength.match("%"),
        !!prevLength.match("px") && !!nextLength.match("px")
    ]);
    if (hasSameUnit) {
        output1 = prevLength, output2 = nextLength;
    }
    else {
        output1 = nextLength, output2 = nextLength;
    }
    return animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [output1, output2]
    });
};
exports.mapLengthToAnimated = mapLengthToAnimated;
var mapLayoutToAnimated = function (prev, next, animated) {
    if (prev === void 0) { prev = defaultLayout; }
    if (next === void 0) { next = defaultLayout; }
    return {
        width: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [prev.width, next.width]
        }),
        height: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [prev.height, next.height]
        }),
    };
};
exports.mapLayoutToAnimated = mapLayoutToAnimated;

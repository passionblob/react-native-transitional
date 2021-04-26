"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTransformToAnimated = exports.interpolateTransform = exports.mapMatrixToAnimated = exports.interpolateMatrix = void 0;
var utils_1 = require("@monthem/utils");
var common_1 = require("./common");
var flattenTransform = function (arr) {
    return arr.reduce(function (acc, obj) {
        Object.assign(acc, obj);
        return acc;
    }, {});
};
var spreadFlattened = function (flat) {
    return Object.keys(flat).reduce(function (acc, key) {
        var _a;
        var asserted = key;
        var mapped = (_a = {}, _a[asserted] = flat[asserted], _a);
        return acc.concat(mapped);
    }, []);
};
var interpolateRotation = function (prev, next, ratio) {
    if (prev === void 0) { prev = "0deg"; }
    if (next === void 0) { next = "0deg"; }
    var unit = "deg";
    var prevNum = Number(prev.replace(/deg|rad/, ""));
    var nextNum = Number(next.replace(/deg|rad/, ""));
    var prevDegree = prev.match(/deg/) ? prevNum : prevNum * 180 / Math.PI;
    var nextDegree = next.match(/deg/) ? nextNum : nextNum * 180 / Math.PI;
    return common_1.interpolateNumber(prevDegree, nextDegree, ratio) + unit;
};
var transformKeys = [
    "matrix",
    "perspective",
    "rotate", "rotateX", "rotateY", "rotateZ",
    "scale", "scaleX", "scaleY",
    "translateX", "translateY",
    "skewX", "skewY"
];
var defaultTransform = [
    { matrix: [1, 0, 0, 1, 0, 0] },
    { perspective: 0 },
    { rotate: "0deg" }, { rotateX: "0deg" }, { rotateY: "0deg" }, { rotateZ: "0deg" },
    { scale: 1 }, { scaleX: 1 }, { scaleY: 1 },
    { translateX: 0 }, { translateY: 0 },
    { skewX: "0deg" }, { skewY: "0deg" },
];
var defaultFlatTransform = flattenTransform(defaultTransform);
var defaultMatrix = [0, 0, 0, 0, 0, 0];
var interpolateMatrix = function (prev, next, ratio) {
    if (prev === void 0) { prev = defaultMatrix; }
    if (next === void 0) { next = defaultMatrix; }
    return defaultMatrix.map(function (_, i) { return common_1.interpolateNumber(prev[i], next[i], ratio); });
};
exports.interpolateMatrix = interpolateMatrix;
var mapRotationToAnimated = function (prev, next, animated) {
    if (prev === void 0) { prev = "0deg"; }
    if (next === void 0) { next = "0deg"; }
    var unit = "deg";
    var prevNum = Number(prev.replace(/deg|rad/, ""));
    var nextNum = Number(next.replace(/deg|rad/, ""));
    var prevDegree = prev.match(/deg/) ? prevNum : prevNum * 180 / Math.PI;
    var nextDegree = next.match(/deg/) ? nextNum : nextNum * 180 / Math.PI;
    return animated.interpolate({
        inputRange: [0, 1],
        outputRange: ["" + prevDegree + unit, "" + nextDegree + unit]
    });
};
var mapMatrixToAnimated = function (prev, next, animated) {
    if (prev === void 0) { prev = defaultMatrix; }
    if (next === void 0) { next = defaultMatrix; }
    return defaultMatrix.map(function (_, i) {
        return animated.interpolate({
            inputRange: [0, 1],
            outputRange: [prev[i], next[i]]
        });
    });
};
exports.mapMatrixToAnimated = mapMatrixToAnimated;
var degreeProperties = [
    "rotate", "rotateX", "rotateY", "rotateZ", "skewX", "skewY"
];
var numberProperties = [
    "perspective", "scale", "scaleX", "scaleY", "translateX", "translateY"
];
var transformInterpolator = __assign(__assign(__assign({}, common_1.makeRecords(degreeProperties, interpolateRotation)), common_1.makeRecords(numberProperties, common_1.interpolateNumber)), { matrix: common_1.returnNext });
var animatedTransformMappeer = __assign(__assign(__assign({}, common_1.makeRecords(degreeProperties, mapRotationToAnimated)), common_1.makeRecords(numberProperties, common_1.mapNumberToAnimated)), { matrix: common_1.returnNext });
var interpolateTransform = function (prev, next, ratio) {
    if (prev === void 0) { prev = defaultTransform; }
    if (next === void 0) { next = defaultTransform; }
    var flatPrev = __assign(__assign({}, defaultFlatTransform), flattenTransform(prev));
    var flatNext = __assign(__assign({}, defaultFlatTransform), flattenTransform(next));
    var interpolated = utils_1.keysOf(flatPrev, flatNext).reduce(function (acc, key) {
        var assertedKey = key;
        var prevValue = flatPrev[assertedKey];
        var nextValue = flatNext[assertedKey];
        //@ts-ignore
        acc[assertedKey] = transformInterpolator[assertedKey](prevValue, nextValue, ratio);
        return acc;
    }, {});
    return spreadFlattened(interpolated);
};
exports.interpolateTransform = interpolateTransform;
var mapTransformToAnimated = function (prev, next, animated) {
    if (prev === void 0) { prev = defaultTransform; }
    if (next === void 0) { next = defaultTransform; }
    var flatPrev = __assign(__assign({}, defaultFlatTransform), flattenTransform(prev));
    var flatNext = __assign(__assign({}, defaultFlatTransform), flattenTransform(next));
    var mapped = utils_1.keysOf(flatPrev, flatNext).reduce(function (acc, key) {
        var prevValue = flatPrev[key];
        var nextValue = flatNext[key];
        //@ts-ignore
        acc[key] = animatedTransformMappeer[key](prevValue, nextValue, animated);
        return acc;
    }, {});
    return spreadFlattened(mapped);
};
exports.mapTransformToAnimated = mapTransformToAnimated;

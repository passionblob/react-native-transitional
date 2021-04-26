"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnNext = exports.makeRecords = exports.mapNumberToAnimated = exports.interpolateNumber = void 0;
var interpolateNumber = function (prev, next, ratio) {
    if (prev === void 0) { prev = 0; }
    if (next === void 0) { next = 0; }
    return prev + (next - prev) * ratio;
};
exports.interpolateNumber = interpolateNumber;
var mapNumberToAnimated = function (prev, next, animated) {
    if (prev === void 0) { prev = 0; }
    if (next === void 0) { next = 0; }
    return animated.interpolate({
        inputRange: [0, 1],
        outputRange: [prev, next]
    });
};
exports.mapNumberToAnimated = mapNumberToAnimated;
var makeRecords = function (keys, value) {
    return keys.reduce(function (acc, key) {
        acc[key] = value;
        return acc;
    }, {});
};
exports.makeRecords = makeRecords;
var returnNext = function (prev, next) { return next; };
exports.returnNext = returnNext;

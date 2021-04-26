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
exports.getTransitionalStyles = exports.createStyleHolder = exports.TransitionalInterpolator = void 0;
var react_native_1 = require("react-native");
var utils_1 = require("@monthem/utils");
var common_1 = require("./common");
var style_1 = require("./style");
var transform_1 = require("./transform");
var TransitionalInterpolator = /** @class */ (function () {
    function TransitionalInterpolator(props) {
        var _this = this;
        this.getDefaultValue = function (key) {
            return _this.props.default && _this.props.default[key];
        };
        this.getInterpolatedStyle = function (prevStyle, nextStyle, ratio) {
            var getDefaultValue = _this.getDefaultValue;
            return utils_1.keysOf(prevStyle, nextStyle).reduce(function (acc, key) {
                var prevValue = prevStyle[key] || getDefaultValue(key);
                var nextValue = nextStyle[key] || getDefaultValue(key);
                acc[key] = _this.styleInterpolator[key](prevValue, nextValue, ratio);
                return acc;
            }, {});
        };
        this.getTransitionalStyle = function (prevStyle, nextStyle, anim) {
            var getDefaultValue = _this.getDefaultValue;
            return utils_1.keysOf(prevStyle, nextStyle).reduce(function (acc, key) {
                var prevValue = prevStyle[key] || getDefaultValue(key);
                var nextValue = nextStyle[key] || getDefaultValue(key);
                acc[key] = _this.animatedStyleMapper[key](prevValue, nextValue, anim);
                return acc;
            }, {});
        };
        this.props = props;
        this.styleInterpolator = __assign(__assign(__assign(__assign(__assign(__assign({}, common_1.makeRecords(props.properties.color, style_1.interpolateColor)), common_1.makeRecords(props.properties.number, common_1.interpolateNumber)), common_1.makeRecords(props.properties.length, style_1.interpolateLength)), common_1.makeRecords(props.properties.nonInterpolable, common_1.returnNext)), common_1.makeRecords(props.properties.layout, style_1.interpolateLayout)), { transform: transform_1.interpolateTransform, transformMatrix: transform_1.interpolateMatrix });
        this.animatedStyleMapper = __assign(__assign(__assign(__assign(__assign(__assign({}, common_1.makeRecords(props.properties.color, style_1.mapColorToAnimated)), common_1.makeRecords(props.properties.number, common_1.mapNumberToAnimated)), common_1.makeRecords(props.properties.length, style_1.mapLengthToAnimated)), common_1.makeRecords(props.properties.nonInterpolable, common_1.returnNext)), common_1.makeRecords(props.properties.layout, style_1.mapLayoutToAnimated)), { transform: transform_1.mapTransformToAnimated, transformMatrix: transform_1.mapMatrixToAnimated });
    }
    return TransitionalInterpolator;
}());
exports.TransitionalInterpolator = TransitionalInterpolator;
var createStyleHolder = function () { return ({
    prev: undefined,
    cur: undefined,
    next: undefined
}); };
exports.createStyleHolder = createStyleHolder;
function getTransitionalStyles(params) {
    var anim = params.anim, interpolator = params.interpolator, progress = params.progress, props = params.props, styleHolder = params.styleHolder, targets = params.targets;
    var transitionalStyles = {};
    targets.forEach(function (target) {
        var flattend = react_native_1.StyleSheet.flatten(props[target]);
        var holder = styleHolder[target];
        if (holder === undefined)
            return;
        holder.prev = holder.cur;
        holder.cur = holder.prev
            ? interpolator.getInterpolatedStyle(holder.prev, holder.next, Math.min(progress, 1))
            : flattend;
        holder.next = flattend;
        transitionalStyles[target] = interpolator.getTransitionalStyle(holder.cur, holder.next, anim);
    });
    return transitionalStyles;
}
exports.getTransitionalStyles = getTransitionalStyles;

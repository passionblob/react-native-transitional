"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionalScrollView = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var interpolator_1 = require("./interpolator");
var interpolator = new interpolator_1.TransitionalInterpolator({
    default: {
        opacity: 1,
    },
    properties: {
        color: [
            "backgroundColor", "borderColor", "borderEndColor",
            "borderLeftColor", "borderRightColor", "borderStartColor",
            "borderTopColor", "borderBottomColor", "shadowColor",
        ],
        number: [
            "borderRadius", "aspectRatio", "borderTopLeftRadius",
            "borderTopRightRadius", "borderBottomLeftRadius",
            "borderBottomRightRadius", "borderBottomWidth",
            "borderRightWidth", "borderLeftWidth", "borderTopWidth",
            "flex", "flexGrow", "flexShrink", "opacity", "rotation",
            "scaleX", "scaleY", "borderWidth", "shadowOpacity",
            "zIndex", "translateX", "translateY", "shadowRadius",
            "borderBottomEndRadius", "borderBottomStartRadius",
            "borderTopStartRadius", "borderTopEndRadius", "elevation",
        ],
        length: [
            "borderStartWidth", "borderEndWidth", "width",
            "height", "margin", "marginBottom", "marginEnd",
            "marginHorizontal", "marginLeft", "marginRight",
            "marginStart", "marginTop", "marginVertical",
            "maxHeight", "maxWidth", "minHeight", "minWidth",
            "padding", "paddingBottom", "paddingEnd", "paddingHorizontal",
            "paddingLeft", "paddingRight", "paddingStart", "paddingTop",
            "paddingVertical", "top", "left", "right", "bottom", "flexBasis"
        ],
        nonInterpolable: [
            "alignContent", "alignItems", "alignSelf", "backfaceVisibility",
            "display", "direction", "flexDirection", "flexWrap", "justifyContent", "overflow",
            "position", "borderStyle", "end", "start", "testID",
        ],
        layout: [
            "shadowOffset"
        ]
    }
});
var TransitionalScrollView = /** @class */ (function (_super) {
    __extends(TransitionalScrollView, _super);
    function TransitionalScrollView(props) {
        var _this = _super.call(this, props) || this;
        _this.anim = new react_native_1.Animated.Value(1);
        _this.styleHolder = {
            contentContainerStyle: interpolator_1.createStyleHolder(),
            contentInset: interpolator_1.createStyleHolder(),
            hitSlop: interpolator_1.createStyleHolder(),
            scrollIndicatorInsets: interpolator_1.createStyleHolder(),
            style: interpolator_1.createStyleHolder(),
        };
        _this.progress = 0;
        _this.anim.addListener(function (_a) {
            var value = _a.value;
            _this.progress = value;
        });
        return _this;
    }
    TransitionalScrollView.prototype.componentDidUpdate = function () {
        var config = this.props.config;
        this.anim.stopAnimation();
        this.anim.setValue(0);
        if ((config === null || config === void 0 ? void 0 : config.type) === "timing") {
            react_native_1.Animated.timing(this.anim, __assign({ toValue: 1, duration: 300, useNativeDriver: config.useNativeDriver || false }, config)).start(config.onTransitionEnd);
        }
        else {
            react_native_1.Animated.spring(this.anim, __assign({ toValue: 1, useNativeDriver: (config === null || config === void 0 ? void 0 : config.useNativeDriver) || false }, config)).start(config === null || config === void 0 ? void 0 : config.onTransitionEnd);
        }
    };
    TransitionalScrollView.prototype.render = function () {
        var _a = this.props, children = _a.children, _props = __rest(_a, ["children"]);
        var transitionalStyles = interpolator_1.getTransitionalStyles({
            anim: this.anim,
            interpolator: interpolator,
            progress: this.progress,
            props: this.props,
            styleHolder: this.styleHolder,
            targets: [
                "style",
                "hitSlop",
                "contentContainerStyle",
                "contentInset",
                "scrollIndicatorInsets",
            ]
        });
        return react_1.default.createElement(react_native_1.Animated.ScrollView, __assign(__assign({}, _props), transitionalStyles), children);
    };
    return TransitionalScrollView;
}(react_1.Component));
exports.TransitionalScrollView = TransitionalScrollView;
exports.default = TransitionalScrollView;

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
var react_1 = require("react");
var classnames_1 = require("classnames");
//TODO: loading	设置按钮载入状态
//TODO: icon	设置按钮的图标组件
//TODO: 单元测试
exports.Button = function (props) {
    var _a;
    var children = props.children, className = props.className, btnType = props.btnType, size = props.size, disabled = props.disabled, href = props.href, block = props.block, restProps = __rest(props, ["children", "className", "btnType", "size", "disabled", "href", "block"]);
    var classes = classnames_1.default('btn', className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        _a['disabled'] = (btnType === 'link') && disabled,
        _a['btn-block'] = block,
        _a));
    if (btnType === 'link' && href) {
        return (react_1.default.createElement("a", __assign({ className: classes, href: href }, restProps), children));
    }
    else {
        return (react_1.default.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
    }
};
exports.Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};
exports.default = exports.Button;

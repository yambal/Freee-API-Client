"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeToTimeClockType = void 0;
const typeToLabel = (type) => {
    switch (type) {
        case 'clock_in':
            return '出勤';
        case 'break_begin':
            return '休憩開始';
        case 'break_end':
            return '休憩終了';
        case 'clock_out':
            return '退勤';
        default:
            return undefined;
    }
};
const typeToTimeClockType = (type) => {
    const label = typeToLabel(type);
    if (label) {
        return {
            type,
            label
        };
    }
    return undefined;
};
exports.typeToTimeClockType = typeToTimeClockType;

'use strict';

module.exports = {
    entry: {
        excelToMark: ['./static/public/js/excelToMark.ts'],
        vendor: ['jquery', 'axios', '@reactivex/rxjs'],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
};
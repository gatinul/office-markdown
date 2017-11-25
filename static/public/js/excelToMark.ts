
import * as axios from 'axios';
var  Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';

const blockXs:string = '\n\n\n';
const blockMd:string = '\n\n\n\n\n\n\n'

const mark:JQuery<HTMLElement> = $('.markdown-textarea');

const init = Rx.Observable.create(observer => {
    mark.text(
        '## 接口名称' + blockXs +
        '## 接口描述' + blockXs +
        '## 请求报文' + blockMd +
        '## 返回报文' + blockMd
    )
})
init.subscribe();
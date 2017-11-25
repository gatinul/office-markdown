import * as axios from 'axios';
var  Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';
import { checkType } from './lib';

const blockXs:string = '\n\n\n';
const blockMd:string = '\n\n\n\n\n\n\n'
let type:string = '';

const mark:JQuery<HTMLElement> = $('.markdown-textarea');
const btnGroup:JQuery<HTMLElement> = $('#buttonGroup');
const typeBtn:JQuery<HTMLElement> = $('#buttonGroup button');
const original:JQuery<HTMLElement> = $('#original');
const translation:JQuery<HTMLElement> = $('#translation');

const init = Rx.Observable.create(observer => {
    mark.text(
        '## 接口名称' + blockXs +
        '## 接口描述' + blockXs +
        '## 请求报文' + blockMd +
        '## 返回报文' + blockMd
    )
})
const typeEvent = Rx.Observable.fromEvent(typeBtn, 'click');
const upload = Rx.Observable.fromEvent('#upload', 'click');

const typeResolve = typeEvent
    .map(e => $(e.currentTarget).text().trim())
    .filter(r => type = r)
    .map(checkType)
    .do((ele: HTMLLIElement) => {
        console.warn(type);
        btnGroup.addClass('animated fadeOutUp');
        btnGroup.remove();
        original.append(ele);
        original.css('display','block');
        original.addClass('animated fadeInUp');
    })
// const analysis = upload
//     .map(() => type)
//     .fromPromise()
const app = init.merge(typeResolve);
app.subscribe();

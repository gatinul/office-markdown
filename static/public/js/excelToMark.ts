var  Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';
import { checkType, renderBtn, upload, parse, exchange } from './lib';
import api from './api';


const blockXs:string = '\n\n';
const blockMd:string = '\n\n\n\n\n\n\n'
let type:string = '';
let content: Array<any> = []
let map = new Map()

const mark:JQuery<HTMLElement> = $('.markdown-textarea');
const btnGroup:JQuery<HTMLElement> = $('#buttonGroup');
const typeBtn:JQuery<HTMLElement> = $('#buttonGroup button');
const original:JQuery<HTMLElement> = $('#original');
const translation:JQuery<HTMLElement> = $('#translation');
const textarea:JQuery<HTMLElement> = $('.markdown-textarea');

const init = Rx.Observable.create(observer => {
    mark.text(
        '## 接口信息' + blockXs +
        '## 请求报文' + blockXs +
        '## 返回报文' + blockXs +
        '## 数据字典' + blockXs 
    )
})
const typeEvent = Rx.Observable.fromEvent(typeBtn, 'click');
const preview = Rx.Observable.fromEvent($('#preview'), 'click')
    .do(()=>{
        $('#markdown-field').empty()
        $('#markdown-field').append(exchange(textarea.val().toString()))
        // console.log(textarea.val())
    })

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
const app = init.merge(typeResolve)
    .mergeMap(() => {
        return Rx.Observable.fromEvent($('#upload'), 'click')
        .do(()=>{
            $('#uploadBtn').click()
        })
    })
    .mergeMap(() => {
        return Rx.Observable.fromEvent(document.getElementById('uploadBtn'), 'change')
        .map((e)=>(e.target).files[0])
        .map(v => {
            const formData = new FormData();
            formData.append('file', v)
            return formData
        })
        .map(upload)
        .do(r => {
            r.then(d=>{
                console.log(d)
                // content = []
                // for(let item of d){
                //     content.push(item.name)
                //     map.set(item.name, item.data)
                // }
                // original.empty();
                // original.append(renderBtn(content))
                // const sheet = $('#original').find('.sheetList')
                // const sheet$ =  Rx.Observable.fromEvent(sheet, 'click')
                // .do((e)=>{
                //     const name = $(e.target).text()
                //     const html = parse(name, map.get(name));
                //     $('.parseText').text(html);
                //     translation.css('display','block');
                //     translation.addClass('animated fadeInUp');
                // })
                // sheet$.subscribe()
            })
        })
    }).merge(preview)
app.subscribe();

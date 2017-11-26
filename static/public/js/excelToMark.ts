var  Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';
import { checkType, renderBtn } from './lib';
import api from './api';

const blockXs:string = '\n\n\n';
const blockMd:string = '\n\n\n\n\n\n\n'
let type:string = '';
let content: Array<any> = []
let map = new Map()

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
        .do((r) => {
            const formData = new FormData();
            formData.append('file', r)
            api.upload(formData).then(res => {
                content = []
                if(res.success){
                    for(let item of res.data){
                        content.push(item.name)
                        map.set(item.name, item.data)
                    }
                    console.log(content)
                    original.empty();
                    original.append(renderBtn(content))
                }
            })
        })
    })
app.subscribe();

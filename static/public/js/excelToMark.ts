var  Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';
import { checkType, renderBtn, upload, parse, exchange } from './lib';
import api from './api';
var highlight = require('highlight.js');
var parseRule = require('./config').parseRule

const blockXs:string = '\n\n';
const blockMd:string = '\n\n\n\n\n\n\n'
let type:string = '';
let content: Array<any> = []
let map = new Map();
let excelHtml = '';

const mark:JQuery<HTMLElement> = $('.markdown-textarea');
const btnGroup:JQuery<HTMLElement> = $('#buttonGroup');
const typeBtn:JQuery<HTMLElement> = $('#buttonGroup button');
const original:JQuery<HTMLElement> = $('#original');
const translation:JQuery<HTMLElement> = $('#translation');
const textarea:JQuery<HTMLElement> = $('.markdown-textarea');
const hideDiv:JQuery<HTMLElement> = $('#hide');

const init = Rx.Observable.create(observer => {
    mark.text(
        '#### 接口信息' + blockXs +
        '#### 请求报文' + blockXs +
        '#### 返回报文' + blockXs +
        '#### 数据字典' + blockXs 
    )
})
const typeEvent = Rx.Observable.fromEvent(typeBtn, 'click');
const preview = Rx.Observable.fromEvent($('#preview'), 'click')
    .do(()=>{
        if($('#markdown-field').hasClass('preview')){
            $('.markdown-preview').empty()
            textarea.css('display', 'block')
            $('#markdown-field').removeClass('preview')
            $('#save').css('display', 'none')
        }else {
            textarea.css('display', 'none')
            $('.markdown-preview').append(exchange(textarea.val().toString()))
            $('#markdown-field').addClass('preview')
            $('#save').css('display', 'block')
        }
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
                if(d.type == 'excel'){
                    content = []
                    for(let item of d.data){
                        content.push(item.name)
                        map.set(item.name, item.data)
                    }
                    original.empty();
                    original.append(renderBtn(content))
                    const sheet = $('#original').find('.sheetList')
                    const sheet$ =  Rx.Observable.fromEvent(sheet, 'click')
                    .do((e)=>{
                        resolveExcelBysheet(e);
                    })
                    const quick = $('#original').find('#quick')
                    const quick$ = Rx.Observable.fromEvent(quick, 'click')
                    .do((e)=>{
                        resolveExcelQuick(e);
                    })
                    sheet$.merge(quick$).subscribe()
                }else{
                    resolveDocx(d)
                }
            })
        })
    }).merge(preview)
app.subscribe();



/**
 * 单个excel表处理
 * @param  {} e
 */
function resolveExcelBysheet(e) {
    const name = $(e.target).text()
    const html = parse(name, map.get(name));
    $('.parseText').text(html);
    translation.css('display','block');
    translation.addClass('animated fadeInUp');
}
/**
 * 一键处理excel生成md文件格式
 * @param  {} e
 */
function resolveExcelQuick(e){
    excelHtml = '';
    $('.sheetList a').each(function(){
        console.log($(this).text())
        const name = $(this).text()
        const html = parse(name, map.get(name));
        excelHtml += '#### '+ name + '\n' + html
    })
    textarea.val(excelHtml)
}
/**
 * 处理docx 主要处理代码块
 * @param  {} d
 */
function resolveDocx(d){
    textarea.css('display', 'none')
    $('.markdown-preview').html(d.data)
    $('.markdown-preview h5').each(function(){
        hideDiv.empty()
        const text = $(this).text();
        if(parseRule.code.indexOf(text)>-1){
            code($(this));
            const result = hideDiv.html()
            $(this).after(`<pre>${result}</pre>`)
        }
    });
    $('.removeP').remove();
    $('.markdown').find('h2').html(`<button class="ui primary button" id="save">保存 </button>`)
    $('.markdown').removeClass('piled')
    $('#save').css('display', 'block')
}

/**
 * docx处理 将指定文本放入<pre>中
 * @param  {} e
 */
function code(e) {
    if(e.next().prop('tagName') == 'P'){
        // 直接append会把原元素删除
        hideDiv.append(e.next().clone())
        e.next().addClass('removeP')
        code(e.next())
    }
}
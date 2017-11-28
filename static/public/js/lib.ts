var  Rx = require('@reactivex/rxjs');
import * as $ from 'jquery';
import api from './api';

const br:string = '\n';
let start = 0;
let content = [];
let multi = false;
/**
 * 根据上传文本方式，返回不同ui
 * @param  {string} type
 */
export const checkType = (type: string) => {
    const result = <HTMLLIElement>document.createElement('DIV')
    let innerHTML;
    if(type == 'Excel'){
        innerHTML = `
        <div class="ui icon message upload">
            <form method="POST" action="/upload" id="uploadForm" enctype="multipart/form-data">
                <input type="file" id="uploadBtn" style="display:none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
            </form>
            <i class="cloud upload icon" id="upload"></i>
            <div class="content">
                <div class="header">上传${type}文件
                </div>
                <p id="uploadDesc">点击左侧图标上传，只支持.xlsx的excel文件哦~</p>
            </div>
        </div>
        `
    }else if (type == 'Word'){
        innerHTML = `
        <div class="ui icon message upload">
            <input type="file" id="uploadBtn" style="display:none">
            <i class="cloud upload icon" id="upload"></i>
            <div class="content">
                <div class="header">上传${type}文件
                </div>
                <p id="uploadDesc">点击左侧图标上传，支持.doc/.docx文件~</p>
            </div>
        </div>
        `
    }
    result.innerHTML = innerHTML
    return result
}
export const renderBtn = (content:string[]) => {
    const result = <HTMLLIElement>document.createElement('DIV')
    let innerHTML=`<div class="content">
        <div class="header">工作表列表</div>
        <div class="meta">
        <span>点击解析工作表</span>  
        </div>
        <div class="ui middle aligned selection list sheetBtn">`;
    for(var i=0;i<content.length;i++){
        innerHTML += `<div class="item sheetList">
            <div class="content">
            <div class="header"><a>${content[i]}</a></div>
            </div>
        </div>`
    }
    innerHTML += `</div></div>`
    result.innerHTML = innerHTML
    result.className = 'ui card animated fadeInUp'
    return result;
}
/**
 * 上传api
 * @param  {} formData
 */
export const upload = (formData) => {
    return new Promise(function (resolve, reject){
        api.upload(formData).then(r=>{
            if(r.success){
              resolve(r.data)
            }else{
                resolve(r.message)
            }
        })
    })
}
export const parse = (name:string, data:Array<any>) => {
    reset()
    for(let i=0;i<data.length;i++){
        if(data[i].length == 1 && (data[i][0].substring(0,4)).toUpperCase() == 'LNOP'){
            multi =  true;
            const arr = data.slice(start, i)
            content.push(arr)
            start = i
        }
    }
    let result;
    content.push(data.slice(start))
    multi?result=parseMultiTable(content):result=parseTable(data)
    console.log(result);
    return result;
}

function parseTable(data) {
    let html = '';
    if(data){
        for (let item of data[0]){
            if(!item || item == 'null' || item == null) {
                item = ''
            }
            html += '|'+ item
        }
        html += br
        for (let i=0;i<data[0].length;i++){
            html += '|--'
        }
        html += br
        for (let i=1;i<data.length;i++){
            for (let item of data[i]){
                if(!item || item == 'null' || item == null) {
                    item = ''
                }
                html += '|'+ item
            }
            html += br
        }
    }
    return html;
}
function parseMultiTable(data) {
    let html = '';
    for( let i = 1; i < data.length; i++ ){
        html += '### ' + data[i][0]
        html += br
        html += parseTable(data[i].slice(1))
    }
    console.info(html)
    return html;
}

function reset(){
    start = 0;
    content = [];
    multi = false;
}
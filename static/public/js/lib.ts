/**
 * 根据上传文本方式，返回不同ui
 * @param  {string} type
 */
export const checkType = (type: string) => {
    console.log(1)
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
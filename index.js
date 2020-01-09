const tinify = require('tinify')
const clc = require("cli-color");
const fs = require('fs')
let sourceDir = './source/'
let outputDir= './output/'
let compressList = []
let uncompressList = []
let reg= /\.(png|jpe?g)(\?.*)?$/
tinify.key = 'r31JtJ7c9KFV7S718RVxpsF1v5W6CB96'
let readData = fs.readdirSync(sourceDir)
readData.forEach((item)=>{
    if(reg.test(item)){
        compressList.push(item)
    }else{
        uncompressList.push(item)
    }
})
clearDir(outputDir)
console.log(clc.red('不可压缩的图片列表(只能压缩jpeg/png格式得图片)'))
console.log('==============================================')
console.log(uncompressList.length ? clc.red(uncompressList):'暂无')
console.log('==============================================')
compressList.forEach((item)=>{
    compressFn(sourceDir+item,item)
})
/**
 * @description: 压缩图片
 * @param {type} 
 * @return: 
 */
function compressFn(list,name){
    const source = tinify.fromFile(list);
    source.toFile(`${outputDir}${name}`,function(res){
        console.log(clc.greenBright(`${name} 压缩完成`))
    });
}
/**
 * @description: 清除之前得缓存图片
 * @param {type} 
 * @return: 
 */
function clearDir(dir){
    fs.readdirSync(dir).map((file) => {
        fs.unlink(`${dir}${file}`,(err) => {
          if (err) {
            console.log(err);
          }
        });
      });
}


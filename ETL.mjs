//Evitar usar o .pipe para evitar vazamento de dados/memória!
import { stdout } from 'process'
import {Readable,Writable,Transform,pipeline} from 'stream'
import {promisify} from 'util'
import {createWriteStream} from 'fs'

const _asyncPipeline = promisify(pipeline) // pipeline assincrono

class WareHouse{

    constructor(filename = 'bigFile'){
        this.inputStream = new Readable({
            read:function () {
                for(let id=0;id<1e4;id++){
                    const dataObj = {id:Date.now()+id,index:id}
                    this.push(JSON.stringify(dataObj)) //manda o json para a callstack do javascript
                }
                this.push(null)
            }
        })
        this.transformStreamToCSV = new Transform({
            transform: function (chunk,encoding,callB){
                const dataObj = JSON.parse(chunk)
                const toCsvData = `${dataObj.id},${dataObj.index}\n`

                callB(null,toCsvData)
            }
        })
        this.outputStream = createWriteStream(`${filename}.csv`)
    }
    
    inputStream = Readable
    transformStreamToCSV = Transform
    outputStream = Writable

    runPipeline = async() => await _asyncPipeline(this.inputStream,
                                                this.transformStreamToCSV,
                                                this.outputStream)
}

const wareHouse = new WareHouse();
await wareHouse.runPipeline()





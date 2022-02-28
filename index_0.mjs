import {stdin,stdout} from 'process'


stdin
    .on('data',(data)=>console.log(`stdin: ${data.toString()}data`))

stdout
    .on('data',(data) => console.log(`stdout: ${data.toString()}`))

stdin.pipe(stdout)

import http from 'http'
import {createReadStream, readFileSync} from 'fs' 

http.createServer((req,res)=>{
    // const file = readFileSync('some.file')
    // res.write(file)
    // res.end() do not send chunk with .write Method!
    
    // to create 1g (almost) file, run this on terminal:
    //  node -e "process.stdout.write(crypto.randomBytes(1e9))" > some.file
    
    createReadStream('some.file').pipe(res) //"good" practise
}).listen(8000,()=>console.log('Listening on http://localhost:8000')) //curl http:localhost:8000 para baixar o arquivo 'some.file'

import net from 'net'

net.createServer((socket)=> socket.pipe(stdout)).listen(8001,()=> console.log('Ws server listening on por 8001')) 

const http = require('http')
const requests = require("requests")
const fs = require("fs")
const path=require("path")
const home = fs.readFileSync(path.join( __dirname,"index.html"),"utf-8")

// let city='Mountain View'
// let key='27b1adc64cce2e0456cc54782c582609'

const replacedvalue =(tempval,orval)=>{
    let temperature=tempval.replace("{%temp%}",orval.main.temp)
     temperature=temperature.replace("{%location%}",orval.name)
     temperature=temperature.replace("{%humidity%}",orval.main.humidity)
    return temperature
    }

const server = http.createServer((req, res) => {
    let x = ""
    if (req.url == '/') {
        requests(
            " http://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=27b1adc64cce2e0456cc54782c582609"
        )
            .on("data", (data) => {
                // x += data.toString()
                const newData=JSON.parse(data)
                const arrData = [newData]
                
                // console.log(arrData)
                // console.log(arrData[0].main.temp)

                const test = arrData
                .map((val)=>replacedvalue(home,val))
                .join("")
                    // console.log(val.main)
                res.write(test)
            })
            .on("end", () => {
              res.end()
            })
    }

}).listen(8071)





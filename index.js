const express = require('express')
const scrape = require('aliexpress-product-scraper');
var cors = require('cors')
const app = express()

app.use(cors())
let port = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send('add any ali products id to the route')
})
app.get('/:productId',async (req, res)=> {
    await getAliProduct(req.params.productId).then(response=>res.send(
        response
    )).catch(error=>res.send(null))   
  })

const getAliProduct =async (productId)=>{
    console.log('your network is very slow')
    try{
        const product = await scrape(productId);
        if (product){
            console.log(product)
        }else{
            console.log("couldn't scrape product information because of slow network")
        }
        
        return product
      
    }catch(error){
        console.log(error)
    }  
}
app.listen(port,()=>{
    console.log(`app is listening on the port ${port}`)
})

// getAliProduct('1005001342973753')


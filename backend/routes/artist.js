var artisController = require('../controllers/artists')

module.exports = function(app){

    app.get('/', function (req, res) {
        res.send('Hello API')
    })
    
    app.get('/artists', artisController.all)
    
    app.get('/artists/:id', artisController.findById)
    
    app.post('/artists', artisController.create)
    
    app.put('/artists/:id', artisController.update)
    
    app.delete('/artists/:id', artisController.delete)

}
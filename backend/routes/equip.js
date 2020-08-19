var equipController = require('../controllers/equip')

module.exports = function(app){
    app.get('/equip', equipController.all)
    
    app.get('/equip/:id', equipController.findById)
    
    app.post('/equip', equipController.create)
    
    app.put('/equip/:id', equipController.update)
    
    app.delete('/equip/:id', equipController.delete)

    app.post('/setequip/:id/:userId', equipController.setEquip)

}
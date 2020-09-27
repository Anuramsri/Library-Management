/**
 * Revision number:
 * ******************
 * Rev.01 : 27-09-2020     @Author: Anuram (anuram.ar480@gmail.com)
 *     
 * 
 */

const userController = require('../controller/userController');

/*
 * Defines the routes of the expressApplication
 */
async function router(expressApp) {

    console.log("Router called");


     /*
     * REST for User table
     */
    expressApp.post('/users', userController.addUser);
    expressApp.get('/users', userController.getAllUser);
    expressApp.put('/users/:id', userController.updateUser);
    expressApp.delete('/users/:id', userController.deleteUser)

}


/*
 * export to others
 */
exports.router = router;
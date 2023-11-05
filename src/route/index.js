const app = require("../app")
const userController = require("../controllers/user.controller")
const requestController = require("../controllers/requests.controller")
const validateJwt = require("../middlewares/validateJwt")
module.exports = (app) => {
    //Rutas User
    app.post("/createUser",userController.create)
    app.post("/login", userController.userLogin)
    app.post("/recover", userController.recoverPassword)

    // request

    app.post("/createRequest/:id",validateJwt.verifyToken, validateJwt.verifyAccountOwner ,requestController.createRequests)
    app.put("/editRequest/:id",validateJwt.verifyToken ,requestController.editRequest)
    app.delete("/deleteRequest/:id",validateJwt.verifyToken ,requestController.deleteRequest)
    app.get("/sendRequest/:id",validateJwt.verifyToken ,requestController.sendRequest)
}
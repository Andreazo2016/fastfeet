import {Router} from 'express'

const routes = new Router()
import SessionController from './app/controllers/SessionController'

routes.get('/', (req, res) => {
    return res.json({ok:true})
})


routes.post('/sessions', SessionController.store)

export default routes
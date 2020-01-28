import User from './../models/User'
import * as Yup from 'yup'
import jsonwebToken from 'jsonwebtoken'
import jwtConfig from '../../config/jwt'

class SessionController {

    async store(req, res) {

        /**Criando validação */
        const Schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })
        /**Checando as validações */
        if(!(await Schema.isValid(req.body))){
            return res.status(400)
            .json({error:'Validation fails'})
        }

        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if(!user){
            return res.status(400).json({error:'User not found'})
        }

        if(!( await user.checkPassword(password))){
            return res.status(401).json({error:'Password not match!!!'})
        }

        const { id, name } = user

        return res.json({
            id,
            name,
            email,
            token:jsonwebToken.sign({id},jwtConfig.secretkey,{
                expiresIn:jwtConfig.expireAt
            })
        })


    }
}


export default new SessionController()
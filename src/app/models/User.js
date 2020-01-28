import Sequelize, {Model} from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model{
    static init(sequelize){
        super.init({
            email:Sequelize.STRING,
            password:Sequelize.STRING
        },
        {
            sequelize
        })
        
        return this
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password)
    }

} 

export default User
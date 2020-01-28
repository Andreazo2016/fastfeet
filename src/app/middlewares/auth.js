export default (req,res,next)=>{
    const authHeader = req.headers.authentication

    if(!authHeader){
        return res.status(400).json({error:'Token not provided'})
    }
    const [,token] = authHeader.split(' ')

    
}
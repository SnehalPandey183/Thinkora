import redis from "../../Shared/redis/redis.js"

const protect = async (req,res,next) =>{
    try {
        const sessionId=req.cookies?.session
        if(!sessionId){
            return res.status(400).json({message:"user not found"})
        }

        const session = await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(400).json({message:"session expired"})
        }
        req.user=JSON.parse(session)
        next()

    } catch (error) {
        return res.status(500).json({message:`protect error ${error}`})
    }
}


export default protect
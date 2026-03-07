// There are two ways (async/await,promises)

// wrapper function

// try catch approach
/*
const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
        
    }
} */

// promises approach

const asyncHandler = (requestHandler) =>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export default asyncHandler
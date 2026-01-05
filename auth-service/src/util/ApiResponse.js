function ApiResponse(statusCode=200,message,data) {
    return{
        success:true,
        statusCode,
        message,
        data,
        timestamp:new Date()
    }
    
}
export {ApiResponse}

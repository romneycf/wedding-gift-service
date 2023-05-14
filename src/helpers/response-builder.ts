export class ResponseBuilder {
    public static response(statusCode: number, body?: any) {
        let response:any = {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        }
        if(body){
            response.body = JSON.stringify(body);
        }
        
        return response
    }
}
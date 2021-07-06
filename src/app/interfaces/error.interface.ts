

export class ErrorInternal {
    Message?: string  
}

export class ErrorAPI extends ErrorInternal {
    statusCode?: number;
}
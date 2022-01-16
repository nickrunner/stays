export class Error400 extends Error {
    readonly statusCode = 400;
    message = "Bad Request";
    constructor(message?: string){
        super(message);
        this.message = message || this.message;
    }
}

export class Error401 extends Error {
    readonly statusCode = 401;
    message = "Not Authorized";
    constructor(message?: string){
        super(message);
        this.message = message || this.message;
    }
}

export class Error404 extends Error {
    statusCode = 404;
    message = "Resource not found";
    constructor(message?: string){
        super(message);
        this.message = message || this.message;
    }
}

export class Error409 extends Error {
    readonly statusCode = 409;
    message = "Conflict";
    constructor(message?: string){
        super(message);
        this.message = message || this.message;
    }
}


export class Error500 extends Error {
    readonly statusCode = 500;
    message = "Internal Server Error";
    constructor(message?: string){
        super(message);
        this.message = message || this.message;
    }
}

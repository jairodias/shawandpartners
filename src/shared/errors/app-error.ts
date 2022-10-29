interface Request {
    error?: Error
    statusCode?: number
    message?: string
}
export class AppError {
    public readonly message: string
    public readonly statusCode: number
    public readonly stack: string

    constructor({
        error,
        statusCode,
        message
    }: Request) {
        this.message = message ? message : error.message
        this.statusCode = statusCode ? statusCode : 400

        this.stack = process.env.DEBUG && error ? error.stack : null
    }
}
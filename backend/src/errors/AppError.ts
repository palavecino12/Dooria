export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 400) {
        super(message); //Le pasa el mensaje a la clase Error.
        this.statusCode = statusCode;
        this.name = "AppError";

        //Para que instanceof AppError funcione bien.
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
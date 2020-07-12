export default interface IValidator<T>{
    validate(data:T):Promise<T>;
}
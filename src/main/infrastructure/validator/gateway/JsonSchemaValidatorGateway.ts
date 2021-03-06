import {ValidatorResponse} from "@core/validator";
import {IValidationErrorParser} from "@core/validator";
import {TYPE} from '@core/di'
import { injectable, inject } from "@core/di";
import {ValidatorError} from "@core/errors";
import { ERROR_TYPE } from "@core/errors";
import {IValidatorGateway} from "@core/validator";
import {validate} from 'jsonschema';


@injectable()
export default class JsonSchemaValidatorGateway<T> implements IValidatorGateway<any>{
    errorGenerator : IValidationErrorParser;
    constructor(
                @inject(TYPE.VALIDATOR.ERROR_PARSER) errorGenerator : IValidationErrorParser
                ){
        this.errorGenerator = errorGenerator
    }
    async validateData<T>(data: T, schema : any): Promise<T> {
        let errors : ValidatorError[] = [];
        let result = validate(data,schema);
        if(result.valid){
            return result.instance
        }
        else{
            errors = this.errorGenerator.generate(result.errors);
            let response   = new ValidatorResponse(ERROR_TYPE.VALIDATION_ERROR,errors);
            throw response;
        }
        
        
    }
}
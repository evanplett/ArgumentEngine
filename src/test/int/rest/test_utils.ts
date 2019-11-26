import {
  ModelArgument
} from "../../../business_model_typeorm/entity/Argument"


export class ArgumentParams {

  conclusion: string;
  premises: string [];
  reasoningMethod: string;

  constructor(conclusion: string, premises: string[], reasoningMethod: string) {
    this.conclusion = conclusion;
    this.premises = premises;
    this.reasoningMethod = reasoningMethod;
  }
}


export class TestUtils {

  // Returns an array of strings that describe the differences
  static DoesArgumentMatch(conclusion: string, premises: string[], reasoning_method: string, argument: ModelArgument): string [] {

    let errors: string [] = [];

    if (argument.conclusion.text != conclusion) {
      let error: string = "Conclusion: Exp '" + conclusion + "' != Act '" + argument.conclusion.text + "'";
      errors.push(error);
    }

    if (argument.reasoning_method != reasoning_method) {
      let error: string = "ReasoningMethod: Exp '" + conclusion + "' != Act '" + argument.conclusion.text + "'";
      errors.push(error);
    }

    if (!(premises.length === argument.premises.length && argument.premises.sort().every(function(value, index) {
      return premises.some(x => x === value.text)}))) {
      let error: string = "Premises: Exp '" + premises + "' != Act '" + argument.premises + "'";
      errors.push(error);
    }

    return errors;
  }

  static DoesArgumentMatchArgElements(argElements: ArgumentParams, argument: object): string [] {
    return DoesArgumentMatch(argElements.conclusiom, argElements.premises, argElements.reasoning_method, argument);
  }



}
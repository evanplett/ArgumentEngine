export class TestUtils {

  // Returns an array of strings that describe the differences
  static DoesArgumentMatch(conclusion: string, premises: string[], reasoningMethod: string, argument: object): string [] {

    let errors: string [] = [];

    if (argument.conclusion.text != conclusion) {
      let error: string = "Conclusion: Exp '" + conclusion + "' != Act '" + argument.conclusion.text + "'";
      errors.push(error);
    }

    if (argument.conclusion.reasoningMethod != reasoningMethod) {
      let error: string = "ReasoningMethod: Exp '" + conclusion + "' != Act '" + argument.conclusion.text + "'";
      errors.push(error);
    }

    if (!(premises.length === argument.premises.length && argument.premises.sort().every(function(value, index) {
      return premises.contains(value.text)}))) {
      let error: string = "Premises: Exp '" + premises + "' != Act '" + argument.premises + "'";
      errors.push(error);
    }

    return errors;
  }
}
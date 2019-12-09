import {
  ArgumentController
} from '../business_model_typeorm/controller/ArgumentController';
import {
  ModelArgument,
  ReasoningMethod,
  ArgumentTreeNode
} from '../business_model_typeorm/entity/Argument';
import {
  FacadeStatement
} from './statement_facade';
import {
  ModelStatement
} from '../business_model_typeorm/entity/Statement';

import {
  Error
} from '../Error'

export class FacadeArgument {
  static readonly DEFAULT_LIMIT: number = 100;
  static readonly DEFAULT_AFTER_ID: number = 0;
  static readonly DEFAULT_MAX_DEPTH: number = 6;

  private ac: ArgumentController = new ArgumentController();
  private fs: FacadeStatement;

  constructor(facadeStatement?: FacadeStatement) {
    this.fs = facadeStatement ? facadeStatement: new FacadeStatement(this);
  }

  // *********** CREATE ********** //
  createOne(
    conclusion: string | number,
    reasoning_method: string,
    premises: (string | number)[]
  ): Promise < ModelArgument > {
    console.debug('Façade::Argument::createOne(conclusion: %s | reasoning_method: %s | premises: %o)', conclusion, reasoning_method, premises);
    let conclusionStatement: Promise < ModelStatement > =
    typeof conclusion === 'string' ? this.fs.createOne(conclusion): this.fs.getOne(conclusion);

    let premisStatements: Promise < ModelStatement[] > = Promise.all(
      premises.map(async (premis) => {
        return typeof premis === 'string' ? this.fs.createOne(premis): this.fs.getOne(premis);
      })
    );

    let methodOfReasoning: Promise < ReasoningMethod > = ModelArgument.stringToReasoningMethod(reasoning_method);

    return Promise.all([conclusionStatement, premisStatements, methodOfReasoning])
    .then(([conclusionValue, premisValues, reasoningMethodValue]) => {
      return this.ac.createOne(conclusionValue, reasoningMethodValue, premisValues);
    })
    .catch((error) => {
      return Promise.reject(new Error(400, `Unable to create Argument: ${error}`));
    });
  }

  // *********** READ ********** //
  getList(limit?: number, after_id?: number): Promise < ModelArgument[] > {
    console.debug('Façade::Argument::getList');
    limit = limit && limit > 0 ? limit: FacadeArgument.DEFAULT_LIMIT;
    after_id = after_id && after_id >= 0 ? after_id: FacadeArgument.DEFAULT_AFTER_ID;

    return this.ac.many(after_id, limit)
    .then(list => {
      if (list.length > 0) {
        return Promise.resolve(list);
      } else {
        return Promise.reject(new Error(400, `No Arguments after id ${after_id} found`));
      }
    });
  }

  getOne(id: number): Promise < ModelArgument > {
    console.debug('Façade::Argument::getOne');
    return this.ac.one(id)
    .catch(error => {
      return Promise.reject(new Error(400, `No Argument with id ${id} found`));
    });
  }

  getTree(id: number,
    max_depth?: number): Promise < ArgumentTreeNode > {
    console.debug('Façade::Argument::getTree');
    max_depth = max_depth && max_depth > 0 ? max_depth: FacadeArgument.DEFAULT_MAX_DEPTH;

    return this.getTreeNode(id,
      max_depth);
  }

  getTreeNode(id: number,
    max_depth: number,
    current_depth: number = 0): Promise < ArgumentTreeNode > {
    console.debug('Façade::Argument::getTreeNode');
    return this.getOne(id)
    .then(argument => {
      if (current_depth >= max_depth) {
        return {
          argument_id: argument.id,
          premises: [],
          reasoning_method: argument.reasoning_method
        }
      } else {
        return Promise.all(
          argument.premises.map(statement =>
            this.fs.getTreeNode(statement.id, max_depth, current_depth + 1)))
        .then(children => {
          return {
            argument_id: argument.id,
            premises: children,
            reasoning_method: argument.reasoning_method
          }
        });
      }
    });

    /*
                let arg = await this.getOne(id);

                let children =
                    current_depth > max_depth
                        ? []
                        : await Promise.all(
                            arg.premises.map(async (statement) =>
                                this.fs.getTreeNode(statement.id, max_depth, current_depth + 1)
                            )
                        );

                return {
                    argument_id: arg.id,
                    premises: children,
                    reasoning_method: arg.reasoningMethod
                };*/
  }
}
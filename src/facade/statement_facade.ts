import { StatementController } from '../business_model_typeorm/controller/StatementController';
import { ModelStatement, StatementTreeNode } from '../business_model_typeorm/entity/Statement';
import { FacadeArgument } from './argument_facade';
import { ArgumentTreeNode } from '../business_model_typeorm/entity/Argument';

export class FacadeStatement {
    static readonly DEFAULT_LIMIT: number = 100;
    static readonly DEFAULT_AFTER_ID: number = 0;
    static readonly DEFAULT_MAX_DEPTH: number = 6;

    private sc = new StatementController();
    private fa: FacadeArgument;

    constructor(facadeArgument?: FacadeArgument) {
        this.fa = facadeArgument ? facadeArgument : new FacadeArgument(this);
    }

    // *********** CREATE ********** //
    createOne(text: string): Promise<ModelStatement> {
        return this.sc.createOne(text);
/*
        if (created !== undefined) {
            return Promise.resolve(created);
        } else {
            return Promise.reject(`Unable to create statement with text '${text}'`);
        }*/
    }

    // *********** READ ********** //
    getList(limit?: number, after_id?: number): Promise<ModelStatement[]> {
        limit = limit && limit > 0 ? limit : FacadeStatement.DEFAULT_LIMIT;
        after_id = after_id && after_id >= 0 ? after_id : FacadeStatement.DEFAULT_AFTER_ID;

        return this.sc.many(after_id, limit);
/*
        if (many.length > 0) {
            return Promise.resolve(many);
        } else {
            return Promise.reject(`No Statements after id ${after_id} found`);
        }*/
    }

    getOne(id: number): Promise<ModelStatement> {
        return this.sc.one(id);

        /*if (one !== undefined) {
            return Promise.resolve(one);
        } else {
            return Promise.reject(`No Statement with id ${id} found`);
        }*/
    }

    getTree(id: number, max_depth?: number): Promise<StatementTreeNode> {
        max_depth = max_depth && max_depth > 0 ? max_depth : FacadeStatement.DEFAULT_MAX_DEPTH;

        return this.getTreeNode(id, max_depth)
        /*
        if (tree !== undefined) {
            return Promise.resolve(tree);
        } else {
            return Promise.reject(`No tree for Statement with id ${id} found`);
        }*/
    }

    getTreeNode(id: number, max_depth: number, current_depth: number = 0): Promise<StatementTreeNode> {
        return this.getOne(id)
            .then(statement => {
                if (current_depth >= max_depth) {
                    return {
                        statement_id: statement.id,
                        text: statement.text,
                        supportingArguments: []
                    }
                }
                else {
                    return Promise.all(
                        statement.supportingArguments.map(async (argument) =>
                            this.fa.getTreeNode(argument.id, max_depth, current_depth + 1)
                        ))
                        .then(children => {
                            return {
                                statement_id: statement.id,
                                text: statement.text,
                                supportingArguments: children
                            }
                        });
                }
            });
    }
}

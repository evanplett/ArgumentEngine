//TypeORM Entity

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne
} from "typeorm";

import {
  ModelStatement,
  StatementTreeNode
} from "./Statement";

export enum ReasoningMethod {
  Abduction = "Abduction",
  Deduction = "Deduction",
  Induction = "Induction"
}

export interface ArgumentTreeNode {
  argument_id: number,
  premises: StatementTreeNode[],
  reasoning_method: ReasoningMethod
}

@Entity()
export class ModelArgument {

  constructor(conclusion: ModelStatement, premises: ModelStatement[], reasoning_method: ReasoningMethod) {
    this.conclusion = conclusion;
    this.premises = premises;
    this.reasoning_ethod = reasoning_method;
  }

  static stringToReasoningMethod(reasoningMethodString: string): Promise < ReasoningMethod > {
    let methodOfReasoning: ReasoningMethod = < ReasoningMethod > ReasoningMethod[reasoningMethodString];

    if (methodOfReasoning !== undefined) {
      return Promise.resolve(methodOfReasoning);
    } else {
      return Promise.reject(`'${reasoningMethodString}' is not a valid reasoning method`);
    }
  }

  // Typeorm elements
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => ModelStatement, statement => statement.supportingArguments)
  @JoinTable()
  conclusion!: ModelStatement;

  @ManyToMany(type => ModelStatement, statement => statement.supportedArguments)
  @JoinTable()
  premises!: ModelStatement[];

  @Column("enum", {
    enum: ReasoningMethod
  })
  reasoning_ethod!: ReasoningMethod;
}
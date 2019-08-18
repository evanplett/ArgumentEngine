//TypeORM Entity

import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne} from "typeorm";

import {ModelStatement} from "./Statement";

export enum ReasoningMethod {
  Abduction = "Abduction",
  Deduction = "Deduction",
  Induction = "Induction"
}

@Entity()
export class ModelArgument {

    constructor(conclusion: ModelStatement, premises: ModelStatement[], reasoningMethod: ReasoningMethod) {
       this.conclusion = conclusion;
       this.premises = premises;
       this.reasoningMethod = reasoningMethod;
    }


    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => ModelStatement, statement => statement.supportingArguments)
    @JoinTable()
    conclusion!: ModelStatement;

    @ManyToMany(type => ModelStatement, statement => statement.supportedArguments )
    @JoinTable()
    premises!: ModelStatement[];

    @Column("enum", { enum: ReasoningMethod })
    reasoningMethod!: ReasoningMethod;
}

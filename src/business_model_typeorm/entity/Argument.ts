//TypeORM Entity

import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne} from "typeorm";

import {Statement} from "./Statement";

export enum ReasoningMethod {
  Abduction = "Abduction",
  Deduction = "Deduction",
  Induction = "Induction"
}

@Entity()
export class Argument {
    constructor(conclusion: Statement, premises: Statement[], reasoningMethod: ReasoningMethod) {
       this.conclusion = conclusion;
       this.premises = premises;
       this.reasoningMethod = reasoningMethod;
    }


    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Statement, statement => statement.supportingArguments) 
    @JoinTable()
    conclusion!: Statement;
    
    @ManyToMany(type => Statement, statement => statement.supportedArguments )
    @JoinTable() 
    premises!: Statement[];
    
    @Column("enum", { enum: ReasoningMethod })
    reasoningMethod!: ReasoningMethod;
}

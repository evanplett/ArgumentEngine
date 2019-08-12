//TypeORM Entity

import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne} from "typeorm";

import {Statement} from "./Statement";

@Entity()
export class Argument {
    constructor(conclusion: Statement, premises: Statement[]) {
       this.conclusion = conclusion;
       this.premises = premises;
    }


    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Statement, statement => statement.supportingArguments) 
    @JoinTable()
    conclusion!: Statement;
    
    @ManyToMany(type => Statement, statement => statement.supportedArguments )
    @JoinTable() 
    premises!: Statement[];
}

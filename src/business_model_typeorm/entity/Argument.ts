import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, ManyToOne} from "typeorm";

import {Statement} from "./Statement";

@Entity()
export class Argument {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Statement, statement => statement.supportingArguments, { eager: true}) 
    @JoinTable()
    conclusion!: Statement;
    
    @ManyToMany(type => Statement, statement => statement.supportedArguments, { eager: true} )
    @JoinTable() 
    premises!: Statement[];
}

import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";

import {Statement} from "./Statement";

@Entity()
export class Argument {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Statement) 
    @JoinTable()
    conclusion!: Statement;
    
    @ManyToMany(type => Statement, statement => statement.arguments)
    @JoinTable() 
    premises!: Statement[];
}

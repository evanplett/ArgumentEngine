import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";

import {ModelArgument} from "./Argument";

@Entity()
export class ModelStatement {

    constructor(text: string)
    {
      this.text = text;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @OneToMany(type => ModelArgument, argument => argument.conclusion)
    supportingArguments!: ModelArgument[];

    @ManyToMany(type => ModelArgument, argument => argument.premises)
    supportedArguments!: ModelArgument[];
}

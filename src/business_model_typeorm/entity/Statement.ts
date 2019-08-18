import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";

import {Argument} from "./Argument";

@Entity()
export class Statement {

    constructor(text: string)
    {
      this.text = text;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @OneToMany(type => Argument, argument => argument.conclusion)
    supportingArguments!: Argument[];

    @ManyToMany(type => Argument, argument => argument.premises)
    supportedArguments!: Argument[];
}

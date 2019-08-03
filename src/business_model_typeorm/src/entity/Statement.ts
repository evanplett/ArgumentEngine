import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

import {Argument} from "./Argument";

@Entity()
export class Statement {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;
    
    @ManyToOne(type => Argument, argument => argument.conclusion)
    supportingArguments: Argument[];
    
    @ManyToMany(type => Argument, argument => argument.premises)
    supportedArguments: Argument[];
}

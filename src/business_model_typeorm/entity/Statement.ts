import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany
} from 'typeorm';

import {
  ModelArgument,
  ArgumentTreeNode
} from './Argument';


export interface StatementTreeNode {
  statement_id: number;
  text: string;
  supportingArguments: ArgumentTreeNode[];
}

@Entity()
export class ModelStatement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @OneToMany(type => ModelArgument, argument => argument.conclusion)
  supportingArguments!: ModelArgument[];

  @ManyToMany(type => ModelArgument, argument => argument.premises)
  supportedArguments!: ModelArgument[];

  constructor(text: string) {
    this.text = text;
  }
}

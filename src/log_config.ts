import {
  Category,
  CategoryLogger,
  CategoryServiceFactory,
  CategoryConfiguration,
  LogLevel
} from 'typescript-logging';


CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Debug));


/*
 Categories:
 - Façade
 - API
  - REST
 - DataModel
  - TypeoORM

*/


export const logArgumentEngineBase = new Category('argument_engine');

export const logFacade = new Category('façade', logArgumentEngineBase);

export const logRest = new Category('rest');

export const logDatamodel = new Category('data_model', logArgumentEngineBase);

export const logDatamodelTypeorm = new Category('typeorm', logDatamodel);




/*
export class LogConfig {

  addCategory(category: string, parentCategory: string): Category {}



}*/

import {
  Category,
  CategoryLogger,
  CategoryServiceFactory,
  CategoryConfiguration,
  LogLevel
} from 'typescript-logging';


CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Trace));

export const logArgumentEngineBase = new Category('argument_engine');

export const logFacade = new Category('façade', logArgumentEngineBase);

export const logApi = new Category('api', logArgumentEngineBase);

export const logApiRest = new Category('rest', logApi);

export const logDatamodel = new Category('data_model', logArgumentEngineBase);

export const logDatamodelTypeorm = new Category('typeorm', logDatamodel);

export const logTesting = new Category('testing', logArgumentEngineBase);



/*
export class LogConfig {

  addCategory(category: string, parentCategory: string): Category {}



}*/

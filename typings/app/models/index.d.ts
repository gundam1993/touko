import * as Sequelize from 'sequelize'
import ModifiedKoa from '../../../server';
declare namespace ModifiedModel {
  interface modelFunc {
    (app:ModifiedKoa): Sequelize.Model<string,object>
  }

  interface ModelDictionary {
    [index:string]:Sequelize.Model<string,object>
  }
}
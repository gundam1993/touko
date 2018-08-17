import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import * as path from 'path'
import { generateSchema } from '../utils/generateSchema';

const schema =  generateSchema()

const myNamespace = generateNamespace('GQL', schema);
fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), myNamespace, (err) => {
  console.log(err)
})
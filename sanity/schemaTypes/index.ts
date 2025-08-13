// studio/index.ts
// responsible for providing the content types to sanity studio.

import { type SchemaTypeDefinition } from 'sanity'
import {projectType} from "@/sanity/schemaTypes/projectType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType],
}

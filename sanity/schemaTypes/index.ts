// studio/index.ts
// responsible for providing the content types to sanity studio.

import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from "@/sanity/schemaTypes/projectType";
import { experienceType } from "@/sanity/schemaTypes/experienceType";
import { moreSectionTypes } from "@/sanity/schemaTypes/moreSectionTypes";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, experienceType, moreSectionTypes],
}

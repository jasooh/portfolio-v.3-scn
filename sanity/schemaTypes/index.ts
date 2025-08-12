import { type SchemaTypeDefinition } from 'sanity'
import {postType} from "@/sanity/schemaTypes/postType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType],
}

import type { SchemaTypeDefinition } from 'sanity';

import { localeString, localeText, localeBlock } from './objects/locale';
import { download } from './documents/download';
import { capability } from './documents/capability';
import { product } from './documents/product';
import { material } from './documents/material';
import { industry } from './documents/industry';
import { page } from './documents/page';
import { settings } from './documents/settings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  localeString,
  localeText,
  localeBlock,
  // documents
  capability,
  product,
  material,
  industry,
  download,
  page,
  settings,
];

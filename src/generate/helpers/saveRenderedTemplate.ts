import path from 'path';

import Handlebars from 'handlebars';

import fs from 'fs';

Handlebars.registerHelper('toUpperCase', function (str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
});

Handlebars.registerHelper('toLowerCase', function (str: string) {
  return str.replace(/^\w/, (c) => c.toLowerCase());
});

export function saveRenderedTemplate(
  templateName: string,
  context: {},
  filePath: string,
  fileName: string,
  keepIfExists = false,
) {
  const combinedPath = path.join(filePath, fileName);
  if (keepIfExists && fs.existsSync(combinedPath)) {
    return;
  }
  const template = fs.readFileSync(path.join(__dirname, '../', templateName), 'utf8');
  const generateIndex = () => Handlebars.compile(template)(context);

  fs.writeFileSync(path.join(filePath, fileName), generateIndex());
}

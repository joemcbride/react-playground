import React from 'react';
import path from 'path';
import App from './src/App';
import Root from './src/Root';
import fsp from 'fs-promise';
import { copy } from '../tools/fs-utils';
import { exec } from '../tools/exec';

const rootFactory = React.createFactory(Root);

const repoRoot = path.resolve(__dirname, '../');
const docsBuilt = path.join(repoRoot, 'docs-built');

const license = path.join(repoRoot, 'LICENSE');
const readmeSrc = path.join(repoRoot, 'README.md');
const readmeDest = path.join(docsBuilt, 'README.md');

export default function BuildDocs() {
  console.log('Building: '.cyan + 'docs'.green);

  return exec(`rimraf ${docsBuilt}`)
    .then(() => fsp.mkdir(docsBuilt))
    .then(() => {

      let pages = ['index.html'];

      let writes = pages
        .map(fileName => new Promise((resolve, reject) => {

          let markup = React.renderToString(<App/>);
          let html = React.renderToStaticMarkup(rootFactory({
            markup: markup
          }));

          let write = fsp.writeFile(path.join(docsBuilt, fileName), html);
          resolve(write);

        }));

      return Promise.all(writes.concat([
        exec(`webpack --config webpack.docs.js -p --bail`),
        copy(license, docsBuilt),
        copy(readmeSrc, readmeDest)
      ]));
    })
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}

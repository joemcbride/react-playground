import 'colors';
import lib from './lib/build';
import dist from './dist/build';
import { exec } from './exec';

function forkAndBuildDocs(verbose) {
  console.log('Building: '.cyan + 'docs'.green);

  let options = verbose ? ' -- --verbose' : '';

  return exec(`npm run docs-build${options}`)
    .then(() => console.log('Built: '.cyan + 'docs'.green));
}

export default function Build(verbose) {
  return Promise.all([
      lib(),
      dist(),
      forkAndBuildDocs(verbose)
    ]);
}

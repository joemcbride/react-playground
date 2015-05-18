import fs from 'fs';
import path from 'path';

class RenameCssFiles {
  rename(directory) {
    fs.readdir(directory, (err, files)=>{
      if (err) {
        console.log(err);
        return;
      }

      files.forEach(file=>{
        let matcher = /(.*)(\.css)/;
        if (file.match(matcher)) {
          let newFile = file.replace(matcher, '$1.less');

          fs.rename(path.join(directory, file), path.join(directory, newFile), (renameErr)=>{
            if (renameErr) {
              console.log(renameErr);
            }
          });
        }
      });

    });
  }
}

let core = './src/assets';
let themes = './src/assets/themes';

let renamer = new RenameCssFiles();
renamer.rename(core);
renamer.rename(themes);

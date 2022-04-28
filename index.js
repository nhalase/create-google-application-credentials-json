import { setFailed, setOutput, getInput } from '@actions/core';
import { mkdirP } from '@actions/io';
import { writeFile } from 'fs';
import { join as joinPath } from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);

main().catch((error) => setFailed(error.message));

async function main() {
  try {
    const creds = getInput('GOOGLE_APPLICATION_CREDENTIALS');
    if (!creds) {
      const msg = 'No GOOGLE_ACCOUNT_CREDENTIALS env variable found!';
      console.log(msg);
      throw msg;
    }
    const tempDirectory = await createTempDirectory();
    const path = joinPath(tempDirectory, 'GOOGLE_ACCOUNT_CREDENTIALS.json');
    await writeFileAsync(path, creds);
    setOutput('GOOGLE_APPLICATION_CREDENTIALS_JSON', path);
  } catch (error) {
    setFailed(error.message);
  }
}

async function createTempDirectory() {
  const IS_WINDOWS = process.platform === 'win32';
  let tempDirectory = process.env['RUNNER_TEMP'] || '';
  if (!tempDirectory) {
    let baseLocation = '';
    if (IS_WINDOWS) {
      // On Windows use the USERPROFILE env variable
      baseLocation = process.env['USERPROFILE'] || 'C:\\';
    } else {
      if (process.platform === 'darwin') {
        baseLocation = '/Users';
      } else {
        baseLocation = '/home';
      }
    }
    tempDirectory = joinPath(baseLocation, 'actions', 'temp');
  }
  const dest = joinPath(tempDirectory, 'secrets');
  await mkdirP(dest);
  return dest;
}

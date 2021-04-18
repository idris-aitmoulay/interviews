import { readFileSync } from 'fs';

export class InputStream {
  static readFileAsLines (path: string) {
    return readFileSync(path).toString().split("\r\n").filter((stream: string) => stream!=='');
  }
}

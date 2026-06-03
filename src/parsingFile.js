import fs from 'fs';
import * as path from "node:path";
const parsingFile = (file) => {
    const filePath = path.resolve(process.cwd(), 'data', file);
    const content = fs.readFileSync(file);
    if (content) {
        return JSON.parse(content);
    }
}

export default parsingFile;
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, '../db');

export class DbService {
  static async read(filename) {
    const filePath = path.join(DB_PATH, filename);
    if (!(await fs.pathExists(filePath))) {
      return null;
    }
    return fs.readJSON(filePath);
  }

  static async write(filename, data) {
    const filePath = path.join(DB_PATH, filename);
    await fs.ensureDir(DB_PATH);
    return fs.writeJSON(filePath, data, { spaces: 2 });
  }

  static async getUsers() {
    return this.read('users.json');
  }

  static async saveUsers(users) {
    return this.write('users.json', users);
  }

  static async getContent() {
    return this.read('content.json');
  }

  static async saveContent(content) {
    return this.write('content.json', content);
  }
}

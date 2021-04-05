import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

class DatabaseConnector {
  connection: Promise<Connection>;

  connect(options: any): Promise<Connection> {
    if (!this.connection) {
      this.connection = createConnection(options);
    }
    return this.connection;
  }

  getConnectionInstance(): Promise<Connection> {
    if (!this.connection) throw Error('no database connection, make sure to connect');
    return this.connection;
  }
}

export default new DatabaseConnector();

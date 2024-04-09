import { Document } from 'langchain/document';

export default interface IPdfLoader {
  filePath: string;
  fileLength: number;
  parsePdf(): Promise<Document[]>;
}

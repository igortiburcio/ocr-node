import { TextPdfLoader } from './TextPdfLoader';
import { ImagePdfLoader } from './ImagePdfLoader';
import IPdfLoader from '../interfaces/IPdfLoader';

export class PdfLoaderService {
  private textPdfLoader: IPdfLoader = new TextPdfLoader(this.filePath, this.fileLength);
  private imagePdfLoader: IPdfLoader = new ImagePdfLoader(this.filePath, this.fileLength);

  constructor(private filePath: string, private fileLength: number) {}

  async load() {
    let docs = await this.textPdfLoader.parsePdf();

    if (docs.length === 0) {
      docs = await this.imagePdfLoader.parsePdf();
    }

    if (docs.length === 1 && (docs[0].pageContent === ';\n*.\n' || docs[0].pageContent === '')) {
      throw new Error("Document is Empty or can't be parsed.");
    }

    return docs;
  }
}

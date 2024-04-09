import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import IPdfLoader from '../interfaces/IPdfLoader';

export class TextPdfLoader implements IPdfLoader {
  private pdfLoader: PDFLoader;

  constructor(public filePath: string, public fileLength: number) {
    this.pdfLoader = new PDFLoader(filePath);
  }

  async parsePdf() {
    const output = await this.pdfLoader.load();

    if (output.length > this.fileLength) throw new Error('The PDF has more pages than allowed.');

    return output;
  }
}

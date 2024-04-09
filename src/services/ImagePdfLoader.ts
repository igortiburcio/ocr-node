import { convert } from 'pdf-img-convert';
import Tesseract from 'tesseract.js';
import { Document, DocumentInput } from 'langchain/document';
import IPdfLoader from '../interfaces/IPdfLoader';

export class ImagePdfLoader implements IPdfLoader {
  constructor(public filePath: string, public fileLength: number) {}

  async parsePdf() {
    const image = (await convert(this.filePath, { width: 1920 })).map((element) => Buffer.from(element));

    if (image.length > this.fileLength) throw new Error('The PDF has more pages than allowed.');

    const worker = await Tesseract.createWorker('por');
    const output: Document[] = [];

    for (let index = 0; index < image.length; index++) {
      const page = await worker.recognize(image[index]);

      const metadata: DocumentInput = {
        pageContent: page.data.text,
        metadata: {
          source: this.filePath,
          pdf: {
            version: '1.10.100',
            info: {
              PDFFormatVersion: '1.7',
              isAcroFormPresent: false,
              IsXFAPresent: false,
              Producer: 'Tesseract',
              ModDate: new Date().getTime().toString(),
            },
            metadata: null,
            totalPages: image.length,
          },
          loc: { pageNumber: index + 1 },
        },
      };

      const docs = new Document(metadata);
      output.push(docs);
    }

    await worker.terminate();

    return output;
  }
}

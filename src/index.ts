import { PdfLoaderService } from './services/PdfLoader.service';

const filePath = './docs/test.pdf';
const length = 30;

async function main() {
  const pdfLoader = new PdfLoaderService(filePath, length);
  const doc = await pdfLoader.load();

  console.log(doc);
}

main();

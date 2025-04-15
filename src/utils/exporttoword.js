import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export function generateWordDoc(data) {
  const doc = new Document({
    sections: [
      {
        children: Object.entries(data).map(([key, value]) => (
          new Paragraph({
            children: [
              new TextRun({ text: `${key.toUpperCase()}:`, bold: true }),
              new TextRun({ text: ` ${value || ''}`, break: 1 }),
            ],
            spacing: { after: 200 }
          })
        )),
      },
    ],
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `${data.title || 'session'}.docx`);
  });
}

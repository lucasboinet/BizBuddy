'use client'

import { usePDF } from '@react-pdf/renderer/lib/react-pdf.browser';
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import InvoicePdf from './invoice-pdf';
import { AppInvoice } from '@/types/invoices';
import { useDebounce } from '@/hooks/use-debounce';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function InvoicePdfViewer({ invoice }: { invoice: AppInvoice }) {
  const debounceInvoice = useDebounce(invoice, 1000);
  const [_, setNumPages] = useState<number>();
  const [instance, updateInstance] = usePDF({ document: <InvoicePdf invoice={invoice} /> })

  useEffect(() => {
    if (debounceInvoice) {
      handleUpdatePdfPreview();
    }

  }, [debounceInvoice]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function handleUpdatePdfPreview() {
    updateInstance(<InvoicePdf invoice={invoice} />);
  }

  return (
    <div className='border rounded-lg overflow-hidden aspect-[9/16]'>
      <Document
        file={instance.url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-full"
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  )
}
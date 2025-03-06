'use client'

import { usePDF } from '@react-pdf/renderer/lib/react-pdf.browser';
import { useCallback, useEffect, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { Document, Page, pdfjs } from 'react-pdf';
import InvoicePdf from './invoice-pdf';
import { Loader2Icon } from 'lucide-react';
import { useAuthSession } from '@/components/context/AuthSessionContext';
import { AppInvoice } from '@/types/invoices';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function InvoicePdfViewer({ invoice }: { invoice: AppInvoice }) {
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const { user, loading } = useAuthSession();
  const [instance, updateInstance] = usePDF({ document: <InvoicePdf invoice={invoice} user={user} /> })

  const resizeObserverOptions = {};
  const maxWidth = 2000;

  useEffect(() => {
    updateInstance(<InvoicePdf invoice={invoice} user={user} />);
  }, [invoice, updateInstance, user])


  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <div className='border bg-white rounded-lg overflow-hidden w-4/5 aspect-[1/1.414]' ref={setContainerRef}>
      {!instance.loading && !loading && (
        <Document
          file={instance.url}
          className="w-full"
        >
          <Page
            pageNumber={1}
            width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
          />
        </Document>
      )}

      {instance.loading || loading && (
        <div className='w-full h-full bg-white flex items-center justify-center text-xl'>
          <Loader2Icon className='animate-spin' />
        </div>
      )}
    </div>
  )
}
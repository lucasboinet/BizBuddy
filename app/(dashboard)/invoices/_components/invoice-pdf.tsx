'use client'

import React from 'react';
import { AppInvoice } from '@/types/invoices';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer/lib/react-pdf.browser';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { UpdateInvoiceSchemaType } from '@/schema/invoices';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  invoiceId: {
    fontSize: 20,
  }
});

export default function InvoicePdf({ invoice }: { invoice: UpdateInvoiceSchemaType }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.invoiceId}>Invoice : {invoice.invoiceId}</Text>
        </View>
      </Page>
    </Document>
  )
}
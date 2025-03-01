'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer/lib/react-pdf.browser';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { UpdateInvoiceSchemaType } from '@/schema/invoices';
import { format } from 'date-fns';
import { AuthSafeUser } from '@/types/auth';
import { roundNumber } from '@/lib/helper/number';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 12
  },
  section: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 5,
  },
  destination: {
    flexDirection: 'row',
    gap: 200,
    marginTop: 30
  },
  titleText: {
    fontWeight: 800,
  },
  heading: {
    marginBottom: 10,
    fontSize: 30
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 40,
    marginBottom: 14
  },
  itemLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingVertical: 8
  },
  itemCell: {
    width: '20%',
  }
});

export default function InvoicePdf({ invoice, user }: { invoice: UpdateInvoiceSchemaType, user: AuthSafeUser | undefined }) {
  const invoiceSubtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.amount), 0);
  const invoiceVAT = roundNumber(invoiceSubtotal * 1.10);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Invoice</Text>
        <View style={styles.section}>
          <Text style={styles.titleText}>Invoice N°:</Text>
          <Text>{invoice.invoiceId}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.titleText}>Issue date:</Text>
          <Text>{format(invoice.createdAt, 'dd/MM/yyyy')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.titleText}>Due date:</Text>
          <Text>{format(invoice.dueDate, 'dd/MM/yyyy')}</Text>
        </View>

        <View style={styles.destination}>
          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Text style={{ ...styles.titleText, marginBottom: 6 }}>From</Text>
            <Text>{user?.firstname} {user?.lastname}</Text>
            <Text>{user?.email}</Text>
          </View>

          <View style={{ flexDirection: 'column', gap: 4 }}>
            <Text style={{ ...styles.titleText, marginBottom: 6 }}>To</Text>
            <Text>{invoice.customer.name}</Text>
            <Text>{invoice.customer.email}</Text>
          </View>
        </View>

        <View style={styles.itemsHeader}>
          <Text style={{ width: '40%' }}>Item</Text>
          <Text style={styles.itemCell}>Quantity</Text>
          <Text style={styles.itemCell}>Price</Text>
          <Text style={{ ...styles.itemCell, textAlign: 'right' }}>Total</Text>
        </View>

        {invoice.items.map((item, index) => (
          <View key={index} style={styles.itemLine}>
            <Text style={{ width: '40%' }}>{item.label}</Text>
            <Text style={styles.itemCell}>{item.quantity}</Text>
            <Text style={styles.itemCell}>€{item.amount}</Text>
            <Text style={{ ...styles.itemCell, textAlign: 'right' }}>€{item.amount * item.quantity}</Text>
          </View>
        ))}

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <View
              style={{
                paddingVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid gray'
              }}
            >
              <Text>Subtotal</Text>
              <Text>€{invoiceSubtotal}</Text>
            </View>

            <View
              style={{
                paddingVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid gray'
              }}
            >
              <Text>VAT (10%)</Text>
              <Text>€{invoiceVAT - invoiceSubtotal}</Text>
            </View>

            <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Total</Text>
              <Text>€{invoiceVAT}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}
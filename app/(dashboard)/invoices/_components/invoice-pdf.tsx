'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer/lib/react-pdf.browser';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { format } from 'date-fns';
import { AuthSafeUser } from '@/types/auth';
import { roundNumber } from '@/lib/helper/number';
import { capitalize } from '@/lib/helper/texts';
import { AppInvoice } from '@/types/invoices';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    marginTop: 30,
    padding: 10,
    borderRadius: 4,
    border: '1px solid #e4e4e7',
  },
  titleText: {
    fontWeight: 800,
    color: '#686868'
  },
  heading: {
    marginBottom: 10,
    fontSize: 30
  },
  itemsTable: {
    padding: 6,
    borderRadius: 4,
    border: '1px solid #e4e4e7',
  },
  itemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 6,
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#e4e4e7',
    color: '#686868'
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

export default function InvoicePdf({ invoice, user }: { invoice: Partial<AppInvoice>, user: AuthSafeUser | undefined }) {
  const invoiceSubtotal = roundNumber(invoice.items!.reduce((acc, item) => acc + (item.quantity * item.amount), 0));
  const invoiceVAT = roundNumber(invoiceSubtotal * ((invoice.vat! / 100) + 1));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Invoice</Text>
          <View style={styles.section}>
            <Text style={styles.titleText}>Invoice N°:</Text>
            <Text>{invoice.id}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleText}>Issue date:</Text>
            <Text>{format(invoice.createdAt || new Date(), 'dd/MM/yyyy')}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleText}>Due date:</Text>
            <Text>{invoice?.dueDate && format(invoice.dueDate, 'dd/MM/yyyy')}</Text>
          </View>

          <View style={styles.destination}>
            <View style={{ flexDirection: 'column', gap: 4 }}>
              <Text style={{ ...styles.titleText, marginBottom: 6 }}>From</Text>
              <Text>{user?.firstname} {user?.lastname}</Text>
              <Text>{user?.email}</Text>
              <Text>{user?.settings?.address?.line1}</Text>
              {user?.settings?.address?.line2 && <Text>{user?.settings?.address?.line2}</Text>}
              <Text>{user?.settings?.address?.city}, {user?.settings?.address?.postalCode}</Text>
              <Text style={{ ...styles.titleText, marginBottom: 4, marginTop: 6 }}>Siret</Text>
              <Text>{user?.settings?.siret}</Text>
            </View>

            <View style={{ flexDirection: 'column', gap: 4 }}>
              <Text style={{ ...styles.titleText, marginBottom: 6 }}>To</Text>
              {invoice?.customer && (
                <>
                  <Text>{invoice.customer.name}</Text>
                  <Text>{invoice.customer.email}</Text>
                  <Text>{invoice.customer.address.line1}</Text>
                  {invoice.customer.address.line2 && <Text>{invoice.customer.address.line2}</Text>}
                  <Text>{invoice.customer.address.city}, {invoice.customer.address.postalCode}</Text>
                  <Text style={{ ...styles.titleText, marginBottom: 4, marginTop: 6 }}>Siret</Text>
                  <Text>{invoice.customer.siret}</Text>
                </>
              )}
            </View>
          </View>

          <Text
            style={{
              fontSize: 15,
              marginTop: 40,
              marginBottom: 20
            }}
          >
            {invoice.name}
          </Text>

          <View style={styles.itemsTable}>
            <View style={styles.itemsHeader}>
              <Text style={{ width: '40%' }}>Item</Text>
              <Text style={styles.itemCell}>Quantity</Text>
              <Text style={styles.itemCell}>Price</Text>
              <Text style={{ ...styles.itemCell, textAlign: 'right' }}>Total</Text>
            </View>

            {invoice.items!.map((item, index) => (
              <View key={index} style={styles.itemLine}>
                <Text style={{ width: '40%' }}>{capitalize(item.label)}</Text>
                <Text style={styles.itemCell}>{item.quantity}</Text>
                <Text style={styles.itemCell}>€{item.amount}</Text>
                <Text style={{ ...styles.itemCell, textAlign: 'right' }}>€{item.amount * item.quantity}</Text>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
            <View style={{ flexDirection: 'column', width: '50%' }}>
              <View
                style={{
                  paddingVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #e4e4e7'
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
                  borderBottom: '1px solid #e4e4e7'
                }}
              >
                <Text>VAT ({invoice.vat}%)</Text>
                <Text>€{roundNumber(invoiceVAT - invoiceSubtotal)}</Text>
              </View>

              <View style={{ paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Total</Text>
                <Text style={{ fontSize: 20 }}>€{invoiceVAT}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 4, }}>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={{ ...styles.titleText, marginBottom: 8 }}>Payment details</Text>
            <Text>IBAN: {user?.settings?.iban}</Text>
            <Text>BIC: {user?.settings?.bic}</Text>
          </View>

          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={{ ...styles.titleText, marginBottom: 8 }}>Note</Text>
            <Text>{invoice.note}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
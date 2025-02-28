/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: './empty-module.ts',
        './InvoicePdf.js': './app/(dashboard)/invoices/_components/invoice-pdf.tsx',
      },
    },
  },
};

export default nextConfig;

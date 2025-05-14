import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const monthdate = formData.get('monthdate')?.toString();
  const accnum = formData.get('accnum')?.toString();
  const invoicenum = formData.get('invoicenum')?.toString();
  const sourcebill = formData.get('sourcebill')?.toString();
  const kwh = formData.get('kwh')?.toString();
  const qrbarcode = formData.get('qrbarcode') as File | null;

  let qrbarcodeBuffer: Buffer | null = null;

  if (qrbarcode && qrbarcode.size > 0) {
    const arrayBuffer = await qrbarcode.arrayBuffer();
    qrbarcodeBuffer = Buffer.from(arrayBuffer);
  }

  
  console.log('monthdate:', monthdate);
  console.log('accnum:', accnum);
  console.log('invoicenum', invoicenum);
  console.log('sourcebill', sourcebill);
  console.log('kwh', kwh);
  console.log('qrbrcode', qrbarcode);

  if (!monthdate || !accnum || !invoicenum || !sourcebill || !kwh) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    await client.query(
      `INSERT INTO electricitybill (monthdate, accnum, invoicenum, sourcebill, kwh, qrbarcode)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [monthdate, accnum, invoicenum, sourcebill, kwh, qrbarcodeBuffer]
    );
    client.release();

    return NextResponse.redirect('/success', 303); // redirect after success
  } catch (err) {
    console.error('Database insert error:', err);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

// app/api/submitElectricityBill/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import pool from '@/lib/db'; // adjust if needed

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     const monthdate = formData.get('monthdate')?.toString();
//     const accnum = formData.get('accnum')?.toString();
//     const invoicenum = formData.get('invoicenum')?.toString();
//     const sourcebill = formData.get('sourcebill')?.toString();
//     const kwh = formData.get('kwh')?.toString();
//     const qrbarcode = formData.get('qrbarcode') as File | null;

//     let qrbarcodeBuffer: Buffer | null = null;

//     if (qrbarcode && qrbarcode.size > 0) {
//       const arrayBuffer = await qrbarcode.arrayBuffer();
//       qrbarcodeBuffer = Buffer.from(arrayBuffer);
//     }

//     if (!monthdate || !accnum || !invoicenum || !sourcebill || !kwh) {
//       return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
//     }

//     const client = await pool.connect();
//     await client.query(
//       `INSERT INTO electricitybill (monthdate, accnum, invoicenum, sourcebill, kwh, qrbarcode)
//        VALUES ($1, $2, $3, $4, $5, $6)`,
//       [monthdate, accnum, invoicenum, sourcebill, Number(kwh), qrbarcodeBuffer]
//     );
//     client.release();

//     return NextResponse.redirect( new URL('/success', req.url), 303);
//   } catch (err) {
//     console.error('Database insert error:', err);
//     return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
//   }
// }

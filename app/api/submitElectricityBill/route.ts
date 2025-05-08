// app/api/submitElectricityBill/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const payload = {
      monthdate: formData.get('monthdate'),
      accnum: formData.get('accnum'),
      invoicenum: formData.get('invoicenum'),
      sourcebill: formData.get('sourcebill'),
      kwh: formData.get('kwh'),
    };

    const file = formData.get('qrbarcode') as File | null;

    const axiosForm = new FormData();
    for (const key in payload) {
      axiosForm.append(key, payload[key] as string);
    }

    if (file) {
      axiosForm.append('qrbarcode', file);
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_MSP_API_URL;

    const response = await axios.post(`${apiBaseUrl}/api/electricitybill`, axiosForm, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json({ message: 'Data submitted successfully', data: response.data });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Failed to submit data', error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server'
import { errorMessage } from '@/utils/error'
import instance from "@/utils/axiosInstance"

export async function GET() {
  try {
    const { data } = await instance.get(`${process.env.RAJAONGKIR_API_URL}/province`, {
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY as string
      }
    })
    const provinces = data?.rajaongkir?.results || []

    return NextResponse.json({ provinces }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: errorMessage(err) }, { status: 400 })
  }
}

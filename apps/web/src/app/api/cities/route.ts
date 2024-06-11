import { type NextRequest, NextResponse } from 'next/server'
import { errorMessage } from '@/utils/error'
import instance from "@/utils/axiosInstance"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const provinceId = searchParams.get('provinceId') || ''

    if (!provinceId) return []

    const { data } = await instance.get(
      `${process.env.RAJAONGKIR_API_URL}/city?province=${provinceId}`,
      {
        headers: {
          'key': process.env.RAJAONGKIR_API_KEY as string
        }
      }
    )

    const cities = data?.rajaongkir?.results || []

    return NextResponse.json({ cities }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: errorMessage(err) }, { status: 400 })
  }
}

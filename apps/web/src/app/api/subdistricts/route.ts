import { type NextRequest, NextResponse } from 'next/server'
import { errorMessage } from '@/utils/error'
import instance from "@/utils/axiosInstance"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const cityId = searchParams.get('cityId') || ''

    if (!cityId) return []

    const { data } = await instance.get(`${process.env.RAJAONGKIR_API_URL}/subdistrict?city=${cityId}`, {
      headers: {
        'key': process.env.RAJAONGKIR_API_KEY as string
      }
    })
    const subdistricts = data?.rajaongkir?.results || []

    return NextResponse.json({ subdistricts }, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: errorMessage(err) }, { status: 400 })
  }
}

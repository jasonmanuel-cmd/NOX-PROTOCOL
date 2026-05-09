import { NextResponse } from 'next/server'
import { Client, Environment } from 'square'

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // Change to Production for live
})

export async function POST(req: Request) {
  try {
    const { sourceId } = await req.json()
    
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: crypto.randomUUID(),
      amountMoney: {
        amount: BigInt(2499), // $24.99 in cents
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
    })

    return NextResponse.json({ success: true, payment: result.payment })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

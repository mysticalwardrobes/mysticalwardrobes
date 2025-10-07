import { NextResponse } from "next/server"
import { client } from "../config"
const fs = require('fs')

export async function GET() {
  const entries = await client.getEntries({
      content_type: 'gown',
  })
  const names = entries.items
  const items = names

  return NextResponse.json(items)
}
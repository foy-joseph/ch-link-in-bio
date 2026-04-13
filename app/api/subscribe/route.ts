import { NextRequest, NextResponse } from "next/server";

const CM_API_KEY = process.env.CM_API_KEY!;
const LIST_ID = "a30a8f2e9bc63785b302e579b8fcf521";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.createsend.com/api/v3.3/subscribers/${LIST_ID}.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from(CM_API_KEY + ":x").toString("base64"),
      },
      body: JSON.stringify({
        EmailAddress: email,
        ConsentToTrack: "Yes",
        Resubscribe: true,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("CM error:", res.status, text);
    console.error("CM key length:", CM_API_KEY?.length, "starts:", CM_API_KEY?.slice(0, 4));
    return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

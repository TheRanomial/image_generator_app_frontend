import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const backendUrl = process.env.BACKEND_URL || "https://brainy-ardith-theranomial-fa561f77.koyeb.app";

  try {
    const response = await fetch(`${backendUrl}/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

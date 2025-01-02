import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params; 
  const backendUrl =
    process.env.BACKEND_URL ||
    "https://brainy-ardith-theranomial-fa561f77.koyeb.app";

  try {
    const response = await fetch(`${backendUrl}/image/${filename}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch image: ${response.status} ${response.statusText}`
      );
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const blob = await response.blob();
    const headers = new Headers(response.headers);
    headers.set("Content-Type", "image/jpeg");

    return new NextResponse(blob, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}

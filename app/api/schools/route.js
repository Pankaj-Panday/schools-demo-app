import { getConnection } from "@/lib/db";
import { uploadToCloudinary } from "@/lib/file-upload";
import { fileToBase64 } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await getConnection();
    const res = await connection.query("SELECT * FROM schools");
    const data = res[0]
    await connection.end();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const email = formData.get("email");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const file = formData.get("image");

    if (!name || !address || !email || !city || !state || !contact || !file || file.size === 0) {
      return NextResponse.json({ success: false, error: "MIssing required fields" }, { status: 400 });
    }

    // handle image
    let imageUrl = null;
    if (file && file instanceof File) {
      const base64 = await fileToBase64(file);
      const dataUri = `data:${file.type};base64,${base64}`;

      // upload file to cloudinary
      const { secure_url } = await uploadToCloudinary(dataUri);
      imageUrl = secure_url;
    }
    const connection = await getConnection();
    await connection.query(
      `INSERT INTO schools (name, address, email, city, state, contact, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, email, city, state, contact, imageUrl]
    );

    await connection.end();
    return NextResponse.json({ success: true, message: "School added!" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

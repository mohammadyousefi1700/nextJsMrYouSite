import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // حذف کوکی با تنظیم مقدار آن به '' و تاریخ انقضا در گذشته
    res.setHeader(
      "Set-Cookie",
      serialize("whoAmI", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        path: "/",
      })
    );

    return res.status(200).json({ message: "Logged out successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

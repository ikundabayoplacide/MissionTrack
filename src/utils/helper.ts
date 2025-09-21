import bcrypt from "bcrypt";
import { Request } from "express";
import Tesseract from "tesseract.js";
import pdf from "pdf-parse";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const secretkey = process.env.JWT_SECRET || 'secret';
export interface AuthRequest extends Request {
  user?: {
    id: string,
    role: string,
    fullName: string,
    email: string,
    companyId: string,
    companyStatus: string | null
  }
}

export async function extractReceiptData(filePath: string): Promise<{ amount?: number | null; date?: Date | null }> {
  try {
    
    let text = '';
     const isCloudinaryUrl = /^https?:\/\//.test(filePath);
   if (isCloudinaryUrl) {
      // Fetch file from Cloudinary
      const response = await fetch(filePath);
      const buffer = await response.arrayBuffer();

      if (filePath.toLowerCase().endsWith(".pdf")) {
        const pdfData = await pdf(Buffer.from(buffer));
        text = pdfData.text;
      } else {
        const tempPath = "/tmp/tempfile.jpg"; // or png
        fs.writeFileSync(tempPath, Buffer.from(buffer));
        const result = await Tesseract.recognize(tempPath, "eng");
        text = result.data.text;
        fs.unlinkSync(tempPath);
      }
    } else {
      // Local file (development)
      if (filePath.toLowerCase().endsWith(".pdf")) {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdf(dataBuffer);
        text = pdfData.text;
      } else {
        const result = await Tesseract.recognize(filePath, "eng");
        text = result.data.text;
      }
    }

    // Extract amount
    const amountMatch =
      text.match(/(?:Total|Amount|Total Amount|Balance Due|Balance|Amount Due)[^\d]*([\d,]+(?:\.\d{1,2})?)(?:\s?rwf)?/i) ||
      text.match(/([\d,]+(?:\.\d{1,2})?)(?:\s?rwf)?/i);

    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : null;


    // Extract date
    const dateMatch = text.match(
      /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})/);
    const date = dateMatch ? new Date(dateMatch[0]) : null;

    return { amount, date };
  }
  catch (error) {
    console.error("Error extracting receipt data:", error);
    return { amount: null, date: null };
  }
}
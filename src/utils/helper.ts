import bcrypt from "bcrypt";
import { Request } from "express";
import Tesseract from "tesseract.js";
import fetch from "node-fetch";
import pdf from "pdf-parse";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
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
      const response = await fetch(filePath);
      if (!response.ok) {
        return { amount: null, date: null };
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const contentType = response.headers.get("content-type") || "";
      
      if (contentType.includes("pdf") || filePath.toLowerCase().includes(".pdf")) {
        const pdfData = await pdf(buffer);
        text = pdfData.text;
      } else {
        // Use process.cwd() + '/tmp' or os.tmpdir()
        const os = require('os');
        const tempDir = os.tmpdir();
        const tempPath = path.join(tempDir, "tempfile_" + Date.now() + "_" + Math.random().toString(36).substring(7));
        
        try {
          fs.writeFileSync(tempPath, buffer);
          const result = await Tesseract.recognize(tempPath, "eng");
          text = result.data.text;
        } finally {
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
        }
      }
    } else {
      // Local file processing remains the same
      if (filePath.toLowerCase().endsWith(".pdf")) {
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdf(dataBuffer);
        text = pdfData.text;
      } else {
        const result = await Tesseract.recognize(filePath, "eng");
        text = result.data.text;
      }
    }

    // Enhanced amount extraction
    const amountMatch = 
      text.match(/(?:Total|Amount|Total Amount|Balance Due|Balance|Amount Due|TOTAL|AMOUNT)[\s\D]*([\d,]+(?:\.\d{1,2})?)(?:\s?(?:rwf|RWF|frw|FRW))?/i) ||
      text.match(/([\d,]+(?:\.\d{1,2})?)(?:\s?(?:rwf|RWF|frw|FRW))/i) ||
      text.match(/\b([\d,]+\.\d{2})\b/);

    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, "")) : null;

    // Enhanced date extraction  
    const dateMatch = text.match(
      /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})|(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})/i);
    const date = dateMatch ? new Date(dateMatch[0]) : null;

    return { amount, date };
  } catch (error) {
    return { amount: null, date: null };
  }
}
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
    if (!filePath) {
    return { amount: null, date: null };
  }
  try {
    let text = '';
    const isUrl = /^https?:\/\//.test(filePath);
    
    if (isUrl) {
      // Handle Cloudinary URLs - try to get the file in a format that's easier to process
      const cloudinaryUrl = filePath.replace('/upload/', '/upload/fl_attachment/');
      
      const response = await fetch(cloudinaryUrl);
      if (!response.ok) {
        console.error('Failed to fetch URL:', response.statusText);
        return { amount: null, date: null };
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const contentType = response.headers.get("content-type") || "";
      const isPdf = contentType.includes("pdf") || filePath.toLowerCase().includes(".pdf");

      if (isPdf) {
        try {
          const pdfData = await pdf(buffer);
          text = pdfData.text;
        } catch (pdfError) {
          console.error('PDF parsing error:', pdfError);
        }
      } else {
        // Use temporary file for image processing
        const os = require('os');
        const tempDir = os.tmpdir();
        const tempPath = path.join(tempDir, `receipt_${Date.now()}.${contentType.includes('png') ? 'png' : 'jpg'}`);
        
        try {
          fs.writeFileSync(tempPath, buffer);
          const result = await Tesseract.recognize(tempPath, "eng");
          text = result.data.text;
        } catch (ocrError) {
          console.error('OCR error:', ocrError);
        } finally {
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
        }
      }
    } else {
      // Local file processing
      if (filePath.toLowerCase().endsWith(".pdf")) {
        try {
          const dataBuffer = fs.readFileSync(filePath);
          const pdfData = await pdf(dataBuffer);
          text = pdfData.text;
        } catch (error) {
          console.error('Local PDF error:', error);
        }
      } else {
        try {
          const result = await Tesseract.recognize(filePath, "eng");
          text = result.data.text;
        } catch (error) {
          console.error('Local image OCR error:', error);
        }
      }
    }
 const cleanedText = cleanOCRText(text);
    // Enhanced amount extraction
    const amountRegexes = [
      /(?:Total|Amount|Total Amount|Balance Due|Balance|Amount Due|TOTAL|AMOUNT)[\s\D]*([\d,]+(?:\.\d{1,2})?)(?:\s?(?:rwf|RWF|frw|FRW))?/i,
      /([\d,]+(?:\.\d{1,2})?)(?:\s?(?:rwf|RWF|frw|FRW))/i,
      /\b([\d,]+\.\d{2})\b/
    ];

    let amount = null;
    for (const regex of amountRegexes) {
      const match = text.match(regex);
      if (match && match[1]) {
        amount = parseFloat(match[1].replace(/,/g, ""));
        break;
      }
    }

    // Enhanced date extraction  
    const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})|(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})/i;
    const dateMatch = text.match(dateRegex);
    let date = null;
    
    if (dateMatch) {
      try {
        date = new Date(dateMatch[0]);
        // Check if date is valid
        if (isNaN(date.getTime())) {
          date = null;
        }
      } catch {
        date = null;
      }
    }

    return { amount, date };
  } catch (error) {
    console.error('Error in extractReceiptData:', error);
    return { amount: null, date: null };
  }
}
function cleanOCRText(text: string): string {
  if (!text) return '';
  const patternsToRemove = [
    /send empty value/gi,
    /loading/gi,
    /predictor/gi,
    /reconciliation/gi,
    /additional description/gi,
    /daily expenses/gi,
    /business trip/gi,
    /description:/gi,
    /responses/gi,
    /index/gi,
    /file name/gi,
    /file content/gi,
    /^#.*$/gm,
    /^-.*$/gm,
    /^\d+\.\s.*$/gm, 
  ];
let cleanedText = text;
  for (const pattern of patternsToRemove) {
    cleanedText = cleanedText.replace(pattern, '');
  }
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
  return cleanedText;
}
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  createdAt: string;
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(request: NextRequest) {
  // Body ko pehle parse karo taake fallback me bhi access ho sake
  let query: string = "";
  let products: Product[] = [];

  try {
    const body = await request.json();
    query = body.query || "";
    products = body.products || [];
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {

    // Agar query empty hai to sab products return karo
    if (!query.trim()) {
      return NextResponse.json(products);
    }

    // Agar GROQ_API_KEY nahi hai to basic filtering fallback
    if (!process.env.GROQ_API_KEY) {
      const q = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
      return NextResponse.json(filtered);
    }

    // Groq ko search query aur products bhejo
    const productContext = products
      .map(
        (p, i) =>
          `${i}. "${p.name}" - $${p.price} - ${p.description.slice(0, 100)}`
      )
      .join("\n");

    const systemPrompt = `You are a smart semantic search assistant for an e-commerce store. 
Given a search query and a numbered list of products, find ALL products that are relevant to the query.

Search rules:
- Understand search intent and semantics (e.g., "phone" matches "iPhone", "shoes" matches "sneakers")
- Match by product name, description, category, and price range
- Return ALL relevant products sorted by relevance (most relevant first)
- Think about synonyms and related terms`;

    const userPrompt = `Search query: "${query}"

Products:
${productContext}

Return ONLY a JSON object in this exact format (no markdown, no explanation):
{ "matching_indices": [0, 2, 5] }

If no products match, return: { "matching_indices": [] }`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.1,
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      // Fallback
      const q = query.toLowerCase();
      return NextResponse.json(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        )
      );
    }

    const parsed = JSON.parse(content);
    const indices: number[] = parsed.matching_indices || [];

    // Validate indices
    const validIndices = indices.filter(
      (i: number) => Number.isInteger(i) && i >= 0 && i < products.length
    );

    if (validIndices.length === 0) {
      return NextResponse.json([]);
    }

    // Sort by relevance (same order as indices returned by AI)
    const filtered = validIndices.map((i: number) => products[i]);
    return NextResponse.json(filtered);
  } catch (error) {
    console.error("AI Search error:", error);

    // Fallback: basic text filtering (query/products already parsed above)
    const q = query.toLowerCase();
    return NextResponse.json(
      products.filter(
        (p: Product) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    );
  }
}

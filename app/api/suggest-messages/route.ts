import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. These question are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      prompt,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Unexpected error occurred", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const classifyImage = async (base64Image: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64ImageData: base64Image }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error classifying image:", error);
    throw error;
  }
};

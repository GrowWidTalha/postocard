// Update design
export async function updateDesign(id: string, data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Create design
  export async function createDesign(data: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),

    });
    return response.json();
  }

  // Delete design
  export async function deleteDesign(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }

  // Get all designs
  export async function getAllDesigns() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs`);
    return response.json();
  }

  // Get design by ID
  export async function getDesignById(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/designs/${id}`);
    return response.json();
  }

// "use server";

// import { db } from "../../../db";

export const getAllCategories = async () => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'; // Default if not set
    const response = await fetch(`${apiBaseUrl}/api/categories`); // Calls GET /api/categories

    if (!response.ok) {
      const errorData = await response.json(); // Assuming error response is JSON
      console.error(
        `API error fetching all categories (${response.status}):`,
        errorData.error || errorData.message || response.statusText
      );
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const result = await response.json();
    // The backend returns { data: categories, error: null, success: true }
    // So, we should return result.data
    if (result.success) {
      return result.data;
    }
    // Handle cases where success is false but response was ok (e.g. 200 but logical error)
    console.error("API call for all categories not successful:", result.error);
    throw new Error(result.error || "Failed to fetch categories due to a server issue.");

  } catch (error: any) {
    console.error(
      "Something went wrong while fetching all categories:",
      error.message || error.stack // error.message is more useful if it's an Error instance
    );
    throw error; // Re-throw to be caught by the caller
  }
};

export const getSubCategoriesByCategoryName = async (name: string) => {
  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'; // Default if not set
    const response = await fetch(`${apiBaseUrl}/api/categories/name/${encodeURIComponent(name)}/subcategories`);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        `API error fetching subcategories by category name (${response.status}):`,
        errorData
      );
      throw new Error(`Failed to fetch subcategories. Status: ${response.status}`);
    }

    const subCategories = await response.json();
    return subCategories;
  } catch (error: any) {
    console.error(
      "Something went wrong while fetching subcategories by category name:",
      error.stack || error.message
    );
    throw error;
  }
};

export const getDesignsBySubCategory = async (subCategoryId: string) => {
  try {
    // Ensure the API_BASE_URL is configured, e.g., from environment variables
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'; // Default if not set
    const response = await fetch(`${apiBaseUrl}/api/designs/subcategory/${subCategoryId}`);

    if (!response.ok) {
      // Log more details for debugging
      const errorData = await response.text(); // or response.json() if the error is JSON
      console.error(
        `API error fetching designs by subcategory (${response.status}):`,
        errorData
      );
      throw new Error(`Failed to fetch designs. Status: ${response.status}`);
    }

    const designs = await response.json();
    return designs;
  } catch (error: any) {
    console.error(
      "Something went wrong while fetching designs by subcategory:",
      error.stack || error.message
    );
    // Optionally, re-throw or return a specific error structure for the UI to handle
    throw error; // Re-throwing the error to be caught by the caller
  }
};

// export const getDesignById = async (id: string) => {
//   try {
//     const design = await db.design.findFirst({
//       where: { id: id, published: true },
//     });

//     return design
//   } catch (error: any) {
//     console.log("Something went wrong fetching design: ", error.stack)
//   }
// };

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

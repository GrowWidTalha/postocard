const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export const getAllBlogs = async () => {
  try {
    const res = await fetch(`${API_URL}/api/blogs`);
    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const getBlogById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`);
    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const createBlog = async ({
  title,
  content,
  imageUrl,
  slug,
  author,
  published,
}: {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  author: string;
  published: boolean;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, imageUrl, slug, author, published }),
    });

    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const updateBlog = async ({
  title,
  content,
  imageUrl,
  slug,
  published,
  id,
}: {
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  published: boolean;
  id: string;
}) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, imageUrl, slug, published }),
    });

    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const publishBlog = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}/publish`, {
      method: "POST",
    });

    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

export const unpublishBlog = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${id}/unpublish`, {
      method: "POST",
    });

    const data = await res.json();

    return data
  } catch (error: any) {
    console.error(error);
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};

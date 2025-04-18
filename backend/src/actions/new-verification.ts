
export const newVerification = async (token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/new-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || "Something went wrong" };
    }

    return { success: data.message || "Email verified successfully" };
  } catch (error) {
    console.error('Error in new verification:', error);
    return { error: "Something went wrong" };
  }
};

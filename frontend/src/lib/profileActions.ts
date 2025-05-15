export const updateUserProfile = async (
  profileId: string,
  token: string,
  profileData: { phone: string; address: string }
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(
      `https://pinebank.onrender.com/profile/${profileId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        message: data.message || "An error occurred while updating profile.",
      };
    }
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred.",
    };
  }
};

export const fetchTransactions = async (
  accountNumber: string,
  token: string
) => {
  try {
    const response = await fetch(
      "https://pinebank.onrender.com/transaction/get",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ accountNumber }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Transaction fetch failed:", errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    return data.transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await fetch("https://pinebank.onrender.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const data = await response.json();
    return data.user.userProfile;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const createProfile = async (
  token: string,
  userProfile: {
    image?: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    userId: string;
  }
) => {
  const response = await fetch("https://pinebank.onrender.com/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userProfile),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Failed to create profile");
  }

  return response.json();
};

export const createBankAccount = async (token: string) => {
  const response = await fetch("https://pinebank.onrender.com/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ balance: 10000 }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Failed to create bank account");
  }

  return response.json();
};

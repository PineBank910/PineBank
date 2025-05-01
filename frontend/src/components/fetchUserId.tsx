"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@/context/userContext";

const FetchUserId = () => {
    const { getToken, isLoaded, isSignedIn, userId } = useAuth();
    const { setUserId } = useUser();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            if (userId) {
                setUserId(userId);
                console.log("Fetched userId from Clerk:", userId);
            } else {
                const fetchUser = async () => {
                    try {
                        const token = await getToken();
                        const res = await fetch("https://pinebank.onrender.com/users", {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (!res.ok) {
                            console.error("Failed to fetch backend user");
                            return;
                        }

                        const data = await res.json();

                        if (data.user?.id) {
                            setUserId(data.user.id);
                            console.log("Fetched real userId from backend:", data.user.id);
                        } else {
                            console.error("No user id returned from backend");
                        }
                    } catch (err) {
                        console.error("Error fetching user:", err);
                    }
                };

                fetchUser();
            }
        } else {
            console.log("Clerk session is not yet loaded or user is not signed in");
        }
    }, [isLoaded, isSignedIn, userId, getToken, setUserId]);

    return null;
};

export default FetchUserId;

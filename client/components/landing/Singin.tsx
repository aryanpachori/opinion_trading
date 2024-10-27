"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import login from "@/public/login.png"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react"; 
import { LoaderCircle } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export function Login() {
    const { data: session, status } = useSession(); 
    const isLoading = status === "loading"; 

    async function handleSignIn() {
        const result = await signIn("google", { redirect: false }); 

        if (result?.error) {
            toast.error("Error signing in, please try again.");
        } else {
            toast.success("Successfully signed in!");
        }
    }

    async function handleSignOut() {
        await signOut({ redirect: false }); 
        toast.success("Successfully signed out!");
    }

    return (
        <div className="w-full lg:grid lg:min-h-[600px] h-screen lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center font-bold">{session ? "Welcome back!" : "Sign in with Google"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {session ? (
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-4">Logged in as {session.user.email}</p>
                                <Button className="w-full mb-4" onClick={handleSignOut} disabled={isLoading}>
                                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign Out"}
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <p className="text-sm text-gray-500 mb-4">Sign in to continue</p>
                                <Button className="w-full mb-4" onClick={handleSignIn} disabled={isLoading}>
                                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Sign In with Google"}
                                </Button>
                            </div>
                        )}
                        <p className="text-xs text-gray-500 mt-5">
                            By continuing, you accept that you are 18+ years of age & agree to the{' '}
                            <a href="#" className="text-blue-500 hover:underline">
                                Terms and Conditions
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="relative overflow-hidden flex justify-center items-center">
                <div className="bg-muted">
                    <Image
                        src={login}
                        alt="Image"
                        width="1920"
                        height="1000"
                        className="object-cover"
                    />
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    )
}

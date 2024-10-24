"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import login from "@/public/login.png"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react"
import { InputOTPForm } from "../ui/OtpVerificationForm"
import { sendSMSOTP } from "@/actions/OTP/sendOtp"
import { LoaderCircle } from "lucide-react"
import {toast, Toaster} from "react-hot-toast";

export function Login() {
    const [phone, setPhone] = useState<string>("");
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    async function handleSubmit() {
        setIsLoading(true);
        
        if (phone.length !== 10) {
            toast.error("Incorrect Phone!");
            setPhone('')
            return;
        }
        // TODO: not a good way, need to fix it.
        const isOtpSent = await sendSMSOTP(`+91${phone}`);
        
        if(isOtpSent.success){
            toast.success("OTP Sent!");
        }else{
            toast.error("Error while sending OTP, Please check your phone number");    
        }
        setShowOtp(true);
    }
    return (
        <div className="w-full lg:grid lg:min-h-[600px] h-screen lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center font-bold">{showOtp ? "Enter your OTP" : "Enter your mobile number"}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {showOtp ? <div className="w-full flex flex-col justify-center items-center">
                            <InputOTPForm phoneNumber={`+91${phone}`}/>
                        </div> : <> <p className="text-sm text-gray-500 mb-4">We will send you an OTP</p>
                            <div className="flex mb-4">
                                <Input
                                    className="w-16 mr-2"
                                    type="text"
                                    value="+91"
                                    disabled
                                />
                                <Input
                                    className="flex-grow"
                                    type="tel"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <Button className="w-full mb-4" onClick={handleSubmit} disabled={isLoading ? true : false}>{!isLoading ? "Get OTP" : <LoaderCircle className="animate-spin"/> }</Button></>}
                        <p className="text-xs text-gray-500 mt-5">
                            By continuing, you accept that you are 18+ years of age & agree to the{' '}
                            <a href="#" className="text-blue-500 hover:underline">
                                Terms and Conditions
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="relative  overflow-hidden flex justify-center items-center">
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
            <Toaster position="top-center"/>
        </div>
    )
}
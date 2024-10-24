"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySMSOTPAction } from "@/actions/OTP/validateOtp";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface InputOTPFormProps {
  phoneNumber: string;
}
const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
export function InputOTPForm({ phoneNumber }: InputOTPFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setIsLoading(true);

    const isVerified = await verifySMSOTPAction(data.otp, phoneNumber);
    console.log(isVerified);
    
    const res = await signIn("credentials", {
      redirect: false,
      phoneNumber,
      isVerified: isVerified.verified,
    });
    console.log(res);

    if (isVerified.verified && res?.ok) {
      toast.success("User created successfully!");
      router.push("/");
    } else {
      toast.error("Error while creating user!");
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-3" disabled={isLoading}>
          {!isLoading ? "Submit" : <Loader2 className="animate-spin" />}
        </Button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </Form>
  );
}


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cuisineOptions } from "@/lib/cuisine-options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";


const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  phoneNumber: z.string().optional(),
  accountType: z.enum(["customer", "foodTruck"], {
    required_error: "You need to select an account type.",
  }),
  foodTruckName: z.string().optional(),
  cuisines: z.array(z.string()).optional(),
  website: z.string().url("Invalid URL format").optional().or(z.literal('')),
  logoUrl: z.string().url("Invalid URL format for logo").optional().or(z.literal('')),
  logoFile: z.preprocess(
    (val) => {
      // Handle server-side rendering where FileList might not be defined
      if (typeof window === 'undefined') return null;
      if (typeof FileList !== 'undefined' && val instanceof FileList && val.length === 0) {
        return null;
      }
      return val;
    },
    (typeof window !== 'undefined' && typeof FileList !== 'undefined' ? z.instanceof(FileList) : z.any())
      .nullable()
      .optional()
      .refine(
        (files) => {
          if (typeof window === 'undefined' || typeof FileList === 'undefined' || !files) return true;
          return files.length <= 1;
        },
        { message: 'Please select a single file for the logo.' }
      )
      .refine(
        (files) => {
          if (typeof window === 'undefined' || typeof FileList === 'undefined' || !files || (files instanceof FileList && files.length === 0)) return true;
          return files instanceof FileList && files[0] && files[0].size <= MAX_FILE_SIZE_BYTES;
        },
        { message: `Logo file size must be ${MAX_FILE_SIZE_MB}MB or less.` }
      )
      .refine(
        (files) => {
          if (typeof window === 'undefined' || typeof FileList === 'undefined' || !files || (files instanceof FileList && files.length === 0)) return true;
          return files instanceof FileList && files[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type);
        },
        { message: 'Invalid file type. Accepted: JPG, PNG, GIF, SVG.' }
      )
  ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.accountType === "foodTruck") {
    return !!data.foodTruckName && data.foodTruckName.length > 0;
  }
  return true;
}, {
  message: "Food truck name is required for food truck accounts",
  path: ["foodTruckName"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "", // Ensure defined default
      confirmPassword: "", // Ensure defined default
      phoneNumber: "",
      accountType: "customer",
      foodTruckName: "",
      cuisines: [],
      website: "",
      logoUrl: "",
      logoFile: undefined,
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    const {
      name,
      email,
      password,
      phoneNumber,
      accountType,
      foodTruckName,
      cuisines,
      website,
      logoUrl,
      logoFile
    } = values;

    const metadata: Record<string, any> = {
      full_name: name,
      account_type: accountType,
    };

    if (phoneNumber) {
      metadata.phone = phoneNumber;
    }

    if (accountType === 'foodTruck') {
      if (foodTruckName) {
        metadata.food_truck_name = foodTruckName;
      }
      if (cuisines && cuisines.length > 0) {
        metadata.cuisines = cuisines;
      }
      if (website) {
        metadata.website = website;
      }
      if (logoUrl) {
        metadata.logo_url = logoUrl;
      }
      // Note: Actual logoFile upload to Supabase Storage is not implemented here.
      // This would typically involve uploading the file and then storing the resulting URL.
      if (logoFile && logoFile.length > 0) {
        console.log("Logo file selected:", logoFile[0].name, "but not uploaded yet.");
        // metadata.logo_storage_path = 'path_to_uploaded_logo_in_storage'; // Example
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: metadata,
        // emailRedirectTo: `${window.location.origin}/auth/callback`, // Optional: if email confirmation is enabled
      },
    });

    if (error) {
      toast({
        title: "Sign Up Error",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
      toast({
        title: "Sign Up Successful!",
        description: data.user.user_metadata?.email_confirmed ? "You can now log in." : "Please check your email to confirm your account.",
      });
      router.push("/login");
    }
  }

  const handleLogoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    form.setValue('logoFile', files, { shouldValidate: true });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>I am a...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="customer" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Customer (Looking for food trucks)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="foodTruck" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Food Truck Owner/Operator
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("accountType") === "foodTruck" && (
              <>
                <FormField
                  control={form.control}
                  name="foodTruckName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Truck Name</FormLabel>
                      <FormControl>
                        <Input placeholder="My Awesome Food Truck" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://mytruck.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://example.com/logo.png" {...field} />
                      </FormControl>
                       <FormDescription>
                        Link to an image of your food truck's logo. Alternatively, upload a file below.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="logoFile"
                  render={({ field: { onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>Upload Logo (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onBlur={onBlur}
                          name={name}
                          ref={ref}
                          onChange={handleLogoFileChange}
                        />
                      </FormControl>
                       <FormDescription>
                        Upload an image file (PNG, JPG, GIF, SVG, max {MAX_FILE_SIZE_MB}MB). This will be used if no URL is provided or if preferred.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuisines"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Cuisine Types (Optional)</FormLabel>
                        <FormDescription>
                          Select all that apply to your food truck.
                        </FormDescription>
                      </div>
                      <ScrollArea className="h-40 w-full rounded-md border p-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                          {cuisineOptions.map((cuisine) => (
                            <FormField
                              key={cuisine.id}
                              control={form.control}
                              name="cuisines"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={cuisine.id}
                                    className="flex flex-row items-center space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(cuisine.id)}
                                        onCheckedChange={(checked) => {
                                          const currentValue = field.value || [];
                                          return checked
                                            ? field.onChange([...currentValue, cuisine.id])
                                            : field.onChange(
                                                currentValue.filter(
                                                  (value) => value !== cuisine.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {cuisine.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

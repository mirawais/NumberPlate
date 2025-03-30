import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SiteSettings {
  primaryColor: string;
  siteName: string;
  footerText: string;
  showAdminLink: boolean;
  showPrices: boolean;
  enablePayPal: boolean;
  paypalClientId?: string;
}

export default function AdminSiteSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Default settings
  const defaultSettings: SiteSettings = {
    primaryColor: '#e11d48',
    siteName: 'Number Plate Customizer',
    footerText: '© 2024 Number Plate Customizer. All rights reserved.',
    showAdminLink: true,
    showPrices: true,
    enablePayPal: false,
    paypalClientId: ''
  };

  const form = useForm<SiteSettings>({
    defaultValues: defaultSettings
  });

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings');
        if (response.ok) {
          const data = await response.json();
          form.reset(data);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load site settings',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [form, toast]);

  const mutation = useMutation({
    mutationFn: async (data: SiteSettings) => {
      const response = await apiRequest('POST', '/api/admin/settings', data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Site settings saved successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to save site settings: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleSubmit = (data: SiteSettings) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>Manage general settings for your license plate customization site</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Settings</h3>
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Number Plate Customizer" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed in the header and browser tab.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primaryColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <Input placeholder="#e11d48" {...field} />
                          <input
                            type="color"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-10 h-10 rounded cursor-pointer"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Main color for buttons and accents.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="footerText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Footer Text</FormLabel>
                      <FormControl>
                        <Input placeholder="© 2024 Number Plate Customizer..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Copyright and additional info for the footer.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Options</h3>
                <FormField
                  control={form.control}
                  name="showAdminLink"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Show Admin Link</FormLabel>
                        <FormDescription>
                          Display admin link in the header.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="showPrices"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Show Prices</FormLabel>
                        <FormDescription>
                          Display prices for customization options.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Settings</h3>
                <FormField
                  control={form.control}
                  name="enablePayPal"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable PayPal</FormLabel>
                        <FormDescription>
                          Allow customers to pay with PayPal.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("enablePayPal") && (
                  <FormField
                    control={form.control}
                    name="paypalClientId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PayPal Client ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Your PayPal Client ID" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter your PayPal client ID for payment integration.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={mutation.isPending || isLoading}
                  className="min-w-[120px]"
                >
                  {mutation.isPending ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
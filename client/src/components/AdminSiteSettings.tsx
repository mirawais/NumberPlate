import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';

interface SiteSettings {
  primaryColor: string;
  siteName: string;
  footerText: string;
  showAdminLink: boolean;
  showPrices: boolean;
  enablePayPal: boolean;
  paypalClientId?: string;
}

const settingsSchema = z.object({
  primaryColor: z.string().min(4, { message: 'Color code is required' }),
  siteName: z.string().min(1, { message: 'Site name is required' }),
  footerText: z.string(),
  showAdminLink: z.boolean(),
  showPrices: z.boolean(),
  enablePayPal: z.boolean(),
  paypalClientId: z.string().optional(),
});

export default function AdminSiteSettings() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const defaultSettings: SiteSettings = {
    primaryColor: '#0078D7',
    siteName: 'Number Plate Customizer',
    footerText: '© 2025 Number Plate Customizer. All rights reserved.',
    showAdminLink: true,
    showPrices: true,
    enablePayPal: false,
  };

  const { data: settings = defaultSettings, isLoading } = useQuery<SiteSettings>({
    queryKey: ['/api/admin/settings'],
  });

  const form = useForm<SiteSettings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
    values: settings,
  });

  const mutation = useMutation({
    mutationFn: async (data: SiteSettings) => {
      return apiRequest({
        url: '/api/admin/settings',
        method: 'POST',
        data,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Settings saved successfully',
        description: 'The site settings have been updated.',
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: 'Error saving settings',
        description: 'There was a problem saving your settings. Please try again.',
        variant: 'destructive',
      });
      console.error('Error saving settings:', error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (data: SiteSettings) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>
          Configure how the site appears and functions for customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      The name displayed in the header and browser tab
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
                    <div className="flex gap-2">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <div 
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                    <FormDescription>
                      The main color used throughout the site (hex code)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="footerText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footer Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Text displayed in the footer of the site
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="showAdminLink"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Show Admin Link
                      </FormLabel>
                      <FormDescription>
                        Display a link to the admin portal on the main site
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="showPrices"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Show Prices
                      </FormLabel>
                      <FormDescription>
                        Display prices for options throughout the site
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="enablePayPal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Enable PayPal Payments
                    </FormLabel>
                    <FormDescription>
                      Allow customers to pay via PayPal
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch('enablePayPal') && (
              <FormField
                control={form.control}
                name="paypalClientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PayPal Client ID</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormDescription>
                      Your PayPal Client ID from the PayPal Developer Dashboard
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
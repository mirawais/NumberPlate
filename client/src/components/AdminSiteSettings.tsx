import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

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
  const [activeTab, setActiveTab] = useState('appearance');

  // Fetch site settings from API
  const { data: fetchedSettings, isLoading } = useQuery({
    queryKey: ['/api/admin/settings']
  });
  
  // Update settings when data is fetched
  useEffect(() => {
    if (fetchedSettings) {
      setSettings(fetchedSettings as SiteSettings);
      form.reset(fetchedSettings as SiteSettings);
    }
  }, [fetchedSettings, form]);
  
  // Initialize with default values until API responds
  const [settings, setSettings] = useState<SiteSettings>({
    primaryColor: '#e63946', // Red color from current design
    siteName: 'Number Plate Customizer',
    footerText: '© 2025 Number Plate Customizer. All rights reserved.',
    showAdminLink: true,
    showPrices: true,
    enablePayPal: true,
    paypalClientId: '',
  });

  const form = useForm<SiteSettings>({
    defaultValues: settings,
  });

  // Update form when settings change
  useEffect(() => {
    form.reset(settings);
  }, [settings, form]);

  // Use the actual API endpoint for updating settings
  const settingsMutation = useMutation({
    mutationFn: async (data: SiteSettings) => {
      const response = await apiRequest('PATCH', '/api/admin/settings', data);
      return await response.json();
    },
    onSuccess: (data) => {
      setSettings(data);
      toast({
        title: 'Success',
        description: 'Site settings updated successfully',
      });
      
      // Update theme
      updateThemeColor(data.primaryColor);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update settings: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleSubmit = (data: SiteSettings) => {
    settingsMutation.mutate(data);
  };

  // Update theme.json color
  const updateThemeColor = (colorHex: string) => {
    // In a real implementation, this would call an API to update theme.json
    console.log(`Color theme would be updated to: ${colorHex}`);
    
    // For demo, we'll update CSS variables directly
    document.documentElement.style.setProperty('--primary', colorHex);
  };

  // Preview the color changes without saving
  const handleColorPreview = (color: string) => {
    document.documentElement.style.setProperty('--primary', color);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
      
      <Tabs defaultValue="appearance" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the visual appearance of your website
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Color</FormLabel>
                        <div className="flex gap-4 items-center">
                          <FormControl>
                            <Input
                              {...field}
                              type="color"
                              className="w-16 h-10"
                              onChange={(e) => {
                                field.onChange(e);
                                handleColorPreview(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e);
                                handleColorPreview(e.target.value);
                              }}
                              className="w-36"
                            />
                          </FormControl>
                        </div>
                        <FormDescription>
                          Used for buttons, accents, and the sidebar background
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-4 mt-6">
                    <div className="w-1/4 bg-neutral-100 p-4 rounded-md">
                      <div className="mb-2 text-sm text-neutral-500">Color Preview</div>
                      <div className="flex flex-col gap-2">
                        <div 
                          className="w-full h-10 rounded-md flex items-center justify-center text-white"
                          style={{ backgroundColor: form.watch('primaryColor') }}
                        >
                          Button
                        </div>
                        <div 
                          className="w-full h-10 border-2 rounded-md flex items-center justify-center"
                          style={{ borderColor: form.watch('primaryColor') }}
                        >
                          Border
                        </div>
                        <div className="w-full h-10 flex gap-2">
                          <div
                            className="flex-1 h-full rounded-md" 
                            style={{ backgroundColor: form.watch('primaryColor') }}
                          ></div>
                          <div
                            className="flex-1 h-full rounded-md opacity-70" 
                            style={{ backgroundColor: form.watch('primaryColor') }}
                          ></div>
                          <div
                            className="flex-1 h-full rounded-md opacity-40" 
                            style={{ backgroundColor: form.watch('primaryColor') }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-3/4 bg-neutral-100 p-4 rounded-md">
                      <div className="mb-2 text-sm text-neutral-500">Layout Preview</div>
                      <div className="flex flex-col h-48 border border-neutral-300 rounded-md overflow-hidden">
                        <div className="bg-neutral-800 text-white p-2 flex justify-between">
                          <span className="text-xs">Header</span>
                          <span 
                            className="text-xs px-2 rounded"
                            style={{ backgroundColor: form.watch('primaryColor') }}
                          >
                            Button
                          </span>
                        </div>
                        <div className="flex flex-1">
                          <div 
                            className="w-1/4 p-2 text-white"
                            style={{ backgroundColor: form.watch('primaryColor') }}
                          >
                            <span className="text-xs">Sidebar</span>
                          </div>
                          <div className="flex-1 p-2">
                            <span className="text-xs">Content Area</span>
                            <div className="flex items-center gap-2 mt-2">
                              <div 
                                className="w-16 h-6 rounded text-xs text-white flex items-center justify-center"
                                style={{ backgroundColor: form.watch('primaryColor') }}
                              >
                                Button
                              </div>
                              <span 
                                className="text-xs"
                                style={{ color: form.watch('primaryColor') }}
                              >
                                Colored text
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Settings</CardTitle>
                  <CardDescription>
                    Customize text content that appears on your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                          Appears in the browser title and headers
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
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Appears at the bottom of every page
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Settings</CardTitle>
                  <CardDescription>
                    Toggle features on and off
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                            Display the admin panel link on the main page
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
                            Display prices for customization options
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>
                    Configure payment methods and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="enablePayPal"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable PayPal
                          </FormLabel>
                          <FormDescription>
                            Allow payments via PayPal
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
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Your PayPal client ID for processing payments
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="mt-6 flex justify-end">
              <Button 
                type="submit" 
                className="px-6"
                disabled={settingsMutation.isPending}
              >
                {settingsMutation.isPending ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
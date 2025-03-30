import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Badge, BadgeColor, TextStyle, BorderColor, PlateSurround, PlateType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from 'react-hook-form';
import { formatPrice } from '@/lib/utils';

export default function AdminOptions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('badges');
  
  // Badges
  const { data: badges = [] } = useQuery<Badge[]>({
    queryKey: ['/api/admin/options/badges']
  });
  
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);
  
  const badgeForm = useForm<Badge>({
    defaultValues: {
      id: 0,
      name: '',
      code: '',
      price: 0,
      imageUrl: ''
    }
  });
  
  const resetBadgeForm = () => {
    badgeForm.reset({
      id: 0,
      name: '',
      code: '',
      price: 0,
      imageUrl: ''
    });
    setEditingBadge(null);
  };
  
  const handleEditBadge = (badge: Badge) => {
    setEditingBadge(badge);
    badgeForm.reset(badge);
    setBadgeDialogOpen(true);
  };
  
  const handleAddNewBadge = () => {
    resetBadgeForm();
    setBadgeDialogOpen(true);
  };
  
  const badgeMutation = useMutation({
    mutationFn: async (badge: Badge) => {
      const method = badge.id ? 'PATCH' : 'POST';
      const url = badge.id ? `/api/admin/options/badges/${badge.id}` : '/api/admin/options/badges';
      const response = await apiRequest(method, url, badge);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/options/badges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/options/badges'] });
      toast({
        title: 'Success',
        description: `Badge ${editingBadge ? 'updated' : 'added'} successfully.`,
      });
      setBadgeDialogOpen(false);
      resetBadgeForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${editingBadge ? 'update' : 'add'} badge: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const handleBadgeSubmit = (data: Badge) => {
    badgeMutation.mutate(data);
  };
  
  // Badge Colors
  const { data: badgeColors = [] } = useQuery<BadgeColor[]>({
    queryKey: ['/api/admin/options/badge-colors']
  });
  
  const [badgeColorDialogOpen, setBadgeColorDialogOpen] = useState(false);
  const [editingBadgeColor, setEditingBadgeColor] = useState<BadgeColor | null>(null);
  
  const badgeColorForm = useForm<BadgeColor>({
    defaultValues: {
      id: 0,
      name: '',
      hexCode: '#000000'
    }
  });
  
  const resetBadgeColorForm = () => {
    badgeColorForm.reset({
      id: 0,
      name: '',
      hexCode: '#000000'
    });
    setEditingBadgeColor(null);
  };
  
  const handleEditBadgeColor = (badgeColor: BadgeColor) => {
    setEditingBadgeColor(badgeColor);
    badgeColorForm.reset(badgeColor);
    setBadgeColorDialogOpen(true);
  };
  
  const handleAddNewBadgeColor = () => {
    resetBadgeColorForm();
    setBadgeColorDialogOpen(true);
  };
  
  const badgeColorMutation = useMutation({
    mutationFn: async (badgeColor: BadgeColor) => {
      const method = badgeColor.id ? 'PATCH' : 'POST';
      const url = badgeColor.id ? `/api/admin/options/badge-colors/${badgeColor.id}` : '/api/admin/options/badge-colors';
      const response = await apiRequest(method, url, badgeColor);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/options/badge-colors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/options/badge-colors'] });
      toast({
        title: 'Success',
        description: `Badge color ${editingBadgeColor ? 'updated' : 'added'} successfully.`,
      });
      setBadgeColorDialogOpen(false);
      resetBadgeColorForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${editingBadgeColor ? 'update' : 'add'} badge color: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const handleBadgeColorSubmit = (data: BadgeColor) => {
    badgeColorMutation.mutate(data);
  };
  
  // Text Styles
  const { data: textStyles = [] } = useQuery<TextStyle[]>({
    queryKey: ['/api/admin/options/text-styles']
  });
  
  const [textStyleDialogOpen, setTextStyleDialogOpen] = useState(false);
  const [editingTextStyle, setEditingTextStyle] = useState<TextStyle | null>(null);
  
  const textStyleForm = useForm<TextStyle>({
    defaultValues: {
      id: 0,
      name: '',
      style: '',
      price: 0
    }
  });
  
  const resetTextStyleForm = () => {
    textStyleForm.reset({
      id: 0,
      name: '',
      style: '',
      price: 0
    });
    setEditingTextStyle(null);
  };
  
  const handleEditTextStyle = (textStyle: TextStyle) => {
    setEditingTextStyle(textStyle);
    textStyleForm.reset(textStyle);
    setTextStyleDialogOpen(true);
  };
  
  const handleAddNewTextStyle = () => {
    resetTextStyleForm();
    setTextStyleDialogOpen(true);
  };
  
  const textStyleMutation = useMutation({
    mutationFn: async (textStyle: TextStyle) => {
      const method = textStyle.id ? 'PATCH' : 'POST';
      const url = textStyle.id ? `/api/admin/options/text-styles/${textStyle.id}` : '/api/admin/options/text-styles';
      const response = await apiRequest(method, url, textStyle);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/options/text-styles'] });
      queryClient.invalidateQueries({ queryKey: ['/api/options/text-styles'] });
      toast({
        title: 'Success',
        description: `Text style ${editingTextStyle ? 'updated' : 'added'} successfully.`,
      });
      setTextStyleDialogOpen(false);
      resetTextStyleForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${editingTextStyle ? 'update' : 'add'} text style: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const handleTextStyleSubmit = (data: TextStyle) => {
    textStyleMutation.mutate(data);
  };
  
  // Border Colors
  const { data: borderColors = [] } = useQuery<BorderColor[]>({
    queryKey: ['/api/admin/options/border-colors']
  });
  
  const [borderColorDialogOpen, setBorderColorDialogOpen] = useState(false);
  const [editingBorderColor, setEditingBorderColor] = useState<BorderColor | null>(null);
  
  const borderColorForm = useForm<BorderColor>({
    defaultValues: {
      id: 0,
      name: '',
      hexCode: '#000000'
    }
  });
  
  const resetBorderColorForm = () => {
    borderColorForm.reset({
      id: 0,
      name: '',
      hexCode: '#000000'
    });
    setEditingBorderColor(null);
  };
  
  const handleEditBorderColor = (borderColor: BorderColor) => {
    setEditingBorderColor(borderColor);
    borderColorForm.reset(borderColor);
    setBorderColorDialogOpen(true);
  };
  
  const handleAddNewBorderColor = () => {
    resetBorderColorForm();
    setBorderColorDialogOpen(true);
  };
  
  const borderColorMutation = useMutation({
    mutationFn: async (borderColor: BorderColor) => {
      const method = borderColor.id ? 'PATCH' : 'POST';
      const url = borderColor.id ? `/api/admin/options/border-colors/${borderColor.id}` : '/api/admin/options/border-colors';
      const response = await apiRequest(method, url, borderColor);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/options/border-colors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/options/border-colors'] });
      toast({
        title: 'Success',
        description: `Border color ${editingBorderColor ? 'updated' : 'added'} successfully.`,
      });
      setBorderColorDialogOpen(false);
      resetBorderColorForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${editingBorderColor ? 'update' : 'add'} border color: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const handleBorderColorSubmit = (data: BorderColor) => {
    borderColorMutation.mutate(data);
  };
  
  // Plate Surrounds
  const { data: plateSurrounds = [] } = useQuery<PlateSurround[]>({
    queryKey: ['/api/admin/options/plate-surrounds']
  });
  
  const [plateSurroundDialogOpen, setPlateSurroundDialogOpen] = useState(false);
  const [editingPlateSurround, setEditingPlateSurround] = useState<PlateSurround | null>(null);
  
  const plateSurroundForm = useForm<PlateSurround>({
    defaultValues: {
      id: 0,
      name: '',
      style: '',
      price: 0
    }
  });
  
  const resetPlateSurroundForm = () => {
    plateSurroundForm.reset({
      id: 0,
      name: '',
      style: '',
      price: 0
    });
    setEditingPlateSurround(null);
  };
  
  const handleEditPlateSurround = (plateSurround: PlateSurround) => {
    setEditingPlateSurround(plateSurround);
    plateSurroundForm.reset(plateSurround);
    setPlateSurroundDialogOpen(true);
  };
  
  const handleAddNewPlateSurround = () => {
    resetPlateSurroundForm();
    setPlateSurroundDialogOpen(true);
  };
  
  const plateSurroundMutation = useMutation({
    mutationFn: async (plateSurround: PlateSurround) => {
      const method = plateSurround.id ? 'PATCH' : 'POST';
      const url = plateSurround.id ? `/api/admin/options/plate-surrounds/${plateSurround.id}` : '/api/admin/options/plate-surrounds';
      const response = await apiRequest(method, url, plateSurround);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/options/plate-surrounds'] });
      queryClient.invalidateQueries({ queryKey: ['/api/options/plate-surrounds'] });
      toast({
        title: 'Success',
        description: `Plate surround ${editingPlateSurround ? 'updated' : 'added'} successfully.`,
      });
      setPlateSurroundDialogOpen(false);
      resetPlateSurroundForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${editingPlateSurround ? 'update' : 'add'} plate surround: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const handlePlateSurroundSubmit = (data: PlateSurround) => {
    plateSurroundMutation.mutate(data);
  };
  
  // Plate Types
  const { data: plateTypes = [] } = useQuery<PlateType[]>({
    queryKey: ['/api/admin/options/plate-types']
  });
  
  const [plateTypeDialogOpen, setPlateTypeDialogOpen] = useState(false);
  const [editingPlateType, setEditingPlateType] = useState<PlateType | null>(null);
  
  const plateTypeForm = useForm<PlateType>({
    defaultValues: {
      id: 0,
      name: '',
      style: '',
      price: 0
    }
  });
  
  const resetPlateTypeForm = () => {
    plateTypeForm.reset({
      id: 0,
      name: '',
      style: '',
      price: 0
    });
    setEditingPlateType(null);
  };
  
  const handleEditPlateType = (plateType: PlateType) => {
    setEditingPlateType(plateType);
    plateTypeForm.reset(plateType);
    setPlateTypeDialogOpen(true);
  };
  
  const handleAddNewPlateType = () => {
    resetPlateTypeForm();
    setPlateTypeDialogOpen(true);
  };
  
  const plateTypeMutation = useMutation({
    mutationFn: async (plateType: PlateType) => {
      const method = plateType.id ? 'PATCH' : 'POST';
      const url = plateType.id ? `/api/admin/options/plate-types/${plateType.id}` : '/api/admin/options/plate-types';
      const response = await apiRequest(method, url, plateType);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/options/plate-types'] });
      queryClient.invalidateQueries({ queryKey: ['/api/options/plate-types'] });
      toast({
        title: 'Success',
        description: `Plate type ${editingPlateType ? 'updated' : 'added'} successfully.`,
      });
      setPlateTypeDialogOpen(false);
      resetPlateTypeForm();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to ${editingPlateType ? 'update' : 'add'} plate type: ${error.message}`,
        variant: 'destructive',
      });
    }
  });
  
  const handlePlateTypeSubmit = (data: PlateType) => {
    plateTypeMutation.mutate(data);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Manage Customization Options</h2>
      
      <Tabs defaultValue="badges" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full mb-6 grid grid-cols-6 h-auto">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="badgeColors">Badge Colors</TabsTrigger>
          <TabsTrigger value="textStyles">Text Styles</TabsTrigger>
          <TabsTrigger value="borderColors">Border Colors</TabsTrigger>
          <TabsTrigger value="plateSurrounds">Plate Surrounds</TabsTrigger>
          <TabsTrigger value="plateTypes">Plate Types</TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Manage badge options for license plates</CardDescription>
              </div>
              <Button onClick={handleAddNewBadge}>Add New Badge</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badges.map((badge) => (
                    <TableRow key={badge.id}>
                      <TableCell>{badge.id}</TableCell>
                      <TableCell>{badge.name}</TableCell>
                      <TableCell>{badge.code}</TableCell>
                      <TableCell>{formatPrice(badge.price)}</TableCell>
                      <TableCell>
                        {badge.imageUrl && (
                          <img 
                            src={badge.imageUrl} 
                            alt={badge.name} 
                            className="w-10 h-auto object-contain"
                          />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditBadge(badge)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Dialog open={badgeDialogOpen} onOpenChange={setBadgeDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBadge ? 'Edit Badge' : 'Add New Badge'}</DialogTitle>
                <DialogDescription>
                  {editingBadge ? 'Update the badge details.' : 'Enter details for the new badge.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...badgeForm}>
                <form onSubmit={badgeForm.handleSubmit(handleBadgeSubmit)} className="space-y-4">
                  <FormField
                    control={badgeForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="GB Badge" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
                        <FormControl>
                          <Input placeholder="gb" {...field} />
                        </FormControl>
                        <FormDescription>
                          Short code for the badge (e.g., gb, eu, uk, none)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            placeholder="4.99"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={badgeForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Badge Image</FormLabel>
                        <div className="space-y-2">
                          <FormControl>
                            <Input 
                              placeholder="/img/badges/gb_flag.svg" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Enter image URL or choose from available options:
                          </FormDescription>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => field.onChange('/img/badges/gb_flag.svg')}
                            >
                              GB Flag
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => field.onChange('/img/badges/eu_flag.svg')}
                            >
                              EU Flag
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              onClick={() => field.onChange('/img/badges/uk_flag.svg')}
                            >
                              UK Flag
                            </Button>
                          </div>
                          {field.value && (
                            <div className="mt-2">
                              <p className="text-sm font-medium mb-1">Preview:</p>
                              <div className="border rounded p-2 w-fit">
                                <img 
                                  src={field.value} 
                                  alt="Badge preview" 
                                  className="h-8 w-auto"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setBadgeDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={badgeMutation.isPending}>
                      {badgeMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="badgeColors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Badge Colors</CardTitle>
                <CardDescription>Manage badge background colors</CardDescription>
              </div>
              <Button onClick={handleAddNewBadgeColor}>Add New Color</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Hex Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {badgeColors.map((color) => (
                    <TableRow key={color.id}>
                      <TableCell>{color.id}</TableCell>
                      <TableCell>{color.name}</TableCell>
                      <TableCell>
                        <div 
                          className="w-6 h-6 rounded" 
                          style={{ backgroundColor: color.hexCode }}
                        ></div>
                      </TableCell>
                      <TableCell>{color.hexCode}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditBadgeColor(color)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Dialog open={badgeColorDialogOpen} onOpenChange={setBadgeColorDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBadgeColor ? 'Edit Badge Color' : 'Add New Badge Color'}</DialogTitle>
                <DialogDescription>
                  {editingBadgeColor ? 'Update the badge color details.' : 'Enter details for the new badge color.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...badgeColorForm}>
                <form onSubmit={badgeColorForm.handleSubmit(handleBadgeColorSubmit)} className="space-y-4">
                  <FormField
                    control={badgeColorForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Gold" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={badgeColorForm.control}
                    name="hexCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hex Color Code</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input placeholder="#FFD700" {...field} />
                            <input
                              type="color"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="w-10 h-10 rounded cursor-pointer"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setBadgeColorDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={badgeColorMutation.isPending}>
                      {badgeColorMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="textStyles">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Text Styles</CardTitle>
                <CardDescription>Manage text styles for license plates</CardDescription>
              </div>
              <Button onClick={handleAddNewTextStyle}>Add New Style</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Style</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {textStyles.map((style) => (
                    <TableRow key={style.id}>
                      <TableCell>{style.id}</TableCell>
                      <TableCell>{style.name}</TableCell>
                      <TableCell>{style.style}</TableCell>
                      <TableCell>{formatPrice(style.price)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditTextStyle(style)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Dialog open={textStyleDialogOpen} onOpenChange={setTextStyleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTextStyle ? 'Edit Text Style' : 'Add New Text Style'}</DialogTitle>
                <DialogDescription>
                  {editingTextStyle ? 'Update the text style details.' : 'Enter details for the new text style.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...textStyleForm}>
                <form onSubmit={textStyleForm.handleSubmit(handleTextStyleSubmit)} className="space-y-4">
                  <FormField
                    control={textStyleForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={textStyleForm.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style Code</FormLabel>
                        <FormControl>
                          <Input placeholder="standard" {...field} />
                        </FormControl>
                        <FormDescription>
                          Style code (e.g., standard, 3d, carbon)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={textStyleForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setTextStyleDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={textStyleMutation.isPending}>
                      {textStyleMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="borderColors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Border Colors</CardTitle>
                <CardDescription>Manage border colors for license plates</CardDescription>
              </div>
              <Button onClick={handleAddNewBorderColor}>Add New Color</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Hex Code</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {borderColors.map((color) => (
                    <TableRow key={color.id}>
                      <TableCell>{color.id}</TableCell>
                      <TableCell>{color.name}</TableCell>
                      <TableCell>
                        <div 
                          className="w-6 h-6 rounded" 
                          style={{ backgroundColor: color.hexCode }}
                        ></div>
                      </TableCell>
                      <TableCell>{color.hexCode}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditBorderColor(color)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Dialog open={borderColorDialogOpen} onOpenChange={setBorderColorDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingBorderColor ? 'Edit Border Color' : 'Add New Border Color'}</DialogTitle>
                <DialogDescription>
                  {editingBorderColor ? 'Update the border color details.' : 'Enter details for the new border color.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...borderColorForm}>
                <form onSubmit={borderColorForm.handleSubmit(handleBorderColorSubmit)} className="space-y-4">
                  <FormField
                    control={borderColorForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Yellow" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={borderColorForm.control}
                    name="hexCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hex Color Code</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input placeholder="#FFD700" {...field} />
                            <input
                              type="color"
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="w-10 h-10 rounded cursor-pointer"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setBorderColorDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={borderColorMutation.isPending}>
                      {borderColorMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="plateSurrounds">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Plate Surrounds</CardTitle>
                <CardDescription>Manage plate surround options</CardDescription>
              </div>
              <Button onClick={handleAddNewPlateSurround}>Add New Surround</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Style</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plateSurrounds.map((surround) => (
                    <TableRow key={surround.id}>
                      <TableCell>{surround.id}</TableCell>
                      <TableCell>{surround.name}</TableCell>
                      <TableCell>{surround.style}</TableCell>
                      <TableCell>{formatPrice(surround.price)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditPlateSurround(surround)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Dialog open={plateSurroundDialogOpen} onOpenChange={setPlateSurroundDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingPlateSurround ? 'Edit Plate Surround' : 'Add New Plate Surround'}</DialogTitle>
                <DialogDescription>
                  {editingPlateSurround ? 'Update the plate surround details.' : 'Enter details for the new plate surround.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...plateSurroundForm}>
                <form onSubmit={plateSurroundForm.handleSubmit(handlePlateSurroundSubmit)} className="space-y-4">
                  <FormField
                    control={plateSurroundForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={plateSurroundForm.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style Code</FormLabel>
                        <FormControl>
                          <Input placeholder="standard" {...field} />
                        </FormControl>
                        <FormDescription>
                          Style code (e.g., none, standard, premium)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={plateSurroundForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            placeholder="5.99"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setPlateSurroundDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={plateSurroundMutation.isPending}>
                      {plateSurroundMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="plateTypes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Plate Types</CardTitle>
                <CardDescription>Manage plate type options</CardDescription>
              </div>
              <Button onClick={handleAddNewPlateType}>Add New Type</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Style</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plateTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell>{type.id}</TableCell>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>{type.style}</TableCell>
                      <TableCell>{formatPrice(type.price)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditPlateType(type)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Dialog open={plateTypeDialogOpen} onOpenChange={setPlateTypeDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingPlateType ? 'Edit Plate Type' : 'Add New Plate Type'}</DialogTitle>
                <DialogDescription>
                  {editingPlateType ? 'Update the plate type details.' : 'Enter details for the new plate type.'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...plateTypeForm}>
                <form onSubmit={plateTypeForm.handleSubmit(handlePlateTypeSubmit)} className="space-y-4">
                  <FormField
                    control={plateTypeForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard Plate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={plateTypeForm.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style Code</FormLabel>
                        <FormControl>
                          <Input placeholder="standard" {...field} />
                        </FormControl>
                        <FormDescription>
                          Style code (e.g., standard, electric, show)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={plateTypeForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            min="0" 
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setPlateTypeDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={plateTypeMutation.isPending}>
                      {plateTypeMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}

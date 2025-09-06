import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dummyUser } from '@/lib/dummy-data';
import { Camera, Save, Bell, Shield, Smartphone, LogOut } from 'lucide-react';

const Settings = () => {
    const [profileImage, setProfileImage] = useState(dummyUser.avatar);
    const [formData, setFormData] = useState({
        name: dummyUser.name,
        email: dummyUser.email,
        campus: dummyUser.campus,
        phone: "+91 9876543210",
        bio: "Computer Science student at IIT Delhi. Interested in tech gadgets and books.",
    });

    const [notifications, setNotifications] = useState({
        newMessages: true,
        newOffers: true,
        productUpdates: false,
        marketingEmails: false,
    });

    const [privacy, setPrivacy] = useState({
        showEmail: false,
        showPhone: true,
        allowRecommendations: true,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNotificationChange = (key: string, value: boolean) => {
        setNotifications(prev => ({ ...prev, [key]: value }));
    };

    const handlePrivacyChange = (key: string, value: boolean) => {
        setPrivacy(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would normally save the data to the backend
        // For now, we'll just show an alert
        alert("Settings saved successfully!");
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6 space-y-8 max-w-4xl">
                <div>
                    <h1 className="text-2xl font-bold">Account Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your profile information visible to other users
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form onSubmit={handleSave} className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div className="flex flex-col items-center space-y-3">
                                            <Avatar className="w-24 h-24">
                                                <AvatarImage src={profileImage} alt={formData.name} />
                                                <AvatarFallback className="text-xl">
                                                    {formData.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <Button variant="outline" size="sm" className="flex gap-2">
                                                <Camera className="h-4 w-4" />
                                                <span>Change</span>
                                            </Button>
                                        </div>

                                        <div className="space-y-4 flex-1">
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="campus">Campus</Label>
                                                    <Select defaultValue={formData.campus}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select campus" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="IIT Delhi">IIT Delhi</SelectItem>
                                                            <SelectItem value="IIT Bombay">IIT Bombay</SelectItem>
                                                            <SelectItem value="IIT Madras">IIT Madras</SelectItem>
                                                            <SelectItem value="IIT Kanpur">IIT Kanpur</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="bio">Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    placeholder="Tell others about yourself"
                                                    className="min-h-[100px]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <Button type="submit" className="flex gap-2">
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Choose how and when you want to be notified
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">New Messages</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when you receive new messages
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.newMessages}
                                            onCheckedChange={(value) => handleNotificationChange('newMessages', value)}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">New Offers on Your Items</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when someone makes an offer on your listed items
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.newOffers}
                                            onCheckedChange={(value) => handleNotificationChange('newOffers', value)}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Product Updates</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Receive updates about products you've shown interest in
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.productUpdates}
                                            onCheckedChange={(value) => handleNotificationChange('productUpdates', value)}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Marketing Emails</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about new features and promotions
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notifications.marketingEmails}
                                            onCheckedChange={(value) => handleNotificationChange('marketingEmails', value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <Button className="flex gap-2">
                                        <Bell className="h-4 w-4" />
                                        Update Preferences
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy & Security Tab */}
                    <TabsContent value="privacy">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy & Security</CardTitle>
                                <CardDescription>
                                    Manage your privacy settings and account security
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground">PRIVACY SETTINGS</h3>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Show Email to Others</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Display your email to other users
                                            </p>
                                        </div>
                                        <Switch
                                            checked={privacy.showEmail}
                                            onCheckedChange={(value) => handlePrivacyChange('showEmail', value)}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Show Phone Number</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Allow other users to see your phone number
                                            </p>
                                        </div>
                                        <Switch
                                            checked={privacy.showPhone}
                                            onCheckedChange={(value) => handlePrivacyChange('showPhone', value)}
                                        />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Personalized Recommendations</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Allow us to use your activity to show personalized recommendations
                                            </p>
                                        </div>
                                        <Switch
                                            checked={privacy.allowRecommendations}
                                            onCheckedChange={(value) => handlePrivacyChange('allowRecommendations', value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6">
                                    <h3 className="text-sm font-medium text-muted-foreground">SECURITY</h3>
                                    <div>
                                        <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
                                            <Smartphone className="h-4 w-4" />
                                            <span>Enable Two-Factor Authentication</span>
                                        </Button>
                                    </div>
                                    <div>
                                        <Button variant="outline" className="flex gap-2 w-full sm:w-auto">
                                            <Shield className="h-4 w-4" />
                                            <span>Change Password</span>
                                        </Button>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="pt-2">
                                    <Button variant="destructive" className="flex gap-2">
                                        <LogOut className="h-4 w-4" />
                                        <span>Log Out of All Devices</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default Settings;

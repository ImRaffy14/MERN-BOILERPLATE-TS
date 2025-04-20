import { 
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Mail,
  X,
  Image,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import type { ReactCropperElement } from "react-cropper";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const UserManagement = () => {
  // Sample data
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "ADMIN", status: "Active", lastActive: "2 hours ago" },
    { id: 2, name: "Sarah Miller", email: "sarah@example.com", role: "USER", status: "Away", lastActive: "1 day ago" },
    { id: 3, name: "Mike Wilson", email: "mike@example.com", role: "ADMIN", status: "Inactive", lastActive: "1 week ago" },
  ];

  const roles = ["All", "ADMIN", "USER"];

  // Modal state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
    avatar: null as string | null
  });

  // Avatar cropping state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
    };
    reader.onerror = () => {
      alert('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      if (canvas) {
        setCroppedImage(canvas.toDataURL());
        setImageSrc(null);
      }
    }
  };

  const handleAddUser = () => {

    console.log("Adding user:", { ...newUser, avatar: croppedImage });
    setIsAddUserOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "User",
      avatar: null
    });
    setImageSrc(null);
    setCroppedImage(null);
  };

  useEffect(() => {
    return () => {

      if (cropperRef.current?.cropper) {
        cropperRef.current.cropper.destroy();
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header and Add User Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button className="gap-2" onClick={() => setIsAddUserOpen(true)}>
          <UserPlus size={16} />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down user list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start gap-2">
                  <Filter size={16} />
                  Role: All
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {roles.map(role => (
                  <DropdownMenuItem key={role}>{role}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="gap-2">
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                {users.length} users found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      user.role === "ADMIN" ? "default" : 
                      user.role === "USER" ? "secondary" : "outline"
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit size={16} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Shield size={16} />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Mail size={16} />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 size={16} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {users.length} of {users.length} users
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Add User Modal */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new user account.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}>
            <div className="grid gap-4 py-4">
              {/* Avatar Upload */}
              <div className="space-y-2">
                <Label htmlFor="avatar">Profile Picture <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {croppedImage ? (
                      <AvatarImage src={croppedImage} />
                    ) : (
                      <AvatarFallback>
                        <Image size={24} className="text-gray-400" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="space-y-2">
                    <Input 
                      id="avatar" 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleFileChange}
                      required={!croppedImage}
                    />
                    <Label 
                      htmlFor="avatar" 
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm"
                    >
                      <Image size={16} />
                      {croppedImage ? "Change" : "Upload"} Image
                    </Label>
                    {croppedImage && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setCroppedImage(null)}
                        type="button"
                      >
                        <X size={16} className="mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Cropper */}
              {imageSrc && !croppedImage && (
                <div className="space-y-2">
                  <Label>Crop Image <span className="text-red-500">*</span></Label>
                  <div className="h-64">
                    <Cropper
                      src={imageSrc}
                      style={{ height: 256, width: "100%" }}
                      initialAspectRatio={1}
                      guides={true}
                      ref={cropperRef}
                    />
                  </div>
                  <Button 
                    onClick={getCropData} 
                    className="mt-2"
                    type="button"
                  >
                    Crop Image
                  </Button>
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="John Doe"
                  required
                  minLength={2}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="user@example.com"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                  required
                >
                  <SelectTrigger id="role" className="w-[180px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddUserOpen(false);
                  resetForm();
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                Add User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
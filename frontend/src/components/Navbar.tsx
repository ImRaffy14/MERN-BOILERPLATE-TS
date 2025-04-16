import { 
    Bell, 
    Search,
    HelpCircle
} from "lucide-react";

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

function Navbar() {
    return (
        <div className="px-6 py-3 flex items-center justify-between">
            <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 bg-gray-50"
                />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                    <HelpCircle size={20} />
                </Button>
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/api/placeholder/32/32" alt="User" />
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Navbar

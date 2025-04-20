import { 
    Bell, 
    HelpCircle
} from "lucide-react";

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function Navbar() {
    return (
        <div className="px-6 py-3 flex items-center justify-end">

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

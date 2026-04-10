import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 shrink-0">
      <button className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">CS</span>
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">
          Case-Scribe <span className="text-primary">AI</span>
        </span>
      </button>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <button className="flex items-center gap-2.5 hover:bg-accent rounded-lg px-2 py-1.5 transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">DR</AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">Dr. Rivera</p>
            <p className="text-xs text-muted-foreground">Cardiologist</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;

import { FilePlus, FileText, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: FilePlus, label: "New Case", active: true },
  { icon: FileText, label: "My Drafts", active: false, badge: 3 },
  { icon: Users, label: "Community Feed", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const DashboardSidebar = () => {
  return (
    <aside className="w-56 border-r bg-card shrink-0 flex flex-col">
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-primary/10 text-primary text-xs font-semibold rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t">
        <div className="rounded-lg bg-accent/50 p-3">
          <p className="text-xs font-medium text-foreground">Free Plan</p>
          <p className="text-xs text-muted-foreground mt-0.5">3 of 5 cases used</p>
          <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full w-3/5 bg-primary rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex gap-6 h-full max-w-7xl mx-auto">
            <InputPanel />
            <OutputPanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

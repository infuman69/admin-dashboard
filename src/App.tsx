import "./App.css";
import DashboardTable from "./components/DashboardTable/DashboardTable";
import TopBar from "./components/TopBar/TopBar";
import { DashboardProvider } from "./context/DashboardContext";

function App() {
  return (
    <DashboardProvider>
      <div className="h-screen flex flex-col items-center w-11/12 mx-auto gap-4 py-5">
        <TopBar />
        <div className="w-full">
          <DashboardTable />
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;

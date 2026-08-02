import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
// import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <Header />
      {/* <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div> */}
      <Outlet />
    </>
  );
}

export default App;

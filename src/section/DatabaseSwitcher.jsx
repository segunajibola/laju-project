import { useState } from "react";
import { Button } from "../components/ui/button";

export default function DatabaseSwitcher({ onSwitch }) {
  const [activeDB, setActiveDB] = useState("evangelismData");
  const dbList = ["evangelismData", "alterCall"];

  const handleSwitch = (db) => {
    setActiveDB(db);
    onSwitch(db);
  };

  // console.log("db", db);
  console.log("activeDB", activeDB);

  return (
    <div className="fixed top-14 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-center gap-4">
      {dbList.map((db) => (
        <Button
          key={db}
          //   variant={activeDB == db ? "default" : "outline"}
          onClick={() => handleSwitch(db)}
          className={`capitalize ${
            activeDB === db ? "bg-red-500 hover:bg-red-600 text-white" : ""
          }`}
        >
          {db === "evangelismData"
            ? "Envagelism"
            : db === "alterCall"
            ? "Altar Call"
            : ""}
        </Button>
      ))}
    </div>
  );
}

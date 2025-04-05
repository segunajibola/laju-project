import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { evangelismData, alterCall } from "./data";
import DatabaseSwitcher from "./DatabaseSwitcher";

export default function AddDataPage() {
  const [currentDB, setCurrentDB] = useState("evangelismData");
  currentDB === evangelismData ? "evangelismData" : "alterCall";
  // EvangelismForm: "",
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const dynamicKey =
      currentDB === "evangelismData" ? "EvangelismForm" : "churchProgram";
    setFormData({
      [dynamicKey]: "",
      date: "",
      name: "",
      phoneNumber: "",
      gender: "",
      assignedWorker: "",
      response: "",
      foundationClass: "",
      counsellingClass: "",
    });
  }, [currentDB]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Data:", formData);
    if (currentDB === "evangelismData") {
      evangelismData.push(formData);
    } else {
      alterCall.push(formData);
    }
    alert("New data submitted successfully!");
  };

  console.log("currentDB", currentDB);

  const handleSwitch = (db) => {
    setCurrentDB(db);
  };

  return (
    <>
      <DatabaseSwitcher onSwitch={handleSwitch} />
      <div className="p-6 pt-[10rem] max-w-2xl mx-auto">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <h2 className="text-xl font-semibold">
              Add new data to{" "}
              {currentDB === "evangelismData"
                ? "Envagelism "
                : currentDB === "alterCall"
                ? "Alter Call "
                : ""}
              List
            </h2>
            <form onSubmit={handleSubmit} className="pt-6 space-y-4">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <label
                    className="block text-sm font-medium mb-1 capitalize"
                    htmlFor={key}
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <Input
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    // placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
              <Button type="submit" className="w-full">
                Update
                {currentDB === "evangelismData"
                  ? " Envagelism "
                  : currentDB === "alterCall"
                  ? " Alter Call "
                  : ""}
                List
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

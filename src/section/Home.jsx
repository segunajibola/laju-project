import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Phone } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { evangelismData, alterCall } from "./data";
import DatabaseSwitcher from "./DatabaseSwitcher";

const Home = () => {
  const [currentDB, setCurrentDB] = useState("evangelismData");
  const [assignedWorkerFilter, setAssignedWorkerFilter] = useState("all");
  const [feedbackUpdates, setFeedbackUpdates] = useState({});
  const [localData, setLocalData] = useState([]);

  // When DB changes, load appropriate data into state
  useEffect(() => {
    setLocalData(
      currentDB === "evangelismData" ? [...evangelismData] : [...alterCall]
    );
    setFeedbackUpdates({});
    setAssignedWorkerFilter("all");
  }, [currentDB]);

  const uniqueWorkers = [
    ...new Set(localData.map((item) => item.assignedWorker).filter(Boolean)),
  ];

  const filteredData =
    assignedWorkerFilter === "all"
      ? localData
      : localData.filter(
          (item) => item.assignedWorker === assignedWorkerFilter
        );

  const handleFeedbackChange = (index, value) => {
    setFeedbackUpdates((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleUpdateFeedback = (index) => {
    const newFeedback = feedbackUpdates[index];
    if (!newFeedback?.trim()) return alert("Feedback cannot be empty.");

    const updatedList = [...localData];
    updatedList[index].feedback = newFeedback;

    setLocalData(updatedList);

    alert(`Feedback for "${updatedList[index].name}" updated!`);

    setFeedbackUpdates((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  return (
    <>
      <DatabaseSwitcher onSwitch={setCurrentDB} />

      {/* Worker Filter Dropdown */}
      <div className="pt-36 pb-4 px-4 flex justify-center">
        <select
          value={assignedWorkerFilter}
          onChange={(e) => setAssignedWorkerFilter(e.target.value)}
          className="border px-4 py-2 rounded shadow-md"
        >
          <option value="all">All Workers</option>
          {uniqueWorkers.map((worker, index) => (
            <option key={index} value={worker}>
              {worker}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredData.map((item, index) => (
          <Card key={index} className="shadow-lg rounded-xl p-4">
            <CardContent className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>

              {currentDB === "evangelismData" ? (
                <p className="text-sm">
                  Form of Evangelism: {item.formOfEvangelism}
                </p>
              ) : (
                <p className="text-sm">Church Program: {item.churchProgram}</p>
              )}

              <p className="text-sm">Date of Visit: {item.dateOfVisit}</p>

              <div className="text-sm flex items-center gap-2">
                Phone Number: {item.phoneNumber || "N/A"}
                {item.phoneNumber && (
                  <a
                    href={`tel:${item.phoneNumber}`}
                    className="text-blue-600 hover:underline flex items-center"
                    title="Call"
                  >
                    <Phone className="w-4 h-4 ml-1" />
                  </a>
                )}
              </div>

              <p className="text-sm">Gender: {item.sex}</p>
              <p className="text-sm">Assigned Worker: {item.assignedWorker}</p>

              <p className="text-sm">
                Contacted:{" "}
                {item.contacted === true
                  ? "Yes"
                  : item.contacted === false
                  ? "No"
                  : ""}
              </p>

              <p className="text-sm">
                Interested in Foundation Class:{" "}
                {item.foundationClass === true
                  ? "Yes"
                  : item.foundationClass === false
                  ? "No"
                  : ""}
              </p>

              <p className="text-sm">
                Interested in Counselling Class:{" "}
                {item.counselingClass === true
                  ? "Yes"
                  : item.counselingClass === false
                  ? "No"
                  : ""}
              </p>

              <div>
                <label className="text-sm block mb-1 font-medium">
                  Feedback
                </label>
                <Textarea
                  value={feedbackUpdates[index] ?? item.feedback}
                  onChange={(e) => handleFeedbackChange(index, e.target.value)}
                  className="text-sm"
                  rows={3}
                />
                <Button
                  size="sm"
                  onClick={() => handleUpdateFeedback(index)}
                  className="mt-2"
                >
                  Update Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;

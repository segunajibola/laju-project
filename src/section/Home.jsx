import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Phone, Send, Loader2, CheckCircle } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { evangelismData, alterCall } from "./data";
import DatabaseSwitcher from "./DatabaseSwitcher";
const Home = () => {
  const [currentDB, setCurrentDB] = useState("evangelismData");
  const data = currentDB === "evangelismData" ? evangelismData : alterCall;

  const handleSwitch = (db) => {
    setCurrentDB(db);
  };

  return (
    <>
      <DatabaseSwitcher onSwitch={handleSwitch} />
      <div className="pt-36 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.map((item, index) => (
          <Card key={index} className="shadow-lg rounded-xl p-4">
            <CardContent className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              {data === evangelismData ? (
                <p className="text-sm">
                  Form of Envangelism: {item.formOfEvangelism}
                </p>
              ) : (
                <p className="text-sm">Church Program: {item.churchProgram}</p>
              )}
              <p className="text-sm">Date of Visit: {item.dateOfVisit}</p>
              <p className="text-sm">Phone Number: {item.phoneNumber}</p>
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
                {item.foundationClass === true
                  ? "Yes"
                  : item.foundationClass === false
                  ? "No"
                  : ""}
              </p>
              <p className="text-sm">Feedback: {item.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;

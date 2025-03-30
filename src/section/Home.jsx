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

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.map((item, index) => (
        <Card key={index} className="shadow-lg rounded-xl p-4">
          <CardContent>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.evangelismForm}</p>
            <p className="text-sm">Date: {item.date}</p>
            <p className="text-sm">Phone: {item.phoneNumber}</p>
            <p className="text-sm">Gender: {item.gender}</p>
            <p className="text-sm">Worker: {item.assignedWorker}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Home;

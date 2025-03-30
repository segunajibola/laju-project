import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const InvestorData = () => {
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investorList"));
        const investorData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Other fields
        }));
        setInvestors(investorData);
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
    };

    fetchInvestors();
  }, []);

  return (
    <div className="mx-auto p-4">
      <ul>
        {investors.map((investor) => (
          <li key={investor.id} className="border-b p-2">
            <p>Name: {investor.name}</p>
            <p>Category: {investor.category}</p>
            <p>Phone: +{investor.phoneNumber}</p>
            <p>
              Probability:{" "}
              <span
                className={`rounded p-1 font-semibold
    ${
      investor.probability === "low"
        ? "bg-red-500"
        : investor.probability === "medium"
        ? "bg-yellow-500"
        : investor.probability === "high"
        ? "bg-green-500"
        : ""
    }`}
              >
                {investor.probability}
              </span>
            </p>
            <p>Response: {investor.response}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestorData;

import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { Button } from "../components/ui/button";
import { Phone, Edit } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
const InvestorData = () => {
  const [investors, setInvestors] = useState([]);
  const [selectedProbability, setSelectedProbability] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [hasResponse, setHasResponse] = useState(true);

  useEffect(() => {
    const fetchInvestors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "investorList"));
        const investorData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Other fields
        }));
        setInvestors(investorData);
        console.log("investor in response", investorData);
      } catch (error) {
        console.error("Error fetching investors:", error);
      }
      setIsLoading(false);
    };

    fetchInvestors();
  }, []);
  const filteredInvestors = investors
    .filter((investor) =>
      selectedProbability === "All"
        ? true
        : investor.probability === selectedProbability
    )
    .filter((investor) =>
      selectedCategory === "All" ? true : investor.category === selectedCategory
    )
    .filter((investor) =>
      hasResponse ? investor.response && investor.response.trim() !== "" : true
    );

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:+${phoneNumber}`;
  };

  const handleEditResponse = (id, response) => {
    const updatedList = investors.map((investor) =>
      investor.id === id ? { ...investor, response } : investor
    );
    setInvestors(updatedList);
  };

  const updateResponse = async (id, response) => {
    if (!id || !response) return;

    try {
      const investorRef = doc(db, "investorList", id);
      await updateDoc(investorRef, { response }); // Only updates response
      console.log(`Response updated successfully for ID: ${id}`);
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  ) : (
    <div className="mx-auto p-4 pt-16">
      {/* Dropdown to select probability filter */}
      <div className="pb-2">
        <label className="font-semibold text-gray-700">
          Filter by Probability:
        </label>
        <select
          className="border p-2 rounded ml-2"
          value={selectedProbability}
          onChange={(e) => setSelectedProbability(e.target.value)}
        >
          <option value="All">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label className="font-semibold text-gray-700">
          Filter by Category:
        </label>
        <select
          className="border border-gray-500 p-2 rounded ml-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="PFAs">PFAs</option>
          <option value="Asset Managers">Asset Managers</option>
          <option value="Insurance">Insurance</option>
          <option value="HNIs">HNIs</option>
        </select>
        <button
          onClick={() => setHasResponse((prev) => !prev)}
          className={`ml-2 px-2 py-1 rounded text-[15px] ${hasResponse}`}
        >
          {hasResponse ? "Show All" : "Show Only Response Roles"}
        </button>
        <span className="ml-2">
          Count:{" "}
          <span className="rounded-full border-gray-800 px-1 border-2 bg-green-600 text-gray-200">
            {filteredInvestors.length}
          </span>
        </span>
      </div>

      {/* List of investors */}

      <ul className="mt-4">
        {filteredInvestors
          .sort((a, b) => a.company.localeCompare(b.company))
          .map((investor) => (
            <div key={investor.id} className="border-b p-2 flex flex-col gap-2">
              <p>Name: {investor.name}</p>
              <p>Category: {investor.category}</p>
              <p>Phone: +{investor.phoneNumber}</p>
              <p>RMB Caller: {investor.RMB_Caller}</p>
              <p>
                Probability:{" "}
                <span
                  className={`rounded p-1 font-semibold
                  ${
                    investor.probability === "low"
                      ? "bg-red-500 text-white"
                      : investor.probability === "medium"
                      ? "bg-yellow-500 text-black"
                      : investor.probability === "high"
                      ? "bg-green-500 text-white"
                      : ""
                  }`}
                >
                  {investor.probability}
                </span>
              </p>
              <p className="text-[15px]">
                <span className="">Last time called:</span>
                {/* {investor.lastUpdated ? investor.lastUpdated : ""} */}
              </p>

              <p className="text-[15px]">
                <span className="">Response:</span>
                {investor.response}
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleCall(investor.phoneNumber)}
                className="text-green-500 my-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </Button>
              <Textarea
                placeholder="Update call response..."
                name="response"
                value={investor.response}
                onChange={(e) =>
                  handleEditResponse(investor.id, e.target.value)
                }
                className="w-full mt-2 outline-none focus:outline-none"
              />
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  handleEditResponse(investor.id, investor.response)
                }
                className="text-green-500 my-2"
              >
                <Edit className="w-4 h-4" />
                <span
                  onClick={() => updateResponse(investor.id, investor.response)}
                  n
                >
                  Update Response
                </span>
              </Button>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default InvestorData;

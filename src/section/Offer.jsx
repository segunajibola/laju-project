import React from "react";

const bondData = {
  issuer: "FSDH Merchant Bank Limited",
  leadArranger: "FSDH Capital Limited",
  coArrangers: [
    "CardinalStone Partners Limited",
    "Comercio Partners Capital Limited",
    "FCMB Capital Markets Limited",
    "Rand Merchant Bank Nigeria Limited",
  ],
  series: [
    {
      number: 1,
      tenor: "90 days",
      impliedYield: "22.0000%",
      discountRate: "20.8680%",
    },
    {
      number: 2,
      tenor: "151 days",
      impliedYield: "22.7500%",
      discountRate: "20.7930%",
    },
  ],
  targetSize: "Up to ₦20 billion across both Series",
  offerOpenDate: "Wednesday, 26 March 2025",
  offerCloseDate: "Wednesday, 02 April 2025",
  fundingDate: "Thursday, 03 April 2025",
  useOfProceeds:
    "To fund short-term working capital requirements and for general corporate purposes",
  issuerRating: {
    Agusto: "A",
    Datapro: "A",
  },
  minimumSubscription: "₦5 million (multiples of ₦1,000 thereafter)",
  taxConsideration:
    "Applicable taxes shall apply on the instrument except otherwise exempt",
};

const Offer = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Bond Offer Details</h1>
      <p>
        <strong>Issuer:</strong> {bondData.issuer}
      </p>
      <p>
        <strong>Lead Arranger:</strong> {bondData.leadArranger}
      </p>
      <p>
        <strong>Co-Arrangers:</strong>
      </p>
      <ul className="list-disc pl-5">
        {bondData.coArrangers.map((arranger, index) => (
          <li key={index}>{arranger}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4">Series Details</h2>
      <div className="flex justify-between">
        {bondData.series.map((series) => (
          <div key={series.number} className="border p-3 rounded-lg my-2">
            <p>
              <strong>Series:</strong> {series.number}
            </p>
            <p>
              <strong>Tenor:</strong> {series.tenor}
            </p>
            <p>
              <strong>Implied Yield:</strong> {series.impliedYield}
            </p>
            <p>
              <strong>Discount Rate:</strong> {series.discountRate}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-3 mt-4">
        <p>
          <strong>Target Size:</strong> {bondData.targetSize}
        </p>
        <p>
          <strong>Offer Open Date:</strong> {bondData.offerOpenDate}
        </p>
        <p>
          <strong>Offer Close Date:</strong> {bondData.offerCloseDate}
        </p>
        <p>
          <strong>Funding Date:</strong> {bondData.fundingDate}
        </p>
        <p>
          <strong>Use of Proceeds:</strong> {bondData.useOfProceeds}
        </p>
        <p>
          <strong>Issuer Rating:</strong> Agusto: {bondData.issuerRating.Agusto}
          , Datapro: {bondData.issuerRating.Datapro}
        </p>
        <p>
          <strong>Minimum Subscription:</strong> {bondData.minimumSubscription}
        </p>
        <p>
          <strong>Tax Consideration:</strong> {bondData.taxConsideration}
        </p>
      </div>
    </div>
  );
};

export default Offer;

"use strict";


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("companies", [
      {
        id: "da85a655-2b7c-4ca4-a20a-5cdec5e5485b", // Fixed UUID referenced by users seeder
        companyName: "Tech Innovators Ltd",
        companyEmail: "info@techinnovators.com",
        proofDocument: "proof_doc_1.pdf",
        companyContact: "+250788000111",
        province: "Kigali",
        district: "Gasabo",
        sector: "Kimironko",
        state: "active",
        blockUnblockComment: null,
        status: "approved",
        approveComment: "Verified successfully",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: "f1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890", // Fixed UUID for second company
        companyName: "Agro Growth Ltd",
        companyEmail: "contact@agrogrowth.com",
        proofDocument: "proof_doc_2.pdf",
        companyContact: "+250788000222",
        province: "Eastern",
        district: "Rwamagana",
        sector: "Karenge",
        state: "trial",
        blockUnblockComment: "Blocked due to inactivity",
        status: "pending",
        approveComment: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("companies", null, {});
  },
};

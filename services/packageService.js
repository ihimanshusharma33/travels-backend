import Package from "../models/Package.js";

const getAllPackages = async () => {
  return await Package.find();
};

const createPackage = async (packageData) => {
  const newPackage = new Package(packageData);
  return await newPackage.save();
};

const updatePackage = async (id, packageData) => {
  return await Package.findByIdAndUpdate(id, packageData, { new: true });
};

const deletePackage = async (id) => {
  return await Package.findByIdAndDelete(id);
};
const getPackageById = async (id) => {
  return Package.findById(id);
};

export default {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getPackageById,
};

import packageService from "../services/packageService.js";

export const getPackages = async (req, res) => {
  try {
    const packages = await packageService.getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const newPackage = await packageService.createPackage(req.body);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await packageService.updatePackage(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    await packageService.deletePackage(req.params.id);
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPackageById = async (req, res) => {
    try {
      const packageId = req.params.id;
      const packageDetail = await packageService.getPackageById(packageId);
  
      if (!packageDetail) {
        return res.status(404).json({ error: "Package not found" });
      }
  
      res.status(200).json(packageDetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

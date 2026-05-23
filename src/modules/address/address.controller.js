import {
  createAddressRepo,
  getUserAddressesRepo,
  updateAddressRepo,
  deleteAddressRepo,
} from "./address.repository.js";


// ➕ ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await createAddressRepo(userId, req.body);

    res.status(201).json({
      success: true,
      data: address,
    });

  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// 📍 GET USER ADDRESSES
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const addresses = await getUserAddressesRepo(userId);

    res.json({
      success: true,
      data: addresses,
    });

  } catch (error) {
    console.error("GET ADDRESS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ✏️ UPDATE ADDRESS
export const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const updated = await updateAddressRepo(id, userId, req.body);

    res.json({
      success: true,
      data: updated,
    });

  } catch (error) {
    console.error("UPDATE ADDRESS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ❌ DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await deleteAddressRepo(id, userId);

    res.json({
      success: true,
      message: "Address deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
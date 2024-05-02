import React from "react";
import { Stack, Alert } from "@mui/material";

const ModalNotif = () => {
  return (
    <div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">
        &times;
      </span>
      This is an alert box.
    </div>
  );
};

export default ModalNotif;

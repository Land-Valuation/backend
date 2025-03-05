import {
  Box,
  Divider,
} from "@mui/material";

import Footer from "../../../components/Footer";
import UserService from "../../../state/UserService";
import ValuationForCentral from "./valuation-for-central/ValuationForCentral";
import ValuationForLocal from "./valuation-for-local/ValuationForLocal";

const Valuation = () => {
  const userRole = UserService.getTokenParsed().realm_access.roles;
  const hasCentralRole = userRole.some((role) => role.includes("CENTRAL"));

  return (
    <>
      {hasCentralRole ? (
        <ValuationForCentral />
      ) : (
        <ValuationForLocal />
      )}
      <Box>
        <Divider />
        <Footer />
      </Box>
      
    </>
  );
};

export default Valuation;

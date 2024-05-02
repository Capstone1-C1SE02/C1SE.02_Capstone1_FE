import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const FooterPage = ({ count }) => {
  return (
    <Stack spacing={2}>
      <Pagination count={count} />
    </Stack>
  );
};

export default FooterPage;

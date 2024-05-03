import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const FooterPage = ({ count, page, handlePageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        count={count}
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default FooterPage;

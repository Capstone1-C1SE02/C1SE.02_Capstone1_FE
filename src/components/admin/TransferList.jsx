import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Student } from "../dropList";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList({ onRightListChange }) {
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const student = await Student();
      setLeft(student.data.results.data);
    };

    fetchData();
  }, []);
  const [left1, setLeft1] = React.useState([]);

  React.useEffect(() => {
    onRightListChange(right); // Gọi callback khi danh sách right thay đổi
  }, [right, onRightListChange]);
  React.useEffect(() => {
    const fetch = () => {
      left.map((value) => {
        setLeft1((pre) => ({ ...pre, value }));
      });
    };
    fetch();
  }, [left]);

  console.log("setLeft1 111", left1);
  const [checked, setChecked] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  console.log("rightChecked", rightChecked);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log("sprit checked", checked);

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items?.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items?.length && items?.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items?.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items?.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items?.length} được chọn`}
      />
      <Divider />
      <List
        className="m-0 p-0 "
        sx={{
          width: 460,
          height: 400,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items?.map((value, index) => {
          {
            // console.log("itemsitemsitemsitemsitems", value.STUDENT_ID_NUMBER);
          }
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItemButton
              key={index}
              role="listitem"
              onClick={handleToggle(value)}
              className="flex w-[400px] gap-5"
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${value.STUDENT_ID_NUMBER}`}
                className="w-[120px]"
              />
              <ListItemText
                id={labelId}
                primary={`${value.LAST_NAME} ${value.MIDDLE_NAME} ${value.FIRST_NAME}`}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid className="w-[500px]" item>
        {customList("Danh sách sinh viên", left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList("Sinh viên đã chọn", right)}</Grid>
    </Grid>
  );
}

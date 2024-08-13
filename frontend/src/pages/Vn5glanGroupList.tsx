import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../constants/config";

import axios from "../axios";
import { Var5gLANBrief } from "../api/api";

import Dashboard from "../Dashboard";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

export default function Vn5glanGpList() {
  const navigation = useNavigate();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState<Var5gLANBrief[]>([]);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get("/api/vn5glanGroup")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh, limit, page]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage?: number,
  ) => {
    if (newPage !== null) {
      setPage(newPage!);
    }
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  const count = () => {
    return 0;
  };

  const pager = () => {
    if (config.enablePagination) {
      return (
        <TablePagination
          component="div"
          count={count()}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[50, 100, 200]}
        />
      );
    } else {
      return <br />;
    }
  };

  const onDelete = (extGpId: string) => {
    const result = window.confirm("Delete 5GLAN Group?");
    if (!result) {
      return;
    }
    axios
      .delete("/api/vn5glanGroup/" + extGpId)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const onCreate = () => {
    navigation("/vn5glanGroup/create");
  };

  const handleModify = (extGpId: string) => {
    navigation("/vn5glanGroup/" + extGpId);
  };

  const tableView = (
    <React.Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>External Group Id</TableCell>
            <TableCell>Gpsis(List of Members)</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.exterGroupId}</TableCell>
              <TableCell>
                {
                row.gpsis.map((value, idx) => (
                  <div key={idx}>{value}</div>
                ))
                }
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onDelete(row.exterGroupId!)}
                >
                  DELETE
                </Button>
              </TableCell>
              <TableCell>
                <Button color="primary" variant="contained" onClick={() => handleModify(row.exterGroupId)}>
                  VIEW
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pager()}
      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={() => onCreate()} sx={{ m: 1 }}>
          CREATE
        </Button>
      </Grid>
    </React.Fragment>
  );

  return (
    <Dashboard title="5GLAN Groups List">
      <br />
      {data == null || data.length === 0 ? (
        <div>
          No 5GLAN Group
          <br />
          <br />
          <Grid item xs={12}>
            <Button color="primary" variant="contained" onClick={() => onCreate()} sx={{ m: 1 }}>
              CREATE
            </Button>
          </Grid>
        </div>
      ) : (
        tableView
      )}
    </Dashboard>
  );
}

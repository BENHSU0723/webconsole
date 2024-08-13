import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../axios";
import {
    Var5GLANParam,
  Subscription,
  Nssai,
  DnnConfiguration,
  AccessAndMobilitySubscriptionData,
  FlowRules,
  QosFlows,
} from "../api/api";

import Dashboard from "../Dashboard";
import {
  Button,
  Box,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";

export default function Vn5glanGpUpdate() {
  const { extGpId } = useParams<{
    extGpId: string;
  }>();
  const navigation = useNavigate();

  const [data, setData] = useState<Var5GLANParam>({
    snssai:{
        sst: 0,
        sd: "temp value"
    }
  });

  useEffect(() => {
    axios.get("/api/vn5glanGroup/" + extGpId).then((res) => {
      setData(res.data);
    });
    },[extGpId]);

  const onUpdate = () => {
    if (data.exterGroupId === undefined) {
      alert("Please fill the External Group Id");
      return;
    }
    
    // Modify a existed 5GLAN VN Group.
      axios
        .put("/api/vn5glanGroup/" + data.exterGroupId, data)
        .then(() => {
          navigation("/vn5glanGroup");
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data.cause) {
              alert(err.response.data.cause);
            } else {
              alert(err.response.data);
            }
          } else {
            alert(err.message);
          }
          return;
        });
  };
    
  const handleGroupIdChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setData({ ...data, exterGroupId: event.target.value });
  };

  const  handleGpsisChange= (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const newArray = event.target.value.split(',').map(item => item.trim());
    setData({...data, gpsis:newArray})
  };

  return (
    <Dashboard title="5GLAN Single Group Config Update" >
      <Card variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="5GLAN Vn Group External Group Id"
                variant="outlined"
                required
                fullWidth
                value={data?.exterGroupId}
                onChange={handleGroupIdChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="5GLAN Vn Group Group Members(list of GPSIS)"
                variant="outlined"
                required
                fullWidth
                value={data?.gpsis}
                onChange={handleGpsisChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          
        </Table>
      </Card>
      <h3>Group Hard Config(can NOT be changed after created)</h3>
      <Card variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="Group belonging SST of S-NSSAI"
                variant="outlined"
                required
                fullWidth
                type="number"
                value={data.snssai?.sst}
                // onChange={handleChangeSst}
                />
              </TableCell>
              <TableCell>
                <TextField
                label="Group belonging SD of S-NSSAI"
                variant="outlined"
                required
                fullWidth
                value={data.snssai?.sd}
                // onChange={handleChangeSd}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="Group belonging DNN"
                variant="outlined"
                required
                fullWidth
                // value={data?.dnn}
                // onChange={handleChangeGroupConfig}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="Group Dedicated PDU Session Type(only support [IPV4] now)"
                variant="outlined"
                required
                fullWidth
                value={data?.sessionType}
                // onChange={handleChangeGroupConfig}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table> 
      </Card>
      <h3>Optional related configs(authentication & MTC info)</h3>
      <Card>
        <Table>
        <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="aaaIpv4Addr for secondary Athentication of PDU session create procedure"
                variant="outlined"
                // required
                fullWidth
                value={data?.aaaIpv4Addr}
                // onChange={handleChangeGroupConfig}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>
                <TextField
                label="mtcProviderId for identify the machine as group member"
                variant="outlined"
                // required
                fullWidth
                value={data?.mtcProviderId}
                // onChange={handleChangeGroupConfig}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <br />
      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={onUpdate} sx={{ m: 1 }}>
            UPDATE
        </Button>
      </Grid>
    </Dashboard>
  );
}

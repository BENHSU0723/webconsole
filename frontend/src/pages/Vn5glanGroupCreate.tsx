import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../axios";
import {
Var5GLANParam,
  Nssai,
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
  FormControlLabel,
  Switch,
} from "@mui/material";

interface VerifyScope {
  supi: string;
  sd: string;
  sst: number;
  dnn: string;
  ipaddr: string;
}

interface VerifyResult {
  ipaddr: string;
  valid: boolean;
  cause: string;
}

import { DataObject, RawOff } from "@mui/icons-material";

// let isNewGroup = false;

export default function Vn5glanGpCreate() {
//   const { extGpId } = useParams<{
//     exterGroupId: string;
//   }>();

//   isNewGroup = extGpId === undefined;
  const navigation = useNavigate();

  const [data, setData] = useState<Var5GLANParam>({
    exterGroupId: "extgroupid-group216-test001@wirelab.com",
    gpsis: ["imsi-208930000000003","imsi-208930000000004","imsi-208930000000005"],
    dnn: "internet",
    snssai: {
            sst: 1,
            sd: "010203"
          },
    sessionType: 'IPV4'
  });

//   if (!exterGroupId) {
//     useEffect(() => {
//       axios.get("/api/subscriber/" + id + "/" + plmn).then((res) => {
//         console.log('loaded existing subscriber', res.data);
//         setData(res.data);
//       });
//     }, [id]);
//   }


  const onCreate = () => {
    if (data.exterGroupId === undefined) {
      alert("Please fill the External Group Id");
      return;
    }
    
    // Create a new 5GLAN VN Group.
      axios
        .post("/api/vn5glanGroup/" + data.exterGroupId, data)
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

  const  handleChangeSst= (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    data.snssai.sst=Number(event.target.value);
    setData({...data,});
  };

  const  handleChangeSd= (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    data.snssai.sd= event.target.value;
    setData({...data});
  };

  const handleChangeDnn = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setData({ ...data, dnn: event.target.value });
  };

  const handleChangePduType = (
    event: SelectChangeEvent<string>,
  ): void => {
    setData({ ...data, sessionType : event.target.value });
  };

  const handleChangeAaaIpAddr = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setData({ ...data, aaaIpv4Addr : event.target.value });
  };

  const handleChangeMtcPvdId = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setData({ ...data, mtcProviderId : event.target.value });
  };

  
  return (
    <Dashboard title="5GLAN Single Group Config Setting" >
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
                value={data.exterGroupId}
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
                value={data.gpsis}
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
                onChange={handleChangeSst}
                />
              </TableCell>
              <TableCell>
                <TextField
                label="Group belonging SD of S-NSSAI"
                variant="outlined"
                required
                fullWidth
                value={data.snssai?.sd}
                onChange={handleChangeSd}
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
                value={data.dnn}
                onChange={handleChangeDnn}
                />
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Group Dedicated PDU Session Type(only support [IPV4] now)</InputLabel>
                  <Select
                    label="Group Dedicated PDU Session Type(only support [IPV4] now)"
                    variant="outlined"
                    required
                    fullWidth
                    value={data.sessionType}
                    onChange={handleChangePduType} 
                    >
                    <MenuItem value="IPV4">IPV4</MenuItem>
                    <MenuItem value="IPV6">IPV6</MenuItem>
                    <MenuItem value="IPV4V6">IPV4V6</MenuItem>
                    <MenuItem value="UNSTRUCTURED">UNSTRUCTURED</MenuItem>
                    <MenuItem value="ETHERNET">ETHERNET</MenuItem>
                  </Select>
                </FormControl>
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
                value={data.aaaIpv4Addr}
                onChange={handleChangeAaaIpAddr}
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
                value={data.mtcProviderId}
                onChange={handleChangeMtcPvdId}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <br />
      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={onCreate} sx={{ m: 1 }}>
          CREATE
        </Button>
      </Grid>
    </Dashboard>
  );
}

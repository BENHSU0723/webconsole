import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../axios";
import {
  Subscription,
  Nssai,
  AuthenticationSubscription,
  AccessAndMobilitySubscriptionData,
  DnnConfiguration,
  QosFlows,
  Var5GLANParam,
} from "../api/api";

import Dashboard from "../Dashboard";
import {
  Button,
  Box,
  Card,
  Checkbox,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { stringify } from "querystring";

export default function Vn5glanGpRead() {
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
  // const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/vn5glanGroup/" + extGpId).then((res) => {
        setData(res.data);
      });
    },[extGpId]);
    
  const handleEdit = () => {
    navigation("/vn5glanGroup/update/" + extGpId);
  };

  

  return (
    <Dashboard title="Read 5GLAN Single Group Config">
      <Card variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "60%" }}>5GLAN Vn Group External Group Id</TableCell>
              <TableCell>{data.exterGroupId}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "60%" }}>5GLAN Vn Group Group Members(list of GPSIS)</TableCell>
                {
                    data.gpsis?.map((value, idx) => (
                    <div key={idx}>{value}</div>
                    ))
                }            
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <h3>Group Hard Config(can NOT be changed after created)</h3>
      <Card variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
            <TableCell style={{ width: "50%" }}>Group belonging SST of S-NSSAI</TableCell>
            <TableCell>{data.snssai.sst}</TableCell>
            <TableCell style={{ width: "50%" }}>Group belonging SD of S-NSSAI</TableCell>
            <TableCell>{data.snssai.sd}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
            <TableCell style={{ width: "40%" }}>Group belonging DNN</TableCell>
            <TableCell>{data.dnn}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "40%" }}>Group Dedicated PDU Session Type(only support [IPV4] now)</TableCell>
              <TableCell>{data.sessionType}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
            <TableCell style={{ width: "40%" }}>Group PDU Sessions Belonged Subnet IP Addr</TableCell>
            <TableCell>{data.subnetIP}</TableCell>
            </TableRow>
          </TableBody>
        </Table> 
      </Card>
      <h3>Optional related configs(authentication & MTC info)</h3>
      <Card>
        <Table>
        <TableBody>
            <TableRow>
            <TableCell style={{ width: "40%" }}>aaaIpv4Addr for secondary Athentication of PDU session create procedure</TableCell>
            <TableCell>{data.aaaIpv4Addr}</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
            <TableCell style={{ width: "40%" }}>mtcProviderId for identify the machine as group member</TableCell>
            <TableCell>{data.mtcProviderId}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <h3>MulticastGroup List</h3>
      <Card>
      <Table>
          <TableRow>
            <TableCell>Multi Group ID</TableCell>
            <TableCell>Source PDU Sess IP Addr</TableCell>
            <TableCell>Source UE GPSI</TableCell>
            <TableCell>Group IP Addr</TableCell>
            <TableCell>Members GPSI</TableCell>
            <TableCell>Group Service Type</TableCell>
            {/* <TableCell>Query Type</TableCell> */}
          </TableRow>
        <TableBody>
          {data.multicastGroupList?.map((group, index) => (
            <TableRow key={index}>
              <TableCell>{group.multiGroupId}</TableCell>
              <TableCell>{group.sourcePduSessIpAddr?.ipv4Addr}</TableCell>
              <TableCell>{group.sourceUeGpsi}</TableCell>
              <TableCell>{group.groupIpAddr?.ipv4Addr}</TableCell>
              <TableCell>
                {group.membersGpsi && group.membersGpsi.length > 0 ? (
                  group.membersGpsi.map((member, idx) => (
                    <span key={idx}>
                      {member}
                      <br /> {/* 换行符 */}
                    </span>
                  ))
                ) : (
                  'No Members'
                )}
              </TableCell>
              <TableCell>{group.groupServiceType}</TableCell>
              {/* <TableCell>{group.queryType}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Card>
      <br />
      <Grid item xs={12}>
        <Button color="primary" variant="contained" onClick={handleEdit} sx={{ m: 1 }}>
          EDIT
        </Button>
      </Grid>
    </Dashboard>
  );
}

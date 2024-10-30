package WebUI

import (
	"strconv"

	modelBen "github.com/BENHSU0723/openapi_public/models"
	"github.com/free5gc/openapi/models"
)

type Model5GLANGroupBrief struct {
	ExterGroupId string   `json:"exterGroupId"`
	Gpsis        []string `json:"gpsis"`
}

type Web5GLanParameters struct {

	// string containing a local identifier followed by \"@\" and a domain identifier. Both the local identifier and the domain identifier shall be encoded as strings that do not contain any \"@\" characters. See Clauses 4.6.2 and 4.6.3 of 3GPP TS 23.682 for more information.
	ExterGroupId string `json:"exterGroupId"`

	Gpsis []string `json:"gpsis"`

	// String representing a Data Network as defined in clause 9A of 3GPP TS 23.003;  it shall contain either a DNN Network Identifier, or a full DNN with both the Network  Identifier and Operator Identifier, as specified in 3GPP TS 23.003 clause 9.1.1 and 9.1.2. It shall be coded as string in which the labels are separated by dots  (e.g. \"Label1.Label2.Label3\").
	Dnn string `json:"dnn"`

	// String identifying a IPv4 address formatted in the 'dotted decimal' notation as defined in RFC 1166.
	AaaIpv4Addr string `json:"aaaIpv4Addr,omitempty"`

	// String uniquely identifying MTC provider information.
	MtcProviderId string `json:"mtcProviderId,omitempty"`

	Snssai models.Snssai `json:"snssai"`

	SessionType models.PduSessionType `json:"sessionType"`

	SubnetIP string `json:"subnetIP"`

	MulticastGroupList []modelBen.MulticastGroup `json:"multicastGroupList,omitempty"`
}

func Web5glanPpToModelPp(webPp Web5GLanParameters) (rspData modelBen.Model5GLanParametersProvision) {
	rspData.Var5gLanParams.ExterGroupId = webPp.ExterGroupId

	rspData.Var5gLanParams.Gpsis = make(map[string]string)
	for idx, value := range webPp.Gpsis {
		rspData.Var5gLanParams.Gpsis[strconv.Itoa(idx)] = value
	}
	rspData.Var5gLanParams.Snssai = modelBen.Snssai(webPp.Snssai)
	rspData.Var5gLanParams.Dnn = webPp.Dnn
	rspData.Var5gLanParams.SessionType = modelBen.PduSessionType(webPp.SessionType)
	rspData.Var5gLanParams.AaaIpv4Addr = webPp.AaaIpv4Addr
	rspData.Var5gLanParams.MtcProviderId = webPp.AaaIpv4Addr
	rspData.MulticastGroupList = webPp.MulticastGroupList
	rspData.SubnetIP = modelBen.IpAddress{Ipv4Addr: webPp.SubnetIP}
	return
}

func Vn5glanCfgToWebPp(gpCfg modelBen.Model5GLanParametersProvision) (webPp Web5GLanParameters) {
	webPp.ExterGroupId = gpCfg.Var5gLanParams.ExterGroupId
	for _, gpsi := range gpCfg.Var5gLanParams.Gpsis {
		webPp.Gpsis = append(webPp.Gpsis, gpsi)
	}
	webPp.Snssai = models.Snssai(gpCfg.Var5gLanParams.Snssai)
	webPp.Dnn = gpCfg.Var5gLanParams.Dnn
	webPp.SessionType = models.PduSessionType(gpCfg.Var5gLanParams.SessionType)
	webPp.AaaIpv4Addr = gpCfg.Var5gLanParams.AaaIpv4Addr
	webPp.MtcProviderId = gpCfg.Var5gLanParams.MtcProviderId
	webPp.MulticastGroupList = gpCfg.MulticastGroupList
	webPp.SubnetIP = gpCfg.SubnetIP.Ipv4Addr
	return
}

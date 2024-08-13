package WebUI

import (
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"

	"github.com/BENHSU0723/openapi_public/Nnef_5glanPpSubs"
	"github.com/free5gc/util/mongoapi"
	"github.com/free5gc/webconsole/backend/logger"
)

type vn5glanService interface {
	nefService() *nnefService
}

// Create a new 5g VN group identifier by external group id
func Post5glanVnGroup(c *gin.Context) {
	setCorsHeader(c)
	logger.ProcLog.Infoln("Post a new 5glan VN Group Data")
	var web5glanPara Web5GLanParameters
	if err := c.ShouldBindJSON(&web5glanPara); err != nil {
		logger.ProcLog.Errorf("Post5glanVnGroup err: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"cause": "JSON format incorrect",
		})
		return
	}
	extGpId := c.Param("extGpId")
	logger.ProcLog.Warnln("External Group Id: ", extGpId)
	logger.ProcLog.Warnln("Web5GLanParameters: ", web5glanPara)
	reqData := Web5glanPpToModelPp(web5glanPara)
	logger.ProcLog.Warnf("5GLanParametersProvision: %+v\n", reqData)

	var nefSer nnefService
	nefSer.clients = make(map[string]*Nnef_5glanPpSubs.APIClient)
	rsp, err := nefSer.Vn5gGroupConfigPost(reqData)
	if err != nil {
		logger.ProcLog.Errorln("Post5glanVnGroup fail!!")
		c.JSON(http.StatusBadRequest, err)
	} else {
		logger.ProcLog.Warnln("Post5glanVnGroup success!!")
		c.JSON(rsp.StatusCode, nil)
	}
}

// modify a group config
func Put5glanVnGroup(c *gin.Context) {
	setCorsHeader(c)
	logger.ProcLog.Infoln("Put a new 5glan VN Group Data")
	var web5glanPara Web5GLanParameters
	if err := c.ShouldBindJSON(&web5glanPara); err != nil {
		logger.ProcLog.Errorf("Put5glanVnGroup err: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"cause": "JSON format incorrect",
		})
		return
	}
	extGpId := c.Param("extGpId")
	logger.ProcLog.Warnln("External Group Id: ", extGpId)
	logger.ProcLog.Warnln("Modified Web5GLanParameters: ", web5glanPara)
	reqData := Web5glanPpToModelPp(web5glanPara)
	var nefSer nnefService
	nefSer.clients = make(map[string]*Nnef_5glanPpSubs.APIClient)
	rsp, err := nefSer.Vn5gGroupConfigPut(reqData, extGpId)
	if err != nil {
		logger.ProcLog.Errorln("Put5glanVnGroup fail!!")
		c.JSON(http.StatusBadRequest, err)
	} else {
		logger.ProcLog.Warnln("Put5glanVnGroup success!!")
		c.JSON(rsp.StatusCode, nil)
	}
}

// Get a group config
func GetAn5glanVnGroup(c *gin.Context) {
	setCorsHeader(c)
	logger.ProcLog.Infoln("Get a 5glan VN Group Config")
	extGpId := c.Param("extGpId")
	logger.ProcLog.Warnln("External Group Id: ", extGpId)
	var nefSer nnefService
	nefSer.clients = make(map[string]*Nnef_5glanPpSubs.APIClient)
	RspGpCfg, rsp, err := nefSer.Vn5gGroupConfigGet(extGpId)

	// transfer data type to fit in web data
	webPp := Vn5glanCfgToWebPp(*RspGpCfg)
	if err != nil {
		logger.ProcLog.Errorln("GetAn5glanVnGroup fail!!")
		c.JSON(http.StatusBadRequest, err)
	} else {
		logger.ProcLog.Warnln("GetAn5glanVnGroup success!!")
		c.JSON(rsp.StatusCode, webPp)
	}
}

// Get all 5glan vn groups
func Get5glanGroups(c *gin.Context) {
	setCorsHeader(c)

	logger.ProcLog.Infoln("Get All 5GLAN Groups List")

	isAdmin := CheckAuth(c)
	if !isAdmin {
		logger.ProcLog.Errorln("This request deos not come from [admin]")
		c.JSON(http.StatusBadRequest, gin.H{
			"cause": "Illegal Token",
		})
		return
	}

	var gpList []Model5GLANGroupBrief = make([]Model5GLANGroupBrief, 0)
	group5glanList, err := mongoapi.RestfulAPIGetMany(group5glanDataColl, bson.M{})
	if err != nil {
		logger.ProcLog.Errorf("Get5glanGroups err: %+v", err)
		c.JSON(http.StatusInternalServerError, gin.H{})
		return
	}
	for _, gpData := range group5glanList {
		extGpId := gpData["externalGroupId"]
		gpsisItf := gpData["members"]

		var gpsis []string
		gpsisReflected := reflect.ValueOf(gpsisItf) // use reflect to range over interface{}
		for i := 0; i < gpsisReflected.Len(); i++ {
			gpsi := gpsisReflected.Index(i).Interface().(string) // transform type reflect.value to string
			gpsis = append(gpsis, gpsi)
		}

		tmp := Model5GLANGroupBrief{
			ExterGroupId: extGpId.(string),
			Gpsis:        gpsis,
		}
		gpList = append(gpList, tmp)
	}
	c.JSON(http.StatusOK, gpList)
}

// Delete a 5GLAN group
func DeleteAn5glanVnGroup(c *gin.Context) {
	setCorsHeader(c)
	logger.ProcLog.Infoln("Delete a 5glan VN Group")
	extGpId := c.Param("extGpId")
	logger.ProcLog.Warnln("External Group Id: ", extGpId)
	var nefSer nnefService
	nefSer.clients = make(map[string]*Nnef_5glanPpSubs.APIClient)
	rsp, err := nefSer.Vn5gGroupDelete(extGpId)

	if err != nil {
		logger.ProcLog.Errorln("DeleteAn5glanVnGroup fail!!")
		c.JSON(http.StatusBadRequest, err)
	} else {
		logger.ProcLog.Warnln("DeleteAn5glanVnGroup success!!")
		c.JSON(rsp.StatusCode, nil)
	}
}

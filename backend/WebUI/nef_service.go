package WebUI

import (
	"net/http"
	"sync"

	"github.com/BENHSU0723/openapi_public/Nnef_5glanPpSubs"
	"github.com/BENHSU0723/openapi_public/models"
	"github.com/free5gc/webconsole/backend/logger"
	"github.com/free5gc/webconsole/backend/webui_context"
)

const (
	CREATESUBS = "Class5GLANParametersProvisionSubscriptionsAPIService.CreateAnSubscription"
	MODIFYSUBS = "Individual5GLANParametersProvisionSubscriptionAPIService.FullyUpdateAnSubscription"
	READSUBS   = "Individual5GLANParametersProvisionSubscriptionAPIService.ReadAnSubscription"
	DELETESUBS = "Individual5GLANParametersProvisionSubscriptionAPIService.DeleteAnSubscription"
)

type nnefService struct {
	NefUrl  string
	mu      sync.RWMutex
	clients map[string]*Nnef_5glanPpSubs.APIClient
}

func (s *nnefService) getClient(uri, keyword string) *Nnef_5glanPpSubs.APIClient {
	webuiSelf := webui_context.GetSelf()
	s.mu.RLock()
	if client, ok := s.clients[uri]; ok {
		defer s.mu.RUnlock()
		return client
	} else {
		configuration := Nnef_5glanPpSubs.NewConfiguration()
		configuration.OperationServers[keyword] = Nnef_5glanPpSubs.ServerConfigurations{
			{
				URL: "{apiRoot}/3gpp-5glan-pp/v1",
				Variables: map[string]Nnef_5glanPpSubs.ServerVariable{
					"apiRoot": Nnef_5glanPpSubs.ServerVariable{
						DefaultValue: webuiSelf.NefUri,
					},
				},
			},
		}
		cli := Nnef_5glanPpSubs.NewAPIClient(configuration)

		s.mu.RUnlock()
		s.mu.Lock()
		defer s.mu.Unlock()
		s.clients[uri] = cli
		return cli
	}
}

func (n *nnefService) Vn5gGroupConfigPost(vn5glanPp models.Model5GLanParametersProvision) (*http.Response, error) {
	webuiSelf := webui_context.GetSelf()

	client := n.getClient(webuiSelf.NefUri, CREATESUBS)
	apiReq := client.Class5GLANParametersProvisionSubscriptionsAPI.CreateAnSubscription(nil, webuiSelf.AfId)
	apiReq = apiReq.Model5GLanParametersProvision(vn5glanPp)
	_, httpRsp, err := apiReq.Execute()
	if err != nil {
		logger.ProcLog.Errorln("Vn5gGroupConfigPost err:", err.Error())
		return httpRsp, err
	}
	return httpRsp, nil
}

func (n *nnefService) Vn5gGroupConfigPut(vn5glanPp models.Model5GLanParametersProvision, extGpId string) (*http.Response, error) {
	webuiSelf := webui_context.GetSelf()

	client := n.getClient(webuiSelf.NefUri, MODIFYSUBS)
	apiReq := client.Individual5GLANParametersProvisionSubscriptionAPI.FullyUpdateAnSubscription(nil, webuiSelf.AfId, extGpId)
	apiReq = apiReq.Model5GLanParametersProvision(vn5glanPp)
	_, httpRsp, err := apiReq.Execute()
	if err != nil {
		logger.ProcLog.Errorln("Vn5gGroupConfigPut err:", err.Error())
		return httpRsp, err
	}
	return httpRsp, nil
}

func (n *nnefService) Vn5gGroupConfigGet(extGpId string) (*models.Model5GLanParametersProvision, *http.Response, error) {
	webuiSelf := webui_context.GetSelf()

	client := n.getClient(webuiSelf.NefUri, READSUBS)
	apiReq := client.Individual5GLANParametersProvisionSubscriptionAPI.ReadAnSubscription(nil, webuiSelf.AfId, extGpId)
	rspData, httpRsp, err := apiReq.Execute()
	if err != nil {
		logger.ProcLog.Errorln("Vn5gGroupConfigGet err:", err.Error())
		return nil, httpRsp, err
	}
	return rspData, httpRsp, nil
}

func (n *nnefService) Vn5gGroupDelete(extGpId string) (*http.Response, error) {
	webuiSelf := webui_context.GetSelf()

	client := n.getClient(webuiSelf.NefUri, DELETESUBS)
	apiReq := client.Individual5GLANParametersProvisionSubscriptionAPI.DeleteAnSubscription(nil, webuiSelf.AfId, extGpId)
	httpRsp, err := apiReq.Execute()
	if err != nil {
		logger.ProcLog.Errorln("Vn5gGroupDelete err:", err.Error())
		return httpRsp, err
	}
	return httpRsp, nil
}

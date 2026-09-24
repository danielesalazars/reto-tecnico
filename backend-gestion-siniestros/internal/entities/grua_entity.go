package entities

type GruaRequest struct {
	AccidentLocation string                    `json:"accidentLocation"`
	Depots           []string                  `json:"depots"`
	Graph            map[string]map[string]int `json:"graph"`
}

type GruaResponse struct {
	FromDepot string   `json:"fromDepot"`
	To        string   `json:"to"`
	Path      []string `json:"path"`
	Distance  int      `json:"distance"`
}
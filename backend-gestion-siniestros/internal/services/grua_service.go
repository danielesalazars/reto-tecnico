package services

import (
	"container/heap"
	"errors"
	"math"
	"backend-gestion-siniestros/internal/entities"
)

type Item struct {
	node     string
	priority int
	index    int
}

type PriorityQueue []*Item

func (pq PriorityQueue) Len() int { return len(pq) }
func (pq PriorityQueue) Less(i, j int) bool { return pq[i].priority < pq[j].priority }
func (pq PriorityQueue) Swap(i, j int) {
	pq[i].index = j
	pq[j].index = i
}
func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*Item)
	item.index = n
	*pq = append(*pq, item)
}
func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	old[n-1] = nil
	item.index = -1
	*pq = old[0 : n-1]
	return item
}

// EncontrarRutaOptimalGrua evalúa las bases de grúas y devuelve la más cercana al siniestro[cite: 4, 6]
func EncontrarRutaOptimalGrua(req entities.GruaRequest) (entities.GruaResponse, error) {
	shortestDistance := math.MaxInt32
	var bestPath []string
	var selectedDepot string
	found := false

	for _, depot := range req.Depots {
		path, dist, err := dijkstra(req.Graph, depot, req.AccidentLocation)
		if err == nil && dist < shortestDistance {
			shortestDistance = dist
			bestPath = path
			selectedDepot = depot
			found = true
		}
	}

	if !found {
		return entities.GruaResponse{}, errors.New("la ubicación del accidente no es alcanzable desde ninguna base de grúas")
	}

	return entities.GruaResponse{
		FromDepot: selectedDepot,
		To:        req.AccidentLocation,
		Path:      bestPath,
		Distance:  shortestDistance,
	}, nil
}

func dijkstra(graph map[string]map[string]int, start, end string) ([]string, int, error) {
	distances := make(map[string]int)
	previous := make(map[string]string)
	for node := range graph {
		distances[node] = math.MaxInt32
	}
	distances[start] = 0

	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &Item{node: start, priority: 0})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*Item)
		u := item.node

		if u == end {
			break
		}

		if item.priority > distances[u] {
			continue
		}

		for neighbor, weight := range graph[u] {
			alt := distances[u] + weight
			if alt < distances[neighbor] {
				distances[neighbor] = alt
				previous[neighbor] = u
				heap.Push(pq, &Item{node: neighbor, priority: alt})
			}
		}
	}

	if distances[end] == math.MaxInt32 {
		return nil, 0, errors.New("ruta no encontrada")
	}

	var path []string
	curr := end
	for curr != "" {
		path = append([]string{curr}, path...)
		curr = previous[curr]
	}

	return path, distances[end], nil
}
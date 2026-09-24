# 1. Etapa de compilación con la última versión de Go
FROM golang:latest AS builder

WORKDIR /app

# Copiar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar el binario ejecutable
RUN CGO_ENABLED=0 GOOS=linux go build -o main cmd/server/main.go

# 2. Etapa final de ejecución (imagen ligera)
FROM alpine:latest
WORKDIR /app

# Copiar el binario compilado desde la etapa anterior
COPY --from=builder /app/main .

EXPOSE 4001

CMD ["./main"]
#!/bin/bash

# SportViz Setup and Run Script

echo "================================"
echo "  SportViz Setup & Run Script"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

# Check Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    echo -e "${GREEN}✓${NC} Java found: $JAVA_VERSION"
else
    echo -e "${YELLOW}✗${NC} Java not found. Please install Java 17 or higher."
    exit 1
fi

# Check Maven
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn -version | head -n 1)
    echo -e "${GREEN}✓${NC} Maven found: $MVN_VERSION"
else
    echo -e "${YELLOW}✗${NC} Maven not found. Please install Maven 3.6+."
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -version)
    echo -e "${GREEN}✓${NC} Node.js found: $NODE_VERSION"
else
    echo -e "${YELLOW}✗${NC} Node.js not found. Please install Node.js 18+."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -version)
    echo -e "${GREEN}✓${NC} npm found: $NPM_VERSION"
else
    echo -e "${YELLOW}✗${NC} npm not found. Please install npm."
    exit 1
fi

echo ""
echo -e "${BLUE}All prerequisites met!${NC}"
echo ""

# Setup Frontend
echo -e "${BLUE}Setting up Frontend...${NC}"
cd frontend

if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cp .env.local.example .env.local
    echo -e "${GREEN}✓${NC} Created .env.local"
fi

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Frontend dependencies already installed"
fi

cd ..

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "================================"
echo "  How to Run SportViz"
echo "================================"
echo ""
echo "You need to run TWO terminals:"
echo ""
echo -e "${BLUE}Terminal 1 - Backend:${NC}"
echo "  cd backend"
echo "  mvn spring-boot:run"
echo ""
echo -e "${BLUE}Terminal 2 - Frontend:${NC}"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo -e "Then open: ${GREEN}http://localhost:3000${NC}"
echo ""
echo "================================"
echo ""

# Ask if user wants to start now
read -p "Would you like to start the backend now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Starting backend...${NC}"
    cd backend
    mvn spring-boot:run
fi

#!/bin/bash

echo "=========================================="
echo "NLP Text Processing Lab - Setup Verification"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Not found. Please install Node.js 16+"
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} Not found. Please install npm"
fi

# Check Python
echo -n "Checking Python... "
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} Found: $PYTHON_VERSION"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version)
    echo -e "${GREEN}✓${NC} Found: $PYTHON_VERSION"
else
    echo -e "${RED}✗${NC} Not found. Please install Python 3.8+"
fi

# Check pip
echo -n "Checking pip... "
if command -v pip &> /dev/null; then
    PIP_VERSION=$(pip --version | awk '{print $2}')
    echo -e "${GREEN}✓${NC} Found: $PIP_VERSION"
elif command -v pip3 &> /dev/null; then
    PIP_VERSION=$(pip3 --version | awk '{print $2}')
    echo -e "${GREEN}✓${NC} Found: $PIP_VERSION"
else
    echo -e "${RED}✗${NC} Not found. Please install pip"
fi

echo ""
echo "=========================================="
echo "Frontend Dependencies Check"
echo "=========================================="

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules found"
else
    echo -e "${YELLOW}!${NC} node_modules not found. Run: npm install"
fi

echo ""
echo "=========================================="
echo "Backend Dependencies Check"
echo "=========================================="

if [ -d "backend/venv" ]; then
    echo -e "${GREEN}✓${NC} Virtual environment found"
else
    echo -e "${YELLOW}!${NC} Virtual environment not found. Run: cd backend && python3 -m venv venv"
fi

echo ""
echo "=========================================="
echo "File Structure Check"
echo "=========================================="

declare -a required_files=(
    "src/App.tsx"
    "src/components/Navbar.tsx"
    "backend/main.py"
    "backend/nlp_pipeline.py"
    "backend/requirements.txt"
    "README.md"
    "QUICKSTART.md"
)

all_files_found=true
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (missing)"
        all_files_found=false
    fi
done

echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="

if $all_files_found; then
    echo -e "${GREEN}✓ All required files present${NC}"
else
    echo -e "${RED}✗ Some files are missing${NC}"
fi

echo ""
echo "Next Steps:"
echo "1. Install frontend: npm install"
echo "2. Setup backend: cd backend && ./start.sh"
echo "3. In another terminal: npm run dev"
echo "4. Open: http://localhost:5173"
echo ""
echo "For detailed instructions, see QUICKSTART.md"
echo "=========================================="

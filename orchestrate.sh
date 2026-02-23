#!/bin/bash
# SaaS Tools - Orchestration Script
# Run tests, validate, and deploy

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  SaaS Tools - Orchestration & Deployment${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Parse arguments
COMMAND=${1:-test}

case "$COMMAND" in
    test)
        echo -e "${BLUE}▶ Running tests...${NC}"
        echo ""
        node test-runner.js
        ;;
        
    validate)
        echo -e "${BLUE}▶ Validating tools...${NC}"
        echo ""
        
        # Check all required files
        echo "Checking files..."
        
        REQUIRED_FILES=(
            "saas-tools/index.html"
            "saas-tools/prompt-generator/index.html"
            "saas-tools/prompt-generator/index.js"
            "saas-tools/crypto-tracker/index.html"
            "saas-tools/content-scheduler/index.html"
            "saas-tools/automation-tools/file-organizer.js"
            "saas-tools/automation-tools/system-monitor.js"
        )
        
        ALL_PRESENT=true
        for file in "${REQUIRED_FILES[@]}"; do
            if [ -f "$file" ]; then
                print_status "$file exists"
            else
                print_error "$file missing"
                ALL_PRESENT=false
            fi
        done
        
        if [ "$ALL_PRESENT" = true ]; then
            echo ""
            print_status "All files present!"
        else
            echo ""
            print_error "Some files are missing!"
            exit 1
        fi
        ;;
        
    serve)
        PORT=${2:-3000}
        echo -e "${BLUE}▶ Starting static server on port $PORT...${NC}"
        echo ""
        
        # Check if python3 is available
        if command -v python3 &> /dev/null; then
            cd saas-tools
            python3 -m http.server $PORT
        elif command -v npx &> /dev/null; then
            cd saas-tools
            npx serve -p $PORT
        else
            print_error "No server available. Install python3 or npx."
            exit 1
        fi
        ;;
        
    deploy)
        echo -e "${BLUE}▶ Preparing deployment...${NC}"
        echo ""
        
        # Run tests first
        print_status "Running tests..."
        node test-runner.js
        
        # Validate
        print_status "Validating files..."
        bash "$0" validate
        
        echo ""
        print_status "Ready for deployment!"
        echo ""
        echo "To deploy:"
        echo "  - Push to GitHub: git push origin main"
        echo "  - Deploy to Netlify/Vercel"
        echo "  - Or run local server: ./orchestrate.sh serve"
        ;;
        
    crypto-lab)
        echo -e "${BLUE}▶ Crypto Lab Tools${NC}"
        echo ""
        echo "Available crypto tools:"
        echo "  1. Crypto Portfolio Tracker - Track holdings"
        echo "  2. Create meme coin on pump.fun"
        echo "  3. Monitor DEX screener for new pairs"
        echo ""
        echo "Coming soon: Automated meme coin creation"
        ;;
        
    *)
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  test       - Run all tests"
        echo "  validate   - Validate all files exist"
        echo "  serve      - Start local server"
        echo "  deploy     - Run tests and validate for deployment"
        echo "  crypto-lab - Crypto lab tools"
        echo ""
        echo "Examples:"
        echo "  $0 test"
        echo "  $0 serve 8080"
        echo "  $0 deploy"
        ;;
esac
#!/usr/bin/env -S just --justfile
# Run commands silently unless they fail

set quiet := true

# Show available commands
default:
    just --choose

# ===== Setup Commands =====

# Install all dependencies and configure the environment
[group('Setup')]
setup: install-textlint
    npm install
    @echo "✅ Project setup complete"

# Install textlint globally
[group('Setup')]
install-textlint:
    @echo "Installing textlint globally..."
    npm install textlint -g

# ===== Development Commands =====

# Run build and tests for contribution validation
[group('Development')]
validate-contribution: build run-tests
    @echo "✅ Basic validation complete"

# Build the project
[group('Development')]
build:
    @echo "Building project..."
    npm run build

# Run unit tests
[group('Development')]
run-tests:
    @echo "Running tests..."
    npm test

# ===== Validation Commands =====

# Run comprehensive validation (build, test, lint, fix)
[group('Validation')]
validate-all: validate-contribution lint-e2e fix-e2e
    @echo "✅ Full validation complete"

# Run end-to-end tests in lint mode
[group('Validation')]
lint-e2e:
    @echo "Running e2e lint validation..."
    # Prepare test environment
    rm -f e2e/source-lint.log

    # Execute lint check and capture output
    cat e2e/source.md | textlint --rulesdir lib/ --stdin --stdin-filename source.md --quiet --no-color | tee e2e/source-lint.log

    # Validate results against expected output
    diff --strip-trailing-cr e2e/source-lint.log e2e/expected-lint.log
    @echo "✅ E2E lint validation passed"

# Run end-to-end tests in fix mode
[group('Validation')]
fix-e2e:
    @echo "Running e2e fix validation..."
    # Prepare test environment
    cp e2e/source.md e2e/source-fixed.md
    textlint --rulesdir lib/ e2e/expected-fix.md --quiet --no-color

    # Execute fix operation
    textlint --rulesdir lib/ e2e/source-fixed.md --fix

    # Validate results against expected output
    diff --strip-trailing-cr e2e/expected-fix.md e2e/source-fixed.md
    @echo "✅ E2E fix validation passed"

# Check for security vulnerabilities in dependencies
[group('Validation')]
security-audit:
    @echo "Running security audit..."
    npm run audit --audit-level=moderate

# ===== Release Commands =====

# Run semantic release process
[group('Release')]
release-it:
    @echo "Run semantic release process..."
    npx semantic-release

# ===== Debug Commands =====

# Open the markdown AST explorer for debugging
[group('Debug')]
open-ast-explorer:
    @echo "Opening AST Explorer in default browser..."
    open https://textlint.github.io/astexplorer/

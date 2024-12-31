# Contributing to Self AI

Thank you for your interest in contributing to Self AI! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/self-ai.git
   cd self-ai
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch for your changes:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Workflow

1. Make your changes
2. Ensure code quality:
   ```bash
   npm run typecheck  # Type checking
   npm run lint      # Linting
   npm run format    # Code formatting
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```

5. Open a Pull Request

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- feat: A new feature
- fix: A bug fix
- docs: Documentation changes
- style: Code style changes (formatting, etc)
- refactor: Code changes that neither fix bugs nor add features
- perf: Performance improvements
- test: Adding or modifying tests
- chore: Changes to build process or auxiliary tools

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add JSDoc comments for public APIs
- Write meaningful test cases

## Need Help?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about the codebase

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
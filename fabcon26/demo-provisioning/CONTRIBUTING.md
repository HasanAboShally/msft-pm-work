# Contributing

Thank you for your interest in contributing to this project!

## How to Contribute

1. **Fork** the repository
2. **Create a branch** for your feature or fix: `git checkout -b feature/my-change`
3. **Make your changes** following the guidelines below
4. **Test** your changes (see Testing section)
5. **Submit a pull request** with a clear description

## Development Setup

```bash
# Clone and set up
git clone <your-fork-url> && cd fabric-e2e-demo
./scripts/setup.sh

# Configure Terraform
cp terraform/terraform.tfvars.example terraform/terraform.tfvars
# Edit with your capacity name and username
```

## Guidelines

### Shell Scripts

- Use `#!/usr/bin/env bash` shebang
- Enable strict mode: `set -euo pipefail`
- Use the logging functions from `scripts/lib/utils.sh` (`log_info`, `log_success`, `log_error`)
- Use the fabric-cli wrappers from `scripts/lib/fab-helpers.sh`
- Always use `"${variable}"` (quoted, braces) for variable expansion
- Test on macOS and Linux where possible (especially `sed` differences)
- Add comments explaining **why**, not just **what**

### Terraform

- Use descriptive variable names with `description` and `validation` blocks
- Pin provider versions explicitly
- Use `locals` for computed values
- Add `depends_on` only when Terraform can't infer dependencies

### Python

- Use type hints for function signatures
- Include docstrings for public functions
- Keep dependencies minimal (only `fabric-cicd` and `azure-identity`)

### Commit Messages

Use clear, descriptive commit messages:
```
fix: correct workspace path suffix in create-variable-library.sh
feat: add --dry-run flag to provision-items.sh
docs: add customization guide
```

## Testing

Before submitting:

1. **Shell scripts**: Run with `--help` to verify argument parsing
2. **Provision flow**: Test `make all` on a Fabric capacity you own
3. **Idempotency**: Run `./scripts/provision-items.sh` twice — second run should be clean
4. **Teardown**: Verify `make destroy` cleans everything up

## Reporting Issues

When filing an issue, please include:
- Your OS (macOS/Linux/WSL)
- Terraform version (`terraform version`)
- fabric-cli version (`fab --version`)
- Full error output
- Steps to reproduce

## Code of Conduct

Be respectful and constructive. We're all here to learn and build great tools.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
